import React, { Component, Fragment } from "react";
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
  PageHeaderControl,
  ToastContainer,
  Toast,
  Tooltip,
  DropdownTrigger,
  Modal,
  Combobox,
  comboboxFilterAndLimit,
} from "@salesforce/design-system-react";

import { getCookie } from '../../utils/cookie';
import { getAPIUrl } from "../../config/config";
import EditModal from "../EditActivityModal";
import CloneModal from "../CloneActivityModal";
import HistoricModal from "../HistoricActivityModal";
import ViewActivityModal from "../ViewActivityModal";
import Pager from "../Pager";
import ActivityCalendar from "../ActivityCalendar"

// ACTIONS
import { selectItem, setItem } from "../../actions/DataTable";
import { Container, MultiSelectContainer} from "./styles";


import jsPDF from "jspdf";
import "jspdf-autotable";
import exportFromJSON from 'export-from-json'

import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns';
//import CalendarViewHeadFilter from "../CalendarViewHeadFilter"
import { push as Menu } from 'react-burger-menu'
import MultiSelect from '../MultiSelect'
import "react-datepicker/dist/react-datepicker.css";
import CreateActivity from "../CreateActivity";


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
    isExpandableSectionOpen: false,
    displayedData: [],
    calendarViewData:[],
    filters: {},
    errors: {},
    currentPage: 1,
    pageLimit:100,
    expandTable: true,
    columnWidth: {},
    tableExtraWidth: 0,
    noRowHover: false,
    isHistoric: false,
    isCalanderView: true,
    popoverOpen: false,
    showExportMenu: false,
    historicModalIsOpen: false,
    detailModalIsOpen: false,
    historicDate: {},
    programsFYstartDate: '',
    programsFYendDate: '',
    startDate:'',
    endDate:'',
    isFiltering: false,
    formatsSelected :[],
    defaultFormats: [],
    formatInputValue:'',
    isFormatFilterOpen:false,
    programSelected:[],
    programInputValue:'',
    isProgramFilterOpen:false,
    regionsSelected:[],
    regionsInputValue:'',
    isRegionFilterOpen:false,
    industrySelected: [],
    industryInputValue: '',
    isIndustryFilterOpen:false,
    segmentSelected: [],
    segmentInputValue: '',
    isSegmentFilterOpen:false,
    apm1Selected: [],
    apmInputValue: '',
    isApmFilterOpen:false,
    OpenFilters:false,
    openMenuBar:false,
    userId: localStorage.getItem('userId'),
    defaultUserFilter: {},
    calendarView: {date: new Date(), view:'month', action:'Today'},
    row:{},
    openNew: false,
  };

  table = React.createRef()

  componentDidMount() {
    this.setupAndFetch();
    !this.state.isCalanderView && this.resizableTable(this.table.current.scrollerRef.children[0])
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.setState({ data: this.props.data }, () => {
        if(this.state.sortProperty && this.state.sortDirection) {
          this.onSort({property: this.state.sortProperty, sortDirection: this.state.sortDirection})
        }
      });
      if (this.state.defaultUserFilter.length !== 0 && 
        this.state.defaultUserFilter.formats_selected.length +
        this.state.defaultUserFilter.programs_selected.length + 
        this.state.defaultUserFilter.regions_selected.length !== 0)
        this.updateFilters()
      this.getFilteredData();
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
    this.getIndustry();
    this.getSegment();
    this.getAPM1();
    this.getUserDefaultFilter();
    this.setState({historicDate: { startDate:new Date(), key: 'selection', endDate:addDays(new Date(), 7)}, startDate:new Date(), key: 'selection', endDate:addDays(new Date(), 7) })
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
        let programs = result.map(el => ({...el, id: el.program_id, icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign"/>)}))
        this.setState({
          programs: [{ label: "All", id: "all", icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign"/>)}, ...programs],
          filteredPrograms: [{ label: "All", id: "all", icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign"/>)}, ...programs],
        });
        this.setState({programSelected: [this.state.programs[0]]})
      } else throw new Error(response);
    } catch (err) {
      console.error(err);
    }
  }
  getIndustry = async () => {
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
      const request = await fetch(`${this.API_URL}/industry`, config);
      const response = await request.json();
      const industry = response.result.map(item => ({id: item.industryId, label: item.name}));

      if(response.info.code === 200) this.setState({ industries : industry });
      else throw new Error(response.info.status);
    } catch (err) {
      console.error(err);
    }
  };

  getSegment = async () => {
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
      const request = await fetch(`${this.API_URL}/segment`, config);
      const response = await request.json();
      const segment = response.result.map(item => ({id: item.segmentId, label: item.name}));

      if(response.info.code === 200) this.setState({ segments: segment });
      else throw new Error(response.info.status);
    } catch (err) {
      console.error(err);
    }
  };
  getAPM1 = async () => {
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
      const request = await fetch(`${this.API_URL}/apm1`, config);
      const response = await request.json();
      const apm1 = response.result.map(item => ({id: item.apm1Id, label: item.name}));


      if(response.info.code === 200) this.setState({ apm1s: apm1 });
      else throw new Error(response.info.status);
    } catch (err) {
      console.error(err);
    }
  };


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
        let regions = result.map(el => ({...el, id: el.region_id, icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign"/>)}));
        this.setState({
          regions: [{ label: "All", id: "all", icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign"/>)}, ...regions],
        });
        this.setState({
          regionsSelected:[this.state.regions[0]]
        })
      } else {
        throw new Error(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  getEventColor = (format) => {
    switch(format){
        case '3rdParty-Virtual Event': return '02d4308c'
        case 'Webinar': return 'e081048c'
        case 'Exec Engagement': return 'c9c5068c'
        case 'Executive Visit': return '058eb88c'
        case 'F2F Event': return '0520b88c'
        case 'Webinar - 3rd Party': return '4405b88c'
        case 'Virtual Event': return 'a905b88c'
        case 'SIC': return 'b805148c'
        case 'Launch': return '5983598c'
        default : return '04f7398c'
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
        let formats = result.map(el => ({...el, id: el.format_id, icon:(<Icon assistiveText={{ label: 'Task' }} category="standard" name="task2" style={{background:'#'+this.getEventColor(el.label)}}/>)}))
        this.setState({
          formats: [{ label: "All", id: "all", icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign"/>)}, ...formats],
        });
        let defaultFormats = this.getDefaultFornats(formats)
        this.setState({
          formatsSelected:defaultFormats,
          defaultFormats:defaultFormats
        })
      } else {
        throw new Error(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  getDefaultFornats = (formats) => {
    let defaultFormatNames = ['3rdParty-Virtual Event', 'Exec Engagement', 'Executive Visit', 'F2F Event', 'Webinar', 'Webinar - 3rd Party', 'Virtual Event', 'SIC', 'Launch']
    return formats.filter(format => {
      if(!defaultFormatNames.includes(format.label)) return false;
      return true;
    })
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
    this.setDisplayedData(this.state.startDate, this.state.endDate)
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
      default:
        console.err('Default Value')
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
      "Program", 
      "Title", 
      "Format", 
      "Region", 
      "Start Data", 
      ]];
  
    const exportData = this.state.displayedData.map(elt=> [
      elt.programId, 
      elt.title, 
      elt.formatId, 
      elt.regionId, 
      elt.startDate.replace('T00:00:00.000Z',''), 
      ]);
  
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
        0:{cellWidth: 80},
        1:{cellWidth: 250},
        2:{cellWidth: 70},
        3:{cellWidth: 70},
        4:{cellWidth: 60},
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
        
        <Dropdown 
          assistiveText={{ icon: 'XML' }}
					iconCategory="doctype"
					iconName="xml"
					iconVariant="border-filled"
          onSelect={this.exportBtn} 
          value={this.exportOptions[0]} 
          options={this.exportOptions}
        />
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
  clearFilter = () => {
    var defaultFormats = this.getDefaultFornats(this.state.formats)
    this.setState({
      data:this.props.data,
      calendarViewData:this.props.data,
      formatsSelected :defaultFormats,
      formatInputValue:'',
      programSelected:[this.state.programs[0]],
      programInputValue:'',
      regionsSelected:[this.state.regions[0]],
      regionsInputValue:'',
      OpenFilters:false,
    })
    this.getFilteredData();
  }

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

  getFilteredPrograms = (region) =>{
    if(region){
      try{
        if(region.length > 1 || region[0].id !== 'all'){
          const filteredPrograms = this.state.programs.filter( x => this.state.regionsSelected.find( y => y.id === x.target_region))
          this.setState({
            filteredPrograms : filteredPrograms
          })
        }else{
          this.setState({
            filteredPrograms: this.state.programs
          })
        }
      }
      catch(e){
        this.setState({
          filteredPrograms: this.state.programs
        })
      }
  }
  }
  getNewPrograms = () => {
    return this.state.filteredPrograms
  }
  // getFilteredProgramsByFilters = () => {

  //   const selectedIndustries = this.state.industrySelected.map(function (key) {
  //     return key.label
  //   } )
  //   const selectedApms = this.state.apm1Selected.map(function (key) {
  //     return key.label
  //   } )
  //   const selectedSegments = this.state.segmentSelected.map(function (key) {
  //     return key.label
  //   } )
  //   const programs = this.state.programs
  //   const filteredData = programs.filter((el) => {
  //   })

  // }

  updateFilters = () => {
    const { formats_selected, programs_selected, regions_selected } = this.state.defaultUserFilter;
    let selectedFormats = this.state.formats.filter((item) => {
      if (formats_selected.length >= 0 && !formats_selected.includes(item.id)) return false;
      return true;
    })
    let programSelected = this.state.programs.filter((item) => {
      if (programs_selected.length >= 0 && !programs_selected.includes(item.id)) return false;
      return true;
    })
    let slectedRegioins = this.state.regions.filter((item) => {
      if (regions_selected.length >= 0 && !regions_selected.includes(item.id)) return false;
      return true;
    })
    this.state.regionsSelected = slectedRegioins
    this.state.programSelected = programSelected
    this.state.formatsSelected = selectedFormats
  }

  getFilteredData = () => {
    const slectedRegioins = this.state.regionsSelected.map(function (key) {
      return key.label
    } )
    const programSelected = this.state.programSelected.map(function (key) {
      return key.label
    } )
    const formatsSelected = this.state.formatsSelected.map(function (key) {
      return key.label
    } )
    const arr = this.props.data
    const filteredData = arr.filter((row) => {
      if (!slectedRegioins.includes('All') && !slectedRegioins.includes(row.regionId)) return false;
      if (programSelected.length > 0 && !programSelected.includes('All') && !programSelected.includes(row.programId)) return false;
      if(formatsSelected.length > 0 && !formatsSelected.includes('All') && !formatsSelected.includes(row.formatId)) return false;
      return true;
    });
    this.setState({data:filteredData, calendarViewData:filteredData, OpenFilters:false})
  }

  getFormData = data => {
    this.setState({row: data});
  };

  onSubmit = () => {
    this.setState({showLoader: true});

    try {
      this.props.history.push({
        pathname: '/my-activities',
        state: { newActivity: true }
      });
    } catch (error) {
      this.setState({showToast: true});
    }

    this.setState({showLoader: false});
  };

  getUserDefaultFilter = async () => {
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
      const request = await fetch(`${this.API_URL}/user-filter/`+this.state.userId, config);
      const response = await request.json();
      const defaultUserFilter = response.result.length > 0 ? response.result[0] : [];

      if(response.info.code === 200) this.setState({ defaultUserFilter : defaultUserFilter });
      else throw new Error(response.info.status);
    } catch (err) {
      console.error(err);
    }
  };

  saveAsDefaultFilter = async e  => {
    try {
      const {regionsSelected, programSelected, formatsSelected} = this.state;
      const slectedRegioinsId = regionsSelected.map(function (key) {
        return key.id
      } )
      const programSelectedId = programSelected.map(function (key) {
        return key.id
      } )
      const formatsSelectedId = formatsSelected.map(function (key) {
        return key.id
      } )

      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: this.state.defaultUserFilter.length !== 0 ?'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: this.state.userId,
          formats:  formatsSelectedId,
          regions: slectedRegioinsId,
          programs:programSelectedId,
        })
      }
      let response = this.state.defaultUserFilter.length !== 0 ? await fetch(`${this.API_URL}/user-filters/${this.state.defaultUserFilter.user_filter_id}`, config) : await fetch(`${this.API_URL}/user-filters`, config);
      if(response.info !== undefined && response.info.code === 200){
        this.getFilteredData()
        this.setState({  openMenuBar: false })
        this.onToast(true, "User Defined Filter Saved", 'success');
      }else if(response.status !== undefined && response.status ===200){
        this.getFilteredData()
        this.setState({  openMenuBar: false })
        this.onToast(true, "User Defined Filter Saved", 'success');
      }else {
        this.setState({  openMenuBar: false })
        this.onToast(true, "Something went wrong, please try again in a few seconds", 'error');
      }
    } catch (err) {
      console.error(err);
      this.onToast(true, "Something went wrong, please try again", "error");
    }
  }

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

  openMenu = () => {
    this.setState({openMenuBar:!this.state.openMenuBar})
  }

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
    var [start, end] = dates
    this.setState({startDate:start, endDate:end, calendarView:{date:start, view:this.state.calendarView.view ,action: moment(start, "DD/MM/YYYY") > moment(new Date(), "DD/MM/YYYY") ? 'NEXT' : 'PREV'}})
    this.setDisplayedData(start, end ? end : start)
  }

  onClickToday = () => {
    this.setState({startDate: new Date(), endDate:addDays(new Date(), 7), calendarView:{date:new Date(), view: this.state.calendarView.view, action: this.state.calendarView.action}})
  }

  previousMonth = () => {
    var {date, view} = this.state.calendarView
    this.changeView(date, view, 'PREV')
  }

  nextMonth = () => {
    var {date, view} = this.state.calendarView
    this.changeView(date, view, 'NEXT')
  }

  changeView = (date, view, action) => {
    var days = view === 'month' ? 30 : 7
    var sub = action === 'PREV' ? -1 : +1
    this.setState({calendarView:{date:addDays(date, sub*days), view: view, action: action}})
  }

  setDisplayedData = (startDate, endDate) => {
    startDate = moment(startDate,"DD/MM/YYYY")
    endDate = moment(endDate,"DD/MM/YYYY")
    const newData = this.props.data.filter(a => {
      var date = moment(new Date(a.startDate),"DD/MM/YYYY")
      return (date >= startDate && date <= endDate)
    });    
    this.setState({data:newData})
  }

  handleFilterChange = (event) => {
    this.setState({isFiltering:true})
    if(event.target.value.length>0)
    {const filteredUserItems = this.state.data.filter((item) =>{
      
      if (RegExp(event.target.value, 'i').test(item.userId) ||
      RegExp(event.target.value, 'i').test(item.campaignId) ||
      RegExp(event.target.value, 'i').test(item.title) ||
      RegExp(event.target.value, 'i').test(item.programId)){
        return true
      }
      });
      this.setState({data:filteredUserItems})
    }
    else if(event.target.value.length===0){
      if(this.state.formatsSelected.length > 0 || this.state.programSelected.length > 0 || this.state.regionsSelected.length > 0){
        this.getFilteredData()
        this.setState({isFiltering:false})
      }else{
        this.setState({data: this.props.data, isFiltering:false})
        this.handlePagination(this.state.data.slice(0, this.state.pageLimit), this.state.currentPage)
      }
    }
    
  }

  entityCombobox = () => (<div className="slds-form-element slds-m-bottom_large">
    <Combobox 
    assistiveText={{ label: 'Filter Search by:' }}
    events={{
      onRequestClose: () => {
        this.setState({isProgramFilterOpen:false})
      },
      onChange:(event, {value}) => {
        this.setState({regionsInputValue:value})
      },
      onRequestRemoveSelectedOption: (event, data) => {
        this.setState({
          regionsInputValue:'',
          regionsSelected:data.selection
        })
      },
      onSubmit: (event, { value }) => {
        this.setState({
          regionsInputValue:'',
          regionsSelected:[
            ...this.state.regionsSelected,
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
          regionsSelected:data.selection
        })
        this.getFilteredPrograms(data.selection)
      }
    }}
    menuMaxWidth="10px"
    inheritWidthOf="menu"
    menuItemVisibleLength={5}
    variant="readonly"
    value={this.state.regionsInputValue}
    selection={this.state.regionsSelected}
    options={comboboxFilterAndLimit({
      inputValue:this.state.regionsInputValue,
      options:this.state.regions,
      selection:this.state.regionsSelected,
    })}
    /></div>)

  formatsWithIcon = (formats) => {return formats.map((elem) => ({
    ...elem,  ...{icon:(<Icon assistiveText={{ label: 'Account' }} category="standard"/>)}
  }))}

  // modifyFilter = (formats) => {
  //   this.state.formatsSelected = formats
  //   this.getFilteredData()
  // }

  menuSetSelectedRegion = (selectedData) => {
    this.setState({regionsSelected:selectedData})
    this.getFilteredPrograms(selectedData)
    this.getFilteredData()

  }

  menuSetSelectedProgram = (selectedData) => {
    this.setState({programSelected:selectedData})
    this.getFilteredData()
  }

  menuSetSelectedFormat = (selectedData) => {
    this.setState({formatsSelected:selectedData})
    // this.getFilteredData()
  }

  openNewActivity = () => {
    this.setState({openNew: true})
  }

  setCalendarView = () => {
    var {date, view, action} = this.state.calendarView
    if (view === 'month'){
      this.setState({calendarView:{date:date, view: 'week', action: action}})
    }else{
      this.setState({calendarView:{date:date, view: 'month', action: action}})

    }
  }

  render() {
    const isEmpty = this.state.data.length === 0;
    return (
      <Container id="outer-container">
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
        {this.state.editModalIsOPen && (
          <EditModal
            data={this.props.dataTable.item}
            onToast={this.onToast}
            toggleOpen={this.toggleOpen}
            reloadActivities={this.props.reloadActivities}
          />
        )}
        {<Modal isOpen={this.state.openNew} onRequestClose={() => this.setState({openNew:false})} size="medium"><div className="slds-p-around_large" >
          <CreateActivity
            getFormData = {this.getFormData}
            handleSubmit={this.onSubmit}
            abstract = {'"To help infuse our Salesforce community with joy and inspiration, today we launched our #FeelGoodFridays series across our social channels. 🙌The aim of this series is to share how our community is keeping spirits high with positive vibes every week. Our first #FeelGoodFriday story is about one of our education Trailblazers, A Team Tuition. No doubt, many of us can relate to Hayden’s story of being stereotyped at school as a particular type of learner. Well, Hayden has turned this on its head with his business A Team Tuition."'}
          /></div></Modal>}
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
        
        {
          
          //   <Modal
          //     isOpen={this.state.isHistoric}
          //     size="medium"
          //     onRequestClose={() => this.setState({isHistoric:false})}
          //     ><DateRangePicker 
          //   onChange={this.onChangeDate}
          //   showSelectionPreview={true}
          //   moveRangeOnFirstSelection={false}
          //   months={2}
          //   ranges={[{startDate:this.state.startDate, key: 'selection', endDate:this.state.endDate}]}
          //   direction="horizontal"
          // /></Modal>
          
        }
        {/* {<Modal 
            isOpen={this.state.OpenFilters}
            size="medium"
            onRequestClose={() => this.setState({OpenFilters:false})}
            footer={[
              <Button key="Save As Default" label="Save As Default" variant="outline-brand" onClick={this.getFilteredData} />,
							<Button key="Clear" label="Clear" onClick={this.clearFilter} />,
							<Button key="Save" label="Save" variant="brand" onClick={this.getFilteredData} />,
						]}
            heading="Add Filters"
          ><section className="slds-p-around_large">
            <div className="slds-form-element slds-m-bottom_large">
           {this.state.OpenFilters && (<div className="slds-form-element slds-m-bottom_large">
            <ExpandableSection
              title="Add Program Filter"
              isOpen={this.state.isExpandableSectionOpen}
              onToggleOpen={() => {this.setState({ isExpandableSectionOpen: !this.state.isExpandableSectionOpen })}}
            >
              <div className="expandableRow">
                <div className="expandableColumn">
                <Combobox 
                    multiple
                    labels={{
                      placeholder: 'Add Industry',
                    }}
                    isOpen={this.state.isIndustryFilterOpen}
                    events={{
                      onChange:(event, {value}) => {
                        this.setState({industryInputValue:value})
                      },
                      onRequestClose: () => {
                        this.setState({isIndustryFilterOpen:false})
                      },
                      onRequestOpen: () => {
                        this.setState({isIndustryFilterOpen:true})
                      },
                      onRequestRemoveSelectedOption: (event, data) => {
                        this.setState({
                          industryInputValue:'',
                          industrySelected:data.selection
                        })
                      },
                      onSubmit: (event, { value }) => {
                        this.setState({
                          industryInputValue:'',
                          industrySelected:[
                            ...this.state.industrySelected,
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
                          industrySelected:data.selection
                        })
                      }
                    }}
                    selection={this.state.industrySelected}
                    menuItemVisibleLength={5}
                    options={comboboxFilterAndLimit({
                      inputValue:this.state.industryInputValue,
                      limit: 50,
                      options:this.state.industries,
                      selection:this.state.industrySelected,
                    })}
                  />
                </div>
                <div className="expandableColumn">
                <Combobox 
                      multiple
                      labels={{
                        placeholder: 'Add APM',
                      }}
                      isOpen={this.state.isApmFilterOpen}
                      events={{
                        onChange:(event, {value}) => {
                          this.setState({apmInputValue:value})
                        },
                        onRequestRemoveSelectedOption: (event, data) => {
                          this.setState({
                            apmInputValue:'',
                            apm1Selected:data.selection
                          })
                        },
                        onSubmit: (event, { value }) => {
                          this.setState({
                            apmInputValue:'',
                            apm1Selected:[
                              ...this.state.apm1Selected,
                              {
                                label:value,
                                icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign" />)
                              }
                            ]
                          })
                        },
                        onRequestClose: () => {
                          this.setState({isApmFilterOpen:false})
                        },
                        onRequestOpen: () => {
                          this.setState({isApmFilterOpen:true})
                        },
                        onSelect: (event, data) => {
                          this.setState({
                            apmInputValue: '',
                            apm1Selected:data.selection
                          })
                        }
                      }}
                      selection={this.state.apm1Selected}
                      menuItemVisibleLength={5}
                      options={comboboxFilterAndLimit({
                        inputValue:this.state.apmInputValue,
                        limit: 50,
                        options:this.state.apm1s,
                        selection:this.state.apm1Selected,
                      })}
                    />
                </div>
                <div className="expandableColumn">
                <Combobox 
                      multiple
                      labels={{
                        placeholder: 'Add Segment',
                      }}
                      isOpen={this.state.isSegmentFilterOpen}
                      events={{
                        onChange:(event, {value}) => {
                          this.setState({segmentInputValue:value})
                        },
                        onRequestClose: () => {
                          this.setState({isSegmentFilterOpen:false})
                        },
                        onRequestOpen: () => {
                          this.setState({isSegmentFilterOpen:true})
                        },
                        onRequestRemoveSelectedOption: (event, data) => {
                          this.setState({
                            segmentInputValue:'',
                            segmentSelected:data.selection
                          })
                        },
                        onSubmit: (event, { value }) => {
                          this.setState({
                            segmentInputValue:'',
                            segmentSelected:[
                              ...this.state.segmentSelected,
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
                            segmentSelected:data.selection
                          })
                        }
                      }}
                      selection={this.state.segmentSelected}
                      menuItemVisibleLength={5}
                      options={comboboxFilterAndLimit({
                        inputValue:this.state.segmentInputValue,
                        limit: 50,
                        options:this.state.segments,
                        selection:this.state.segmentSelected,
                      })}
                    />
                </div>
                <div className="expandableColumn">
                  <Button label="Filter Programs" variant="outline-brand" onClick={this.getFilteredProgramsByFilters}/>
                </div>
              </div>    
            </ExpandableSection>
             <Combobox 
              multiple
              isOpen={this.state.isProgramFilterOpen}
              labels={{
                label: 'Search Programs',
                placeholder: 'Add Program',
              }}
              entityCombobox={this.entityCombobox()}
              events={{
                onChange:(event, {value}) => {
                  this.setState({programInputValue:value})
                },
                onRequestClose: () => {
                  this.setState({isProgramFilterOpen:false})
                },
                onRequestOpen: () => {
                  this.setState({isProgramFilterOpen:true})
                },
                onRequestRemoveSelectedOption: (event, data) => {
                  this.setState({
                    programInputValue:'',
                    programSelected:data.selection
                  })
                },
                onSubmit: (event, { value }) => {
                  this.setState({
                    programInputValue:'',
                    programSelected:[
                      ...this.state.programSelected,
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
                    programSelected:data.selection
                  })
                }
              }}
              selection={this.state.programSelected}
              menuItemVisibleLength={5}
              options={comboboxFilterAndLimit({
                inputValue:this.state.programInputValue,
                limit: 50,
                options:this.state.filteredPrograms,
                selection:this.state.programSelected,
              })}
            /></div>)}
          {this.state.OpenFilters && (<div className="slds-form-element slds-m-bottom_large"><Combobox 
            multiple
            labels={{
              label: 'Search Format',
              placeholder: 'Add Format',
            }}
            isOpen={this.state.isFormatFilterOpen}
            events={{
              onRequestClose: () => {
                this.setState({isFormatFilterOpen:false})
              },
              onRequestOpen: () => {
                this.setState({isFormatFilterOpen:true})
              },
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
            // menuPosition="relative"
            selection={this.state.formatsSelected}
            // value={'one'}
            menuItemVisibleLength={5}
            options={comboboxFilterAndLimit({
              inputValue:this.state.formatInputValue,
              limit: 50,
              options:this.state.formats,
              selection:this.state.formatsSelected,
             })}
              /></div>)}</div></section>
          </Modal>} */}
        <Card
          heading={<Icon></Icon>}
          filter={!this.state.isCalanderView && 
            (!isEmpty || this.state.isFiltering) && (
              <Input 
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
                onInput={this.handleFilterChange}
							/>
							
              // <CardFilter onChange={this.handleFilterChange} />
            )
          }
          headerActions={(<div style={{paddingTop: '6px'}}><ButtonGroup id="button-group-page-header-actions" >
            {this.state.isCalanderView && <div style={{float: 'left', paddingRight: '40px'}}>
              <div style={{display: 'table', 
              background: '#d8d5d5', 
              borderRadius:'1rem', }}>
                <div style={{float: 'left',}}>
                  <Button onClick={this.setCalendarView} variant="base" style={{borderRadius:'1rem', paddingLeft:'10px', paddingRight:'10px',
                  color: this.state.calendarView.view === 'month'? 'white': 'black',
                  background: this.state.calendarView.view === 'month'? '#45a7f1' :'#d8d5d5'}}>Month</Button></div>
                <div style={{float: 'left',}}> <Button onClick={this.setCalendarView} variant="base" style={{borderRadius:'1rem', paddingLeft:'10px', paddingRight:'10px',
                  color:this.state.calendarView.view === 'week'? 'white': 'black',
                  background: this.state.calendarView.view === 'week'? '#45a7f1' :'#d8d5d5'}}>Week</Button></div>
              </div>
            </div>}
            {/* {this.state.isCalanderView && <div style={{float: 'left', paddingRight: '30px'}}>
            <Dropdown
              align="right"
              iconCategory="utility"
              iconName="down"
              iconPosition="right"
              onSelect={(value)=> {this.setState({calendarView:{date:this.state.calendarView.date, view: value.value, action: this.state.calendarView.action}})}}
              width='xx-small'
              options={[{label:'Month', value: 'month'}, {label:'Week', value: 'week'}]}
              label={this.state.calendarView.view=='month'? 'Month' : 'Week'}
            /></div>} */}
              {/* {this.state.isCalanderView &&  
              <div>
              <CalendarViewHeadFilter 
                defaultFormats={this.state.defaultFormats}
                modifyFilter={this.modifyFilter}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>} */}
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
        {/* <Tooltip content="Add Filter" align="bottom right">
          <Button
            assistiveText={{ icon: "Filters" }}
            iconCategory="utility"
            iconName="filterList"
            iconVariant="border-filled"
            variant="icon"
            title="Filter"
            onClick={() => {
              this.setState({OpenFilters:true})}}/></Tooltip>
          {!this.state.isCalanderView && (<Tooltip content="Select Date Range for Filter" align="bottom right"><Button 
          label={this.state.startDate.toLocaleDateString()+" To "+this.state.endDate.toLocaleDateString()}
          onClick={this.historicBtn}
          /></Tooltip>)} */}
          <Dropdown 
            onSelect={this.exportBtn} 
            width="xx-small"
            options={this.exportOptions}
          >
          <DropdownTrigger>
            <Button 
              // assistiveText={{ icon: 'XML' }}
              iconCategory="utility"
              iconName="download"
              iconPosition="left"
              label="Export"
            />
          </DropdownTrigger>
        </Dropdown>
          <Link to="/create-activity"></Link>
        <Tooltip content="Add New Activity" align="bottom right">
        <Button onClick={this.openNewActivity}>
          <Icon  assistiveText={{ icon: 'New' }} category="utility" name="new" size="x-small"/>
        </Button></Tooltip>
          
        </ButtonGroup></div>)}
          icon={<div style={{display: 'table'}}>
                  <div style={{float: 'left',}}>
                    <Button onClick={this.openMenu} variant="icon"><Icon
                      assistiveText={{ label: "Menu" }}
                      category="utility"
                      name={this.state.openMenuBar ? "chevronleft" : "rows"}
                      size="small"
                    /></Button>
                  </div>
                  {this.state.isCalanderView && <div style={{float: 'left'}}>
                    <div style={{float: 'left', paddingLeft: '100px'}}> 
                      <Button onClick={this.onClickToday}> Today </Button>
                    </div>
                    <div style={{float: 'left', paddingLeft: '20px', paddingTop: '4px',}}> 
                      <Button 
                        assistiveText={{ icon: 'Previous' }}
                        onClick={this.previousMonth}
                        iconCategory="utility"
                        iconName="chevronleft"
                        iconVariant="bare"
                        variant="icon"
                      />
                    </div>
                    <div style={{float: 'left', paddingLeft: '20px', paddingTop: '4px',}}>
                      <Button 
                        assistiveText={{ icon: 'Next' }}
                        onClick={this.nextMonth}
                        iconCategory="utility"
                        iconName="chevronright"
                        iconVariant="bare"
                        variant="icon"
                      />
                    </div>
                    <div style={{float: 'left', paddingLeft: '300px',}}> 
                      <div style={{fontSize: '18px'}}>{new Date(this.state.calendarView.date).toLocaleString('default', { month: 'long' }).toString() }  {new Date(this.state.calendarView.date).getFullYear().toString()}</div> 
                    </div>                  
                  </div>}

                </div>
              }
          
        >
        <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } 
                      disableAutoFocus
                      disableCloseOnEsc
                      noOverlay
                      isOpen={ this.state.openMenuBar}
                      width={ '20%' }
                      >
                      <DatePicker 
                        selectsRange
                        inline
                        // selected={this.state.startDate}
                        onChange={this.onChangeDate}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                      />
                      {this.state.openMenuBar && <MultiSelectContainer>
                        <Combobox 
                            multiple
                            isOpen={this.state.isRegionFilterOpen}
                            labels={{
                              label: '',
                              placeholder: 'Regions',
                            }}
                            events={{
                              onChange:(event, {value}) => {
                                this.setState({regionsInputValue:value})
                              },
                              onRequestClose: () => {
                                this.setState({isRegionFilterOpen:false})
                                if(this.state.regionsSelected.length > 1){
                                  this.setState({regionsSelected: this.state.regionsSelected.filter(x => {return x.id !== 'all'})})
                                }
                                if(this.state.regionsSelected.length === 0){
                                    this.setState({regionsSelected: this.state.regions.filter(x => {return x.id === 'all'})})
                                }
                                this.getFilteredPrograms(this.state.regionsSelected)
                                this.getFilteredData()

                              },
                              onRequestOpen: () => {
                                this.setState({isRegionFilterOpen:true})
                              },
                              onRequestRemoveSelectedOption: (event, data) => {
                                this.setState({
                                  regionsInputValue:'',
                                  regionsSelected:data.selection
                                })
                              },
                              onSubmit: (event, { value }) => {
                                this.setState({
                                  regionsInputValue:'',
                                  regionsSelected:[
                                    ...this.state.regionsSelected,
                                    {
                                      label:value,
                                      icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign" />)
                                    }
                                  ]
                                })
                              },
                              onSelect: (event, data) => {
                                this.setState({
                                  regionsInputValue: '',
                                  regionsSelected:data.selection
                                })
                                var all = this.state.regions.find(x => x.id === 'all')
                                if(data.selection.indexOf(all) > 0){
                                    this.setState({regionsInputValue: '', regionsSelected: [all]})
                                }else{
                                    this.setState({regionsInputValue: '', regionsSelected:data.selection})
                                }
                              }
                            }}
                            selection={this.state.regionsSelected}
                            menuItemVisibleLength={5}
                            options={comboboxFilterAndLimit({
                              inputValue:this.state.regionsInputValue,
                              limit: 50,
                              options:this.state.regions,
                              selection:this.state.regionsSelected,
                            })}
                          />
                        </MultiSelectContainer>}
                      {this.state.openMenuBar && <MultiSelectContainer>
                        <Combobox 
                            multiple
                            isOpen={this.state.isProgramFilterOpen}
                            labels={{
                              label: '',
                              placeholder: 'Programs',
                            }}
                            events={{
                              onChange:(event, {value}) => {
                                this.setState({programInputValue:value})
                              },
                              onRequestClose: () => {
                                this.setState({isProgramFilterOpen:false})
                                if(this.state.programSelected.length > 1){
                                  this.setState({programSelected: this.state.programSelected.filter(x => {return x.id !== 'all'})})
                                }
                                if(this.state.programSelected.length === 0){
                                    this.setState({programSelected: this.state.programs.filter(x => {return x.id === 'all'})})
                                }
                                this.getFilteredData()

                              },
                              onRequestOpen: () => {
                                this.setState({isProgramFilterOpen:true})
                              },
                              onRequestRemoveSelectedOption: (event, data) => {
                                this.setState({
                                  programInputValue:'',
                                  programSelected:data.selection
                                })
                              },
                              onSubmit: (event, { value }) => {
                                this.setState({
                                  programInputValue:'',
                                  programSelected:[
                                    ...this.state.programSelected,
                                    {
                                      label:value,
                                      icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign" />)
                                    }
                                  ]
                                })
                              },
                              onSelect: (event, data) => {
                                this.setState({
                                  programInputValue: '',
                                  programSelected:data.selection
                                })
                                var all = this.state.regions.find(x => x.id === 'all')
                                if(data.selection.indexOf(all) > 0){
                                    this.setState({programInputValue: '', programSelected: [all]})
                                }else{
                                    this.setState({programInputValue: '', programSelected:data.selection})
                                }
                              }
                            }}
                            selection={this.state.programSelected}
                            menuItemVisibleLength={5}
                            options={comboboxFilterAndLimit({
                              inputValue:this.state.programInputValue,
                              limit: 50,
                              options:this.getNewPrograms(),
                              selection:this.state.programSelected,
                            })}
                          />
                        </MultiSelectContainer>}
                      {this.state.openMenuBar && <MultiSelectContainer style={{paddingBottom:'25px'}}>
                          <Combobox 
                            multiple
                            isOpen={this.state.isFormatFilterOpen}
                            labels={{
                              label: '',
                              placeholder: 'Regions',
                            }}
                            events={{
                              onChange:(event, {value}) => {
                                this.setState({formatInputValue:value})
                              },
                              onRequestClose: () => {
                                this.setState({isFormatFilterOpen:false})
                                if(this.state.formatsSelected.length > 1){
                                  this.setState({formatsSelected: this.state.formatsSelected.filter(x => {return x.id !== 'all'})})
                                }
                                if(this.state.formatsSelected.length === 0){
                                    this.setState({formatsSelected: this.state.regions.filter(x => {return x.id === 'all'})})
                                }
                                this.getFilteredData()

                              },
                              onRequestOpen: () => {
                                this.setState({isFormatFilterOpen:true})
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
                                  formatInputValue: '',
                                  formatsSelected:data.selection
                                })
                                var all = this.state.regions.find(x => x.id === 'all')
                                if(data.selection.indexOf(all) > 0){
                                    this.setState({formatInputValue: '', formatsSelected: [all]})
                                }else{
                                    this.setState({formatInputValue: '', formatsSelected:data.selection})
                                }
                              }
                            }}
                            selection={this.state.formatsSelected}
                            menuItemVisibleLength={5}
                            options={comboboxFilterAndLimit({
                              inputValue:this.state.formatInputValue,
                              limit: 50,
                              options:this.state.formats,
                              selection:this.state.formatsSelected,
                            })}
                          /></MultiSelectContainer>}
                          <div className="expandableRow">
                            <div className="expandableColumn">
                              <Button label="Reset" variant="text-destructive" onClick={this.clearFilter} /></div>
                            <div className="expandableColumn" style={{paddingBottom:'25px'}}>
                              <Button label="Save As Default" variant="outline-brand" onClick={this.saveAsDefaultFilter} /></div>
                        
                        {/* <div className="expandableColumn" style={{paddingTop: '5px', paddingLeft: '40%'}}>
                          <Button iconCategory="utility"
                            assistiveText={{ icon: 'Next' }}
                            iconName="sync"
                            iconVariant="bare"
                            variant="icon" variant="bare" onClick={this.getFilteredData} /></div> */}
                      </div>

                  </Menu>
                  <main id="page-wrap">
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
            options={[
              {
                id: 3,
                label: "View",
                value: "4",
              },
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
                  activities={this.state.calendarViewData} 
                  onDelete={this.props.onDelete} 
                  onToast={this.onToast}
                  reloadActivities={this.props.reloadActivities}
                  historicDate={this.state.historicDate}
                  isHistoric={this.state.isHistoric}
                  isMenuOpen={this.state.openMenuBar}
                  calendarView={this.state.calendarView}/>)}
        {!this.state.isCalanderView && (<Pager
          data={this.state.data}
          itemsPerPage={this.state.data.length >= this.state.pageLimit ? this.state.pageLimit : this.state.data.length - 1}
          setDisplayedItems={this.handlePagination}
          currentPage={this.state.currentPage}
        />)}</main>
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
