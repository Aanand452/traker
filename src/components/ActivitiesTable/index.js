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
  Dropdown,
  Icon,
  PageHeader,
  PageHeaderControl,
  ToastContainer,
  Toast,
} from "@salesforce/design-system-react";

import { getCookie } from '../../utils/cookie';
import { getAPIUrl } from "../../config/config";
import Modal from "../EditActivityModal";
import CloneModal from "../CloneActivityModal";
import Pager from "../Pager";

// ACTIONS
import { selectItem, setItem } from "../../actions/DataTable";
import { Container } from "./styles";

import FilterPanel from "../FilterPanel";

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
    tableExtraWidth: 0
  };

  table = React.createRef()

  componentDidMount() {
    this.setupAndFetch();
    this.resizableTable(this.table.current.scrollerRef.children[0]);
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   if(this.state.columnWidth === nextState.columnWidth) {
  //     return false;
  //   } else {
  //     return true
  //   }
  // }
  
  resizableTable(table) {
    let row = table.getElementsByTagName('tr')[0];
    let cols = row.children;

    table.style.overflow = 'hidden';
    
    this.setState({
      columnWidth: {
        Owner: (table.offsetWidth - 52) / 10,
        Program: (table.offsetWidth - 52) / 10,
        "Campaign ID": (table.offsetWidth - 52) / 10,
        Title: (table.offsetWidth - 52) / 10,
        Format: (table.offsetWidth - 52) / 10,
        Abstract: (table.offsetWidth - 52) / 10,
        Region: (table.offsetWidth - 52) / 10,
        "Start date": (table.offsetWidth - 52) / 10,
        "End date": (table.offsetWidth - 52) / 10,
        Assets: (table.offsetWidth - 52) / 10,
      },
      tableWidth: table.offsetWidth
    });
    
    for(let i = 0; i < cols.length - 1; i++) {
      let div = this.createDiv();
      let parent = cols[i].children[1].children[0];

      if(parent.children.length <= 1) {
        cols[i].children[1].children[0].appendChild(div);
      }
      this.setListener(div);
    }
  }

  setListener = div => {
    let pageX, curCol, curColWidth, colName;
    
    div.addEventListener('mousedown', e => {
      colName = e.target.previousSibling.title;
      curCol = e.target.parentElement;
      pageX = e.pageX;
      curColWidth = curCol.offsetWidth;
      this.setState({
        columnWidth: {
          ...this.state.columnWidth,
          [colName]: curColWidth
        }
      })
    });

    div.addEventListener('mousemove', e => {
      colName = e.target.previousSibling && e.target.previousSibling.title;
      if(curCol && colName) {
        let diffX = e.pageX - pageX;
        this.setState(prev => ({
          columnWidth: {
            ...prev.columnWidth,
            [colName]: curColWidth + (diffX) <= 80 ? 80 : curColWidth + (diffX)
          },
          tableExtraWidth: prev.tableExtraWidth += diffX
        }))
      }
    });

    div.addEventListener('dblclick', e => {
      this.setState({
        columnWidth: {
          Owner: (this.state.tableWidth- 52) / 10,
          Program: (this.state.tableWidth- 52) / 10,
          "Campaign ID": (this.state.tableWidth- 52) / 10,
          Title: (this.state.tableWidth- 52) / 10,
          Format: (this.state.tableWidth- 52) / 10,
          Abstract: (this.state.tableWidth- 52) / 10,
          Region: (this.state.tableWidth- 52) / 10,
          "Start date": (this.state.tableWidth- 52) / 10,
          "End date": (this.state.tableWidth- 52) / 10,
          Assets: (this.state.tableWidth- 52) / 10,
        },
        tableExtraWidth: 0
      })
    });

    document.addEventListener('mouseup', function(e) {
      curCol = undefined;
      pageX = undefined;
      curColWidth = undefined;
    });
  }

  createDiv() {
    let div = document.createElement('div');
    div.setAttribute("title", "Double click to reset columns' size")
    div.classList.add("border")
    div.style.top = 0;
    div.style.right = 0;
    div.style.width = '35px';
    div.style.position = 'absolute';
    div.style.cursor = 'col-resize';
    // div.style.backgroundColor = 'red';
    div.style.userSelect = 'none';
    div.style.height = '100vh';
    div.style.zIndex = 1;
    return div;
  }

  setupAndFetch = async () => {
    if (window.location.hostname === "localhost")
      this.API_URL = "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();

    this.checkProgram();
    this.checkRegion();
    this.checkFormat();
  };

  async checkProgram() {
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
      let response = await fetch(`${this.API_URL}/program`, config);
      if (response.status === 200) {
        let { result } = await response.json();
        this.setState({
          programs: [{ label: "All" }, ...result],
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
        this.setState({
          regions: [{ label: "All" }, ...result],
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
        this.setState({
          formats: [{ label: "All" }, ...result],
        });
      } else {
        throw new Error(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  actions = () => (
    <PageHeaderControl>
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
            this.state.tableExtraWidth > 0 &&
            (<Button
              assistiveText={{ icon: "Contract" }}
              iconCategory="utility"
              iconName={"contract_alt"}
              iconVariant="border-filled"
              variant="icon"
              title={"Reset columns' size"}
              onClick={() => this.setState({ columnWidth: {
                Owner: (this.state.tableWidth- 52) / 10,
                Program: (this.state.tableWidth- 52) / 10,
                "Campaign ID": (this.state.tableWidth- 52) / 10,
                Title: (this.state.tableWidth- 52) / 10,
                Format: (this.state.tableWidth- 52) / 10,
                Abstract: (this.state.tableWidth- 52) / 10,
                Region: (this.state.tableWidth- 52) / 10,
                "Start date": (this.state.tableWidth- 52) / 10,
                "End date": (this.state.tableWidth- 52) / 10,
                Assets: (this.state.tableWidth- 52) / 10,
              }, tableExtraWidth: 0})}
            />)
          }
          <Button
            assistiveText={{ icon: "Expand" }}
            iconCategory="utility"
            iconName={this.state.expandTable ? "expand" : "contract"}
            iconVariant="border-filled"
            variant="icon"
            title={this.state.expandTable ? "Expand table" : "Contract table"}
            onClick={() => this.setState({ expandTable: !this.state.expandTable})}
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
      sortDirection: "",
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

  render() {
    return (
      <Container>
        {this.state.cloneModalIsOPen && (
          <CloneModal
            data={this.props.dataTable.item}
            onToast={this.onToast}
            toggleOpen={this.toggleOpen}
            reloadActivities={this.props.reloadActivities}
          />
        )}
        {this.state.editModalIsOPen && (
          <Modal
            data={this.props.dataTable.item}
            onToast={this.onToast}
            toggleOpen={this.toggleOpen}
            reloadActivities={this.props.reloadActivities}
          />
        )}
        <PageHeader
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
        />
        {this.state.isPanelOpen && (
          <FilterPanel
            regions={this.state.regions}
            programs={this.state.programs}
            formats={this.state.formats}
            onFilter={this.onFilter}
            filters={this.state.filters}
            handleChange={this.handleChange}
            errors={this.state.errors}
          />
        )}
        <DataTable
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
        >
          <DataTableColumn width={this.state.columnWidth['Owner'] || 'auto'} label="Owner" property="userId" />
          <DataTableColumn width={this.state.columnWidth['Program'] || 'auto'} label="Program" property="programId" />
          <DataTableColumn width={this.state.columnWidth['Campaign ID'] || 'auto'} label="Campaign ID" property="campaignId" />
          <DataTableColumn width={this.state.columnWidth['Title'] || 'auto'} label="Title" property="title" />
          <DataTableColumn width={this.state.columnWidth['Format'] || 'auto'} label="Format" property="formatId" />
          <DataTableColumn width={this.state.columnWidth['Abstract'] || 'auto'} label="Abstract" property="abstract" />
          <DataTableColumn
            width={this.state.columnWidth['Region'] || 'auto'}
            sortDirection={this.state.sortDirection || "desc"}
            sortable
            isSorted={this.state.sortProperty === "regionId"}
            label="Region"
            property="regionId"
          />
          <DataTableColumn
            width={this.state.columnWidth['Start date'] || 'auto'}
            isSorted={this.state.sortProperty === "startDate"}
            label="Start date"
            property="startDate"
            sortable
            sortDirection={this.state.sortDirection || "desc"}
          >
            <DateCell />
          </DataTableColumn>
          <DataTableColumn
            width={this.state.columnWidth['End date'] || 'auto'}
            isSorted={this.state.sortProperty === "endDate"}
            label="End date"
            property="endDate"
            sortable
            sortDirection={this.state.sortDirection || "desc"}
          >
            <DateCell />
          </DataTableColumn>
          <DataTableColumn width={this.state.columnWidth['Assets'] || 'auto'} label="Assets" property="asset">
            <CustomDataTableCell fixedLayout />
          </DataTableColumn>

          <DataTableRowActions
            options={[
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
        </DataTable>
        <Pager
          data={this.state.data}
          itemsPerPage={20}
          setDisplayedItems={this.handlePagination}
          currentPage={this.state.currentPage}
        />
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
