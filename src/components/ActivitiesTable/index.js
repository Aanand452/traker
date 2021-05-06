import React, { Component, Fragment, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import "./styles.css";



import {
  Button,
  ButtonGroup,
  DataTable,
  DataTableColumn,
  DataTableCell,
  DataTableRowActions,
  InputIcon,
  Dropdown,
  Card,
  Input,
  Icon,
  PageHeader,
  PageHeaderControl,
  ToastContainer,
  Toast,
  Tooltip,
  DropdownTrigger,
  Modal,
  CardFilter,
  Combobox,
  comboboxFilterAndLimit,
} from "@salesforce/design-system-react";

import { getCookie } from '../../utils/cookie';
import { getAPIUrl } from "../../config/config";
// import Modal from "../EditActivityModal";
import CloneModal from "../CloneActivityModal";
import HistoricModal from "../HistoricActivityModal";
import ViewActivityModal from "../ViewActivityModal";
import Pager from "../Pager";
import ActivityCalendar from "../ActivityCalendar"

// ACTIONS
import { selectItem, setItem } from "../../actions/DataTable";
import { Container} from "./styles";


import FilterPanel from "../FilterPanel";
import jsPDF from "jspdf";
import "jspdf-autotable";
import exportFromJSON from 'export-from-json'

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { addDays, format } from 'date-fns';

const DateCell = ({ children, ...props }) => {
  return <DataTableCell title={children} {...props}>
    {children && moment(children).utc().format("DD/MM/YYYY")}
  </DataTableCell>
};
DateCell.displayName = DataTableCell.displayName;

const CustomDataTableCell = ({ children, ...props }) => (
  <DataTableCell {...props}>
    {children && (
      <a target="blank" href={children}>
        View asset
      </a>
    )}
  </DataTableCell>
);
CustomDataTableCell.displayName = DataTableCell.displayName;

const DropDownCellAsset = ({ children, ...props }) => {
  let items = props.property;
  if (props.item[items]) {
    const assets = props.item[items].split(', ');
    if (assets.length > 1) {
      const options = assets.map((asset, i) => ({ label: `Asset ${i + 1}`, value: asset, tooltipContent: asset }));
      return (
        <DataTableRowActions
          options={options}
          menuPosition="overflowBoundaryElement"
          dropdown={
            <Dropdown
              width="small"
              tooltipMenuItem={
                <Tooltip
                  hoverOpenDelay={500}
                  id="base"
                  align="top right"
                  variant="learnMore"
                  dialogClassName="dialog-classname"
                />
              }
              onSelect={({ value }) => {
                window.open(value, '_blank');
              }}
            />
          }
        />
      );
    }
  }
  return <CustomDataTableCell {...props}>{props.item[items]}</CustomDataTableCell>
}

DropDownCellAsset.displayName = DataTableCell.displayName;
moment.locale('en-GB');
const myEvents = [
  {
      'title': 'My event',
      'allDay': false,
      'start': new Date(), // 10.00 AM
      'end': new Date(), // 2.00 PM 
  }
]
class Table extends Component {
  state = {
    sortProperty: "",
    sortDirection: null,
    toast: {
      show: false,
      message: "A New Activity Has Been Added",
      variant: "success",
    },
    isPanelOpen: false,
    data: [],
    editModalIsOPen: false,
    cloneModalIsOPen: false,
    isDeletePromptOpen: false,
    displayedData: [],
    filters: {},
    errors: {},
    currentPage: 1,
    expandTable: true,
    columnWidth: {},
    tableExtraWidth: 0,
    noRowHover: false,
    isHistoric: false,
    showExportMenu: false,
    isCalanderView: true,
    popoverOpen: false,
    historicModalIsOpen: false,
    detailModalIsOpen: false,
    historicDate: {},
    programsFYstartDate: '',
    programsFYendDate: '',
    startDate:'',
    endDate:'',
    isFiltering: false,
    formatsSelected :[],
    formatInputValue:'',
    programSelected:[],
    programInputValue:'',
  };

  table = React.createRef()

  componentDidMount() {
    this.setupAndFetch();
    {!this.state.isCalanderView && this.resizableTable(this.table.current.scrollerRef.children[0])}
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.setState({ data: this.props.data }, () => {
        if(this.state.sortProperty && this.state.sortDirection) {
          this.onSort({property: this.state.sortProperty, sortDirection: this.state.sortDirection})
        }
      });
      this.onFilter();
    }
  }

  resetResizableTable = () => {
    this.setState(prev => ({ expandTable: !prev.expandTable }), () => {
      if(this.state.expandTable) {
        this.resizableTable(this.table.current.scrollerRef.children[0])
      }
    })
  }

  removeLocalStorageColumns = () => {
    let columns = ["Owner", "Program", "Campaign ID", "Title", "Format", "Abstract", "Region", "Start date", "End date", "Assets"];
    for(let i = 0; i < columns.length; i++) {
      localStorage.removeItem(columns[i])
    }
    this.setState({ columnWidth: {
      Owner: (document.body.clientWidth - 52) / 10,
      Program: (document.body.clientWidth - 52) / 10,
      "Campaign ID": (document.body.clientWidth - 52) / 10,
      Title: (document.body.clientWidth - 52) / 10,
      Format: (document.body.clientWidth - 52) / 10,
      Abstract: (document.body.clientWidth - 52) / 10,
      Region: (document.body.clientWidth - 52) / 10,
      "Start date": (document.body.clientWidth - 52) / 10,
      "End date": (document.body.clientWidth - 52) / 10,
      Assets: (document.body.clientWidth - 52) / 10,
    }, tableExtraWidth: 0})
  }

  resizableTable(table) {
    let row = table.getElementsByTagName('tr')[0];
    let cols = row.children;

    table.style.overflow = 'hidden';

    this.setState({
      columnWidth: {
        Owner: localStorage.getItem("Owner") ? Number(localStorage.getItem("Owner")) : ((document.body.clientWidth - 52) / 10),
        Program: localStorage.getItem("Program") ? Number(localStorage.getItem("Program")) : ((document.body.clientWidth - 52) / 10),
        "Campaign ID": localStorage.getItem("Campaign ID") ? Number(localStorage.getItem("Campaign ID")) : ((document.body.clientWidth - 52) / 10),
        Title: localStorage.getItem("Title") ? Number(localStorage.getItem("Title")) : ((document.body.clientWidth - 52) / 10),
        Format: localStorage.getItem("Format") ? Number(localStorage.getItem("Format")) : ((document.body.clientWidth - 52) / 10),
        Abstract: localStorage.getItem("Abstract") ? Number(localStorage.getItem("Abstract")) : ((document.body.clientWidth - 52) / 10),
        Region: localStorage.getItem("Region") ? Number(localStorage.getItem("Region")) : ((document.body.clientWidth - 52) / 10),
        "Start date": localStorage.getItem("Start date") ? Number(localStorage.getItem("Start date")) : ((document.body.clientWidth - 52) / 10),
        "End date": localStorage.getItem("End date") ? Number(localStorage.getItem("End date")) : ((document.body.clientWidth - 52) / 10),
        Assets: localStorage.getItem("Assets") ? Number(localStorage.getItem("Assets")) : ((document.body.clientWidth - 52) / 10),
      }
    });

    for(let i = 0; i < cols.length - 1; i++) {
      let div = this.createDiv(1, '35px');
      cols[i].children[1].children[0].appendChild(div);
      this.setListener(div);
    }
  }

  setListener = div => {
    let pageX, curCol, curColWidth, colName;


    div.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
    });

    div.addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopPropagation();

      if(e.target.parentElement.children.length <= 2) {
        colName = e.target.previousSibling && e.target.previousSibling.title;
      } else {
        colName = e.target.parentElement.children[1] && e.target.parentElement.children[1].title;
      }

      curCol = e.target.parentElement;
      pageX = e.pageX;
      curColWidth = curCol.offsetWidth;
      this.setState({
        columnWidth: {
          ...this.state.columnWidth,
          [colName]: curColWidth,
        }
      });
    });

    document.addEventListener('mousemove', e => {
      e.preventDefault()
      e.stopPropagation();

      if(curCol && colName) {
        let diffX = e.pageX - pageX;
        div.style.borderRight = `1px dashed #1589ee`;
        div.style.right = `${-diffX}px`;
        div.style.zIndex = 3;
        this.setState({noRowHover: true})
      }
    });

    div.addEventListener('dblclick', e => {
      e.preventDefault();
      e.stopPropagation();
      this.removeLocalStorageColumns();
    });

    document.addEventListener('mouseup', e => {
      e.preventDefault();
      e.stopPropagation();

      if (!e.target.parentElement) {
        return;
      }

      if(e.target.parentElement.children.length <= 2) {
        colName = e.target.previousSibling && e.target.previousSibling.title;
      } else {
        colName = e.target.parentElement.children[1] && e.target.parentElement.children[1].title;
      }

      if(curCol && colName) {
        let diffX = e.pageX - pageX;

        localStorage.setItem(colName, curColWidth + (diffX) <= 80 ? "80" : Number(curColWidth + (diffX)));

        this.setState(prev => ({
          columnWidth: {
            ...prev.columnWidth,
            [colName]: curColWidth + (diffX) <= 80 ? 80 : curColWidth + (diffX)
          },
          tableExtraWidth: prev.tableExtraWidth += diffX,
          noRowHover: false
        }));
      }

      div.style.borderRight = "none";
      div.style.right = 0;
      div.style.zIndex = 1;

      curCol = undefined;
      pageX = undefined;
      curColWidth = undefined;
    });
  }

  createDiv(zIndex = 1, width = '15px') {
    let div = document.createElement('div');
    div.setAttribute("title", "Double click to reset columns' size")
    div.classList.add("border")
    div.style.top = 0;
    div.style.right = 0;
    div.style.width = width;
    div.style.position = 'absolute';
    div.style.cursor = 'col-resize';
    div.style.userSelect = 'none';
    div.style.height = '100%';
    div.style.zIndex = zIndex;
    return div;
  }

  setupAndFetch = async () => {
    if (window.location.hostname === "localhost")
      this.API_URL = "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();

    await this.getConfig();

    this.checkProgram();
    this.checkRegion();
    this.checkFormat();
    this.setState({historicDate: {}, startDate:new Date(), key: 'selection', endDate:addDays(new Date(), 7) })
  };

  async getConfig(){
    try{
      const request = await fetch('/config');
      const data = await request.json();
      request.status === 200 && this.setState({
        programsFYstartDate: data.programsFYstartDate,
        programsFYendDate: data.programsFYendDate
        });

    } catch(e) {
      console.error('ERROR: cannot get the url config: ', e);
    }
  }

  async checkProgram() {
    const { programsFYstartDate, programsFYendDate } = this.state;
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          programsStartDate: programsFYstartDate,
          programsEndDate:  programsFYendDate,
        })
      }
      let response = await fetch(`${this.API_URL}/programs`, config);
      if (response.status === 200) {
        let { result } = await response.json();
        let programs = result.map(el => ({...el, id: el.program_id}))
        this.setState({
          programs: [{ label: "All", id: "all" }, ...programs],
          filteredPrograms: [{ label: "All", id: "all" }, ...programs],
        });
      } else throw new Error(response);
    } catch (err) {
      console.error(err);
    }
  }

  async checkRegion() {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      let response = await fetch(`${this.API_URL}/region`, config);
      if (response.status === 200) {
        let { result } = await response.json();
        let regions = result.map(el => ({...el, id: el.region_id}));
        this.setState({
          regions: [{ label: "All", id: "all" }, ...regions],
        });
      } else {
        throw new Error(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async checkFormat() {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      let response = await fetch(`${this.API_URL}/format`, config);
      if (response.status === 200) {
        let { result } = await response.json();
        result = result.map((item) => ({ label: item.name, ...item }));
        let formats = result.map(el => ({...el, id: el.format_id, icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign"/>)}))
        this.setState({
          formats: formats,
        });
      } else {
        throw new Error(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  closeHistoricModal = () => this.setState({historicModalIsOpen: false, historicDate: {}})

  closeDetailModal = () => this.setState({detailModalIsOpen: false})

  handleHistoricDate = (name, value) => this.setState({ historicDate: { ...this.state.historicDate, [name]: value } })

  historicBtn = () => {
    this.setState({isHistoric: !this.state.isHistoric}, () => {
      if(!this.state.isHistoric) {
        this.setState({historicDate: {}, startDate:new Date(), key: 'selection', endDate:addDays(new Date(), 7) })
        // this.props.reloadActivities();
      } else {
        // this.setState({historicModalIsOpen: true})
      }
    })
  }
  calendarViewBtn = () =>{
    this.setState({isCalanderView: !this.state.isCalanderView})
  }
  calendarOnHover = () => {
    this.setState({popoverOpen: true})
  }
  calendarOnLeave = () => {
    this.setState({popoverOpen: false})
  }
  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    })
  }

  exportOptions = [
    {id:1, value:'PDF', label:'PDF'}, {id:2, value:'CSV', label:'CSV'}, {id: 3, value:'XLS', label:'XLS'}
  ]

  exportBtn = (value) => {
    switch(value.id) {
      case 1:
        this.exportPdf();
        break;
      case 2:
        this.exportCSV('csv');
        break;
      case 3:
        this.exportCSV('xls');
        break;
    }
  }

  exportCSV = (type) => {
    const exportData = {
      data: this.state.displayedData,
      fileName: 'activities',
      exportType: type
    }
    exportFromJSON(exportData)
  }

  exportPdf = () => {
    const exportHeaders = [[
      "Owner", 
      "Program", 
      "Campaign ID", 
      "Title", 
      "Format", 
      "Abstract", 
      "Region", 
      "Start Data", 
      "End Date"]];
  
    const exportData = this.state.displayedData.map(elt=> [
      elt.userId, 
      elt.programId, 
      elt.campaignId, 
      elt.title, 
      elt.formatId, 
      elt.abstract, 
      elt.regionId, 
      elt.startDate.replace('T00:00:00.000Z',''), 
      elt.endDate.replace('T00:00:00.000Z','')]);
  
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Activities";

    let content = {
      startY: 40,
      head: exportHeaders,
      body: exportData,
      styles:{
        fontSize: 8
      },
      columnStyles:{
        0:{cellWidth: 40},
        1:{cellWidth: 50},
        2:{cellWidth: 50},
        3:{cellWidth: 120},
        4:{cellWidth: 40},
        5:{cellWidth: 130},
        6:{cellWidth: 40},
        7:{cellWidth: 30},
        8:{cellWidth: 30},
      }
    };
    doc.text(title, marginLeft, marginLeft - 5, {
      styles: { fontSize: 5 },
    });
    // doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("activities.pdf")
  }

  actions = () => (
    <PageHeaderControl>
      <ButtonGroup id="button-group-page-header-actions">
        <Dropdown 
          onSelect={this.exportBtn} 
          width="xx-small"
          options={this.exportOptions}
        >
        <DropdownTrigger>
          <Button 
            // assistiveText={{ icon: 'XML' }}
            iconCategory="doctype"
            iconName="xml"
            iconPosition="right"
            label="Export"
          />
          </DropdownTrigger>
        </Dropdown>
        </ButtonGroup>
      <ButtonGroup id="button-group-page-header-actions-history">
        <Tooltip
          content={this.state.isCalanderView ? "Open Calendar View" : "Open List View"}
        >
          <Button
          onClick={this.calendarViewBtn}
          >
            <Icon 
              assistiveText={{ label: 'Event' }}
              category="utility"
              name={this.state.isCalanderView ? "event" : "list"}
              size="x-small"
            />
          </Button>
        </Tooltip>
        
        
        <Button
          iconCategory="utility"
          label="Historic"
          variant={this.state.isHistoric ? "brand" : "neutral"}
          onClick={this.historicBtn}
        />
        <Button
          assistiveText={{icon: "Search"}}
          iconCategory="utility"
          iconName="search"
          iconVariant="border-filled"
          title="Search activities in historic"
          onClick={() => this.setState({historicModalIsOpen: !this.state.historicModalIsOpen})}
          disabled={!this.state.isHistoric}
        />
      </ButtonGroup>
      <ButtonGroup id="button-group-page-header-actions">
        <Link to="/create-activity">
          <Button label="New" />
        </Link>
      </ButtonGroup>
    </PageHeaderControl>
  );

  controls = () => (
    <Fragment>
      <PageHeaderControl>
        <ButtonGroup id="button-group-page-header-controls">
          {
            this.state.expandTable &&
            (<Button
              assistiveText={{ icon: "Contract" }}
              iconCategory="utility"
              iconName={"contract_alt"}
              iconVariant="border-filled"
              variant="icon"
              title={"Reset columns' size"}
              onClick={this.removeLocalStorageColumns}
            />)
          }
          <Button
            assistiveText={{ icon: "Expand" }}
            iconCategory="utility"
            iconName={this.state.expandTable ? "expand" : "contract"}
            iconVariant="border-filled"
            variant="icon"
            title={this.state.expandTable ? "Expand table" : "Contract table"}
            onClick={this.resetResizableTable}
          />
          <Button
            assistiveText={{ icon: "Refresh" }}
            iconCategory="utility"
            iconName="refresh"
            iconVariant="border-filled"
            variant="icon"
            title="Refresh table"
            onClick={this.resetTable}
          />
          <Button
            assistiveText={{ icon: "Filters" }}
            iconCategory="utility"
            iconName="filterList"
            iconVariant="border-filled"
            variant="icon"
            title="Filter"
            onClick={() =>
              this.setState({ isPanelOpen: !this.state.isPanelOpen })
            }
          />
        </ButtonGroup>
      </PageHeaderControl>
    </Fragment>
  );

  toggleOpen = state => {
    this.setState({ [state]: !this.state[state] });
  };

  editData = (row) => {
    let items = [...this.props.dataTable.items];
    items.splice(row.id, 1, row);
    this.setState({ items });
    this.toggleOpen("editModalIsOPen");
  };

  handleRowAction = (item, { id }) => {
    switch (id) {
      case 0:
        this.props.setItem(item);
        this.toggleOpen("editModalIsOPen");
        break;
      case 1:
        this.props.onDelete(item);
        break;
      case 2:
        this.props.setItem(item);
        this.toggleOpen("cloneModalIsOPen");
        break;
      case 3:
        this.props.setItem(item);
        this.toggleOpen("detailModalIsOpen");
        break;
      default:
        break;
    }
  };

  onToast = (show, message, variant) => {
    this.setState({ toast: { show, message, variant } });
  };

  onSort = (sortInfo) => {
    const { property, sortDirection } = sortInfo;
    let data = [...this.state.data];

    data = data.sort((a, b) => {
      let val = 0;

      if (a[property] > b[property]) val = 1;
      if (a[property] < b[property]) val = -1;
      if (sortDirection === "desc") val *= -1;

      return val;
    });

    this.setState({ data, sortProperty: property, sortDirection });
  };

  resetTable = () => {
    this.setState({
      data: this.props.data,
      sortProperty: "",
      sortDirection: null,
      isPanelOpen: false,
      filters: {},
      currentPage: 1,
    });
  };

  handlePagination = (newData, currentPage) => {
    newData = newData.map((item) => ({ id: item.activityId, ...item }));
    this.setState({ displayedData: newData, currentPage });
  };

  filter = (arr, functionFilters) => {
    return arr.filter((row) => {
      for (const property in functionFilters) {
        if (!functionFilters[property](row[property] && row[property].toLowerCase())) return false;
      }
      return true;
    });
  };

  handleChange = (name, value) => {
    if(name === "regionId" && value !== ""){
      if(value[0].id!=='all'){
        this.setState({
          filteredPrograms : [{ label: "All", id: "all" }, ...this.state.programs.filter(function(program){
            return program.target_region===value[0].id
          })]
        })
      }else{
        this.setState({
          filteredPrograms: this.state.programs
        })
      }
      
    }
    if(name === "startDate" && value !== "") {
      this.setState({
        errors: {...this.state.errors, startDate: false, repeated: false}
      });
    } else if(name === "endDate" && value !== "") {
      this.setState({
        errors: {...this.state.errors, endDate: false, repeated: false}
      });
    }
    this.setState({ filters: { ...this.state.filters, [name]: value } });
  };

  onFilter = () => {
    let data = [...this.props.data];
    const { filters } = this.state;
    const functionFilters = {};

    for (const property in filters) {

      if (property === "startDate" || property === "endDate") {
        const startMoment = moment(filters["startDate"], "DD/MM/YYYY");
        const endMoment = moment(filters["endDate"], "DD/MM/YYYY");

        if (filters["startDate"] && !filters["endDate"]) {
          this.setState({ errors: {...this.state.errors, endDate: true} })
          return;
        } else if (!filters["startDate"] && filters["endDate"]) {
          this.setState({ errors: {...this.state.errors, startDate: true} })
          return;
        } else if (filters["startDate"] && filters["endDate"]) {
          if(filters["startDate"] === filters["endDate"]) {
            this.setState({ errors: {...this.state.errors, repeated: true} })
            return;
          } else {
            functionFilters["startDate"] = (value) => {
              return moment(value, "YYYY-MM-DD").isBetween(
                startMoment,
                endMoment,
                undefined,
                "[]"
              );
            };
          }
        }

      } else if (Array.isArray(filters[property]))
        functionFilters[property] = (value) =>
          filters[property][0].label === "All" ||
          value.includes(filters[property][0].label.toLowerCase());
      else
        functionFilters[property] = (value) =>
          value && value.includes(filters[property].toLowerCase());
    }

    let filter = this.filter(data, functionFilters);
    this.setState({
      data: filter,
      isPanelOpen: false,
      filters,
      currentPage: 1,
    });
  };

  onChangeDate = (dates) => {
    this.setState({startDate:dates.selection.startDate, endDate:dates.selection.endDate})
  }
  handleFilterChange = (event) => {
    this.setState({isFiltering:true})
    if(event.target.value.length > 3)
    {const filteredUserItems = this.state.data.filter((item) =>{
      if (RegExp(event.target.value, 'i').test(item.userId) ||
      RegExp(event.target.value, 'i').test(item.campaignId) ||
      RegExp(event.target.value, 'i').test(item.title) ||
      RegExp(event.target.value, 'i').test(item.programId)){
        return true
      }
    });
    this.setState({displayedData:filteredUserItems})}
    this.setState({isFiltering:false})
  }

  entityCombobox = () => (
    <Combobox 
    assistiveText={{ label: 'Filter Search by:' }}
    variant="readonly"
    events={{}}
    // value={accounts}
    selection={{id:1, label:"One"}}
    options={comboboxFilterAndLimit({
      // inputValue:[{id:1, label:"One"}, {id:1, label:"Two"}, {id:1, label:"Three"}],
      options:[{id:1, label:"One"}, {id:1, label:"Two"}, {id:1, label:"Three"}],
      selection:[{id:1, label:"One"}, {id:1, label:"Two"}, {id:1, label:"Three"}]
    })}
    />)

  formatsWithIcon = (formats) => {return formats.map((elem) => ({
    ...elem,  ...{icon:(<Icon assistiveText={{ label: 'Account' }} category="standard"/>)}
  }))}

  render() {
    const isEmpty = this.state.data.length === 0;
    return (
      <Container>
        {this.state.cloneModalIsOPen && (
          <CloneModal
            data={this.props.dataTable.item}
            onToast={this.onToast}
            toggleOpen={this.toggleOpen}
            reloadActivities={this.props.reloadActivities}
            historicDate={this.state.historicDate}
            isHistoric={this.state.isHistoric}
          />
        )}

        {this.state.historicModalIsOpen && (
          <HistoricModal
            getActivities={this.props.reloadActivities}
            closeHistoricModal={this.closeHistoricModal}
            handleHistoricDate={this.handleHistoricDate}
            historicDate={this.state.historicDate}
            resetHistoricDate={() => this.setState({ historicDate: {} })}
          />
        )}
        {this.state.detailModalIsOpen && (
          <ViewActivityModal
            closeDetailModal={this.closeDetailModal}
          />
        )}
        {/* {this.state.editModalIsOPen && (
          <Modal
            data={this.props.dataTable.item}
            onToast={this.onToast}
            toggleOpen={this.toggleOpen}
            reloadActivities={this.props.reloadActivities}
          />
        )} */}
        {/* <PageHeader
          onRenderActions={this.actions}
          icon={
            <Icon
              assistiveText={{ label: "User" }}
              category="standard"
              name="lead"
            />
          }
          info={`${this.state.displayedData.length} of ${
            this.state.data.length
          } ${this.state.data.length === 1 ? "item" : "items"}`}
          joined
          onRenderControls={this.controls}
          title={<h1>Activities</h1>}
          truncate
          variant="object-home"
        /> */}
        {this.state.isPanelOpen && (
          <FilterPanel
            regions={this.state.regions}
            programs={this.state.filteredPrograms}
            formats={this.state.formats}
            onFilter={this.onFilter}
            filters={this.state.filters}
            handleChange={this.handleChange}
            errors={this.state.errors}
          />
        )}
        {
          
            <Modal
              isOpen={this.state.isHistoric}
              size="medium"
              onRequestClose={() => this.setState({isHistoric:false})}
              ><DateRangePicker 
            onChange={this.onChangeDate}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={[{startDate:this.state.startDate, key: 'selection', endDate:this.state.endDate}]}
            direction="horizontal"
          /></Modal>
          
        }
        {<Modal 
            isOpen={this.state.OpenFilters}
            size="medium"
            onRequestClose={() => this.setState({OpenFilters:false})}
            footer={[
							<Button label="Cancel" onClick={this.toggleOpen} />,
							<Button label="Save" variant="brand" onClick={this.toggleOpen} />,
						]}
            heading="Add Filters"
          ><section className="slds-p-around_large">
           <Combobox 
            multiple
            variant="inline-listbox"
            labels={{
              label: 'Search Programs',
              placeholder: 'Add Program',
            }}
            entityCombobox={this.entityCombobox()}
            events={{}}
            // selection={[{id:1, label:"One"}]}
            options={comboboxFilterAndLimit({
              // inputValue:[{id:1, label:"One"}, {id:2, label:"Two"}, {id:3, label:"Three"}],
              options:[{id:1, label:"One"}, {id:2, label:"Two"}, {id:3, label:"Three"}],
              selection:[{id:1, label:"One"}]
            })}
          />
          {this.state.OpenFilters && (<Combobox 
            multiple
            labels={{
              label: 'Search Format',
              placeholder: 'Add Format',
            }}
            events={{
              onChange:(event, {value}) => {
                this.setState({formatInputValue:value})
              },
              onRequestRemoveSelectedOption: (event, data) => {
                this.setState({
                  formatInputValue:'',
                  formatsSelected:data.selection
                })
              },
              onSubmit: (event, { value }) => {
                this.setState({
                  formatInputValue:'',
                  formatsSelected:[
                    ...this.state.formatsSelected,
                    {
                      label:value,
                      icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign" />)
                    }
                  ]
                })
              },
              onSelect: (event, data) => {
                this.setState({
                  inputValue: '',
                  formatsSelected:data.selection
                })
              }
            }}
            menuPosition="relative"
            selection={this.state.formatsSelected}
            // value={'one'}
            menuItemVisibleLength={5}
            options={comboboxFilterAndLimit({
              inputValue:this.state.formatInputValue,
              limit: 50,
              options:this.state.formats,
              selection:this.state.formatsSelected,
             })}
              />)}</section>
          </Modal>}
        <Card 
          heading="Activities"
          filter={!this.state.isCalanderView && 
            (!isEmpty || this.state.isFiltering) && (
              <Input 
                type="search"
                iconLeft={
                  <InputIcon
                    assistiveText={{
                      icon: 'Search',
                    }}
                    name="search"
                    category="utility"
                  />
                }
                hasSpinner={this.state.isFiltering}
                placeholder="Search"
                onChange={this.handleFilterChange}
							/>
							
              // <CardFilter onChange={this.handleFilterChange} />
            )
          }
          headerActions={(<ButtonGroup id="button-group-page-header-actions">
            <Tooltip
          content={!this.state.isCalanderView ? "Open Calendar View" : "Open List View"}
        >
          <Button
          onClick={this.calendarViewBtn}
          >
            <Icon 
              assistiveText={{ label: 'Event' }}
              category="utility"
              name={!this.state.isCalanderView ? "event" : "list"}
              size="x-small"
            />
          </Button>
        </Tooltip>
          <Button
            assistiveText={{ icon: "Filters" }}
            iconCategory="utility"
            iconName="filterList"
            iconVariant="border-filled"
            variant="icon"
            title="Filter"
            onClick={() => {
              this.setState({OpenFilters:true})}}/>
          {!this.state.isCalanderView && (<Tooltip content="Select Date Range for Filter" align="bottom right"><Button 
          label={this.state.startDate.toLocaleDateString()+" To "+this.state.endDate.toLocaleDateString()}
          onClick={this.historicBtn}
          /></Tooltip>)}
          <Dropdown 
            onSelect={this.exportBtn} 
            width="xx-small"
            options={this.exportOptions}
          >
          <DropdownTrigger>
            <Button 
              // assistiveText={{ icon: 'XML' }}
              iconCategory="doctype"
              iconName="xml"
              iconPosition="right"
              label="Export"
            />
          </DropdownTrigger>
        </Dropdown>
          <Link to="/create-activity">
            <Tooltip content="Add New Activity" align="bottom right">
            <Button>
              <Icon  assistiveText={{ icon: 'New' }} category="utility" name="new" size="x-small"/>
            </Button></Tooltip>
          </Link>
        </ButtonGroup>)}
          icon={<Icon
            assistiveText={{ label: "User" }}
            category="standard"
            name="lead"
          />}
          
        >
        { !this.state.isCalanderView && (<DataTable
          assistiveText={{
            actionsHeader: "actions",
            columnSort: "sort this column",
            columnSortedAscending: "asc",
            columnSortedDescending: "desc",
            selectAllRows: "Select all rows",
            selectRow: "Select this row",
          }}
          columnBordered
          fixedHeader
          fixedLayout={this.state.expandTable}
          items={this.state.displayedData}
          id="activitiesTable"
          joined
          onRowChange={this.props.selectItem}
          onSort={this.onSort}
          ref={this.table}
          noRowHover={this.state.noRowHover}
          className={
            `${
              this.state.displayedData && this.state.displayedData.length < 5
                ? 'padding_bottom'
                : ''
            }`
          }
        >
          <DataTableColumn
            width={`${this.state.columnWidth['Owner']}px`}
            label="Owner"
            property="userId"
          />
          <DataTableColumn
            width={`${this.state.columnWidth['Program']}px`}
            label="Program"
            property="programId"
          />
          <DataTableColumn
            width={`${this.state.columnWidth['Campaign ID']}px`}
            label="Campaign ID"
            property="campaignId"
          />
          <DataTableColumn
            width={`${this.state.columnWidth['Title']}px`}
            label="Title"
            property="title"
          />
          <DataTableColumn
            width={`${this.state.columnWidth['Format']}px`}
            label="Format"
            property="formatId"
          />
          <DataTableColumn
            width={`${this.state.columnWidth['Abstract']}px`}
            label="Abstract"
            property="abstract"
          />
          <DataTableColumn
            width={`${this.state.columnWidth['Region']}px`}
            sortDirection={this.state.sortDirection || "desc"}
            sortable
            isSorted={this.state.sortProperty === "regionId"}
            label="Region"
            property="regionId"
          />
          <DataTableColumn
            width={`${this.state.columnWidth['Start date']}px`}
            isSorted={this.state.sortProperty === "startDate"}
            label="Start date"
            property="startDate"
            sortable
            sortDirection={this.state.sortDirection || "desc"}
          >
            <DateCell />
          </DataTableColumn>
          <DataTableColumn
            width={`${this.state.columnWidth['End date']}px`}
            isSorted={this.state.sortProperty === "endDate"}
            label="End date"
            property="endDate"
            sortable
            sortDirection={this.state.sortDirection || "desc"}
          >
            <DateCell />
          </DataTableColumn>
          <DataTableColumn
            width={`${this.state.columnWidth['Assets']}px`}
            label="Assets"
            property="asset"
          >
            <DropDownCellAsset />
          </DataTableColumn>

          <DataTableRowActions
            options={this.state.isHistoric ? [
              {
                id: 3,
                label: "View",
                value: "4",
              },
              {
                id: 2,
                label: "Clone",
                value: "3",
              }
            ] : [
              {
                id: 0,
                label: "Edit",
                value: "1",
              },
              {
                id: 1,
                label: "Delete",
                value: "2",
              },
              {
                id: 2,
                label: "Clone",
                value: "3",
              },
            ]}
            menuPosition="overflowBoundaryElement"
            onAction={this.handleRowAction}
            dropdown={<Dropdown length="7" />}
          />
        </DataTable>)}
        {this.state.isCalanderView &&
                (<ActivityCalendar 
                  activities={this.state.data}/>)}
        {!this.state.isCalanderView && (<Pager
          data={this.state.data}
          itemsPerPage={100}
          setDisplayedItems={this.handlePagination}
          currentPage={this.state.currentPage}
        />)}
                  </Card>
        {this.state.toast.show && (
          <ToastContainer>
            <Toast
              labels={{ heading: [this.state.toast.message] }}
              variant={this.state.toast.variant}
              duration={5000}
              onRequestClose={() => this.setState({ toast: { show: false } })}
            />
          </ToastContainer>
        )}
      </Container>
    );
  }
}

let mapState = ({ dataTable }) => ({
  dataTable,
});

export default withRouter(connect(mapState, { selectItem, setItem })(Table));
