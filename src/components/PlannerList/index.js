import React, { Component, Fragment, useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  DataTable,
  DataTableColumn,
  DataTableCell,
  DataTableRowActions,
  Dropdown,
  Icon,
  IconSettings,
  PageHeader,
  PageHeaderControl,
  Modal,
  Input,
  Combobox,
} from "@salesforce/design-system-react";

import Panel from "../Panel";
import { Container, FiscalYearErrorContainer } from "./styles";
import Pager from "../Pager";
import EditProgramModal from "../ProgramModal";
import PlanningView from "../PlanningView";

import "./styles.css";
import { getAPIUrl } from "../../config/config";
import { getCookie } from "../../utils/cookie";

const CurrencyCell = ({ children, ...props }) => {
  if (parseInt(children, 10) === 0) {
    return (
      <DataTableCell {...props}>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumSignificantDigits: 1,
        }).format(children)}
      </DataTableCell>
    );
  } else {
    return (
      <DataTableCell
        title={typeof children === "number" ? children.toString() : children}
        {...props}
      >
        {parseInt(children, 10)
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(children)
          : ""}
      </DataTableCell>
    );
  }
};

const ActionCell = ({ children, ...props }) => {
  const [API_URL, setURL] = useState("");

  const getURL = async () => {
    if (window.location.hostname === "localhost") {
      setURL("http://localhost:3000/api/v1");
    } else {
      let url = await getAPIUrl();
      setURL(url);
    }
  };

  const handleDelete = async () => {
    const token = getCookie("token").replaceAll('"', "");
    const config = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: children,
      }),
    };

    await fetch(`${API_URL}/program-planner/${children}`, config)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getURL();
  }, []);

  return (
    <DataTableCell
      // title={children.toString()}
      {...props}
      onAction={this.handleRowAction}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to={`/planner-slider?planner=${children}`} title="open">
          View
        </Link>
        <Link to={`/create-planner?planner=${children}`} title="edit">
          Edit
        </Link>
        <div
          onClick={handleDelete}
          style={{ cursor: "pointer" }}
          title="delete"
        >
          <img
            src="https://img.icons8.com/flat-round/64/000000/delete-sign.png"
            width={15}
            alt="delete"
          />
        </div>
      </div>
    </DataTableCell>
  );
};

const DropDownCell = ({ children, ...props }) => {
  let items = props.property;
  let options = props.item[items].map((el) => el);

  if (options.length <= 0) {
    return <DataTableCell title="" {...props}></DataTableCell>;
  }

  return (
    <DataTableRowActions
      options={options}
      menuPosition="overflowBoundaryElement"
      dropdown={<Dropdown />}
    />
  );
};

CurrencyCell.displayName = DataTableCell.displayName;
ActionCell.displayName = DataTableCell.displayName;
DropDownCell.displayName = DataTableCell.displayName;

class Table extends Component {
  state = {
    sortProperty: "",
    sortDirection: null,
    isPanelOpen: false,
    data: [],
    displayedData: [],
    editModalIsOPen: false,
    selectedprogram: {},
    currentPage: 1,
    search: {
      owner: "",
      name: "",
    },
    expandTable: true,
    columnWidth: {},
    tableExtraWidth: 0,
    noRowHover: false,
    isHistoric: false,
    historicModalOpen: false,
    viewProgramModalOpen: false,
    historicSearch: {
      startYear: "",
      endYear: "",
    },
    error: {},
    quarter: [
      { id: "1", label: "Q1" },
      { id: "2", label: "Q2" },
      { id: "3", label: "Q3" },
      { id: "4", label: "Q4" },
    ],
    viewItem: {},
  };

  table = React.createRef();

  componentDidMount() {
    this.resizableTable(this.table.current.scrollerRef.children[0]);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({ data: this.props.data }, () => {
        if (this.state.sortProperty && this.state.sortDirection) {
          this.onSort({
            property: this.state.sortProperty,
            sortDirection: this.state.sortDirection,
          });
        }
      });
      this.onSearch(this.state.search);
    }
  }

  resetResizableTable = () => {
    this.setState(
      (prev) => ({ expandTable: !prev.expandTable }),
      () => {
        if (this.state.expandTable) {
          this.resizableTable(this.table.current.scrollerRef.children[0]);
        }
      }
    );
  };

  removeLocalStorageColumns = () => {
    let columns = [
      "Program Owner",
      "Program Name",
      "Budget",
      "MP Target",
      "Target Region",
      "Lifecycle Stage",
      "APM1",
      "APM2",
      "Industry",
      "Segment",
      "Persona",
      "Customer Message",
      "Other KPI's",
    ];
    for (let i = 0; i < columns.length; i++) {
      localStorage.removeItem(columns[i]);
    }
    this.setState({
      columnWidth: {
        "Program Owner": (document.body.clientWidth - 52) / 13,
        "Program Name": (document.body.clientWidth - 52) / 13,
        Budget: (document.body.clientWidth - 52) / 13,
        "MP Target": (document.body.clientWidth - 52) / 13,
        "Target Region": (document.body.clientWidth - 52) / 13,
        "Lifecycle Stage": (document.body.clientWidth - 52) / 13,
        APM1: (document.body.clientWidth - 52) / 13,
        APM2: (document.body.clientWidth - 52) / 13,
        Industry: (document.body.clientWidth - 52) / 13,
        Segment: (document.body.clientWidth - 52) / 13,
        Persona: (document.body.clientWidth - 52) / 13,
        "Customer Message": (document.body.clientWidth - 52) / 13,
        "Other KPI's": (document.body.clientWidth - 52) / 13,
      },
      tableExtraWidth: 0,
    });
  };

  resizableTable(table) {
    let row = table.getElementsByTagName("tr")[0];
    let cols = row.children;

    table.style.overflow = "hidden";

    this.setState({
      columnWidth: {
        "Program Owner": localStorage.getItem("Program Owner")
          ? Number(localStorage.getItem("Program Owner"))
          : (document.body.clientWidth - 52) / 13,
        "Program Name": localStorage.getItem("Program Name")
          ? Number(localStorage.getItem("Program Name"))
          : (document.body.clientWidth - 52) / 13,
        Budget: localStorage.getItem("Budget")
          ? Number(localStorage.getItem("Budget"))
          : (document.body.clientWidth - 52) / 13,
        "MP Target": localStorage.getItem("MP Target")
          ? Number(localStorage.getItem("MP Target"))
          : (document.body.clientWidth - 52) / 13,
        "Target Region": localStorage.getItem("Target Region")
          ? Number(localStorage.getItem("Target Region"))
          : (document.body.clientWidth - 52) / 13,
        "Lifecycle Stage": localStorage.getItem("Lifecycle Stage")
          ? Number(localStorage.getItem("Lifecycle Stage"))
          : (document.body.clientWidth - 52) / 13,
        APM1: localStorage.getItem("APM1")
          ? Number(localStorage.getItem("APM1"))
          : (document.body.clientWidth - 52) / 13,
        APM2: localStorage.getItem("APM2")
          ? Number(localStorage.getItem("APM2"))
          : (document.body.clientWidth - 52) / 13,
        Industry: localStorage.getItem("Industry")
          ? Number(localStorage.getItem("Industry"))
          : (document.body.clientWidth - 52) / 13,
        Segment: localStorage.getItem("Segment")
          ? Number(localStorage.getItem("Segment"))
          : (document.body.clientWidth - 52) / 13,
        Persona: localStorage.getItem("Persona")
          ? Number(localStorage.getItem("Persona"))
          : (document.body.clientWidth - 52) / 13,
        "Customer Message": localStorage.getItem("Customer Message")
          ? Number(localStorage.getItem("Customer Message"))
          : (document.body.clientWidth - 52) / 13,
        "Other KPI's": localStorage.getItem("Other KPI's")
          ? Number(localStorage.getItem("Other KPI's"))
          : (document.body.clientWidth - 52) / 13,
      },
    });

    for (let i = 0; i < cols.length - 1; i++) {
      let div = this.createDiv(1, "35px");
      cols[i].children[1].children[0].appendChild(div);
      this.setListener(div);
    }
  }

  setListener = (div) => {
    let pageX, curCol, curColWidth, colName;

    div.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    div.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.target.parentElement.children.length <= 2) {
        colName = e.target.previousSibling && e.target.previousSibling.title;
      } else {
        colName =
          e.target.parentElement.children[1] &&
          e.target.parentElement.children[1].title;
      }

      curCol = e.target.parentElement;
      pageX = e.pageX;
      curColWidth = curCol.offsetWidth;
      this.setState({
        columnWidth: {
          ...this.state.columnWidth,
          [colName]: curColWidth,
        },
      });
    });

    document.addEventListener("mousemove", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (curCol && colName) {
        let diffX = e.pageX - pageX;
        div.style.borderRight = `1px dashed #1589ee`;
        div.style.right = `${-diffX}px`;
        div.style.zIndex = 3;
        this.setState({ noRowHover: true });
      }
    });

    div.addEventListener("dblclick", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.removeLocalStorageColumns();
    });

    document.addEventListener("mouseup", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!e.target.parentElement) {
        return;
      }

      if (e.target.parentElement.children.length <= 2) {
        colName = e.target.previousSibling && e.target.previousSibling.title;
      } else {
        colName =
          e.target.parentElement.children[1] &&
          e.target.parentElement.children[1].title;
      }

      if (curCol && colName) {
        let diffX = e.pageX - pageX;

        localStorage.setItem(
          colName,
          curColWidth + diffX <= 80 ? "80" : Number(curColWidth + diffX)
        );

        this.setState((prev) => ({
          columnWidth: {
            ...prev.columnWidth,
            [colName]: curColWidth + diffX <= 80 ? 80 : curColWidth + diffX,
          },
          tableExtraWidth: (prev.tableExtraWidth += diffX),
          noRowHover: false,
        }));
      }

      div.style.borderRight = "none";
      div.style.right = 0;
      div.style.zIndex = 1;

      curCol = undefined;
      pageX = undefined;
      curColWidth = undefined;
    });
  };

  createDiv(zIndex = 1, width = "15px") {
    let div = document.createElement("div");
    div.setAttribute("title", "Double click to reset columns' size");
    div.classList.add("border");
    div.style.top = 0;
    div.style.right = 0;
    div.style.width = width;
    div.style.position = "absolute";
    div.style.cursor = "col-resize";
    div.style.userSelect = "none";
    div.style.height = "100%";
    div.style.zIndex = zIndex;
    return div;
  }

  actions = () => (
    <PageHeaderControl>
      <ButtonGroup id="button-group-page-header-actions-history">
        {/* <Button
          iconCategory="utility"
          label="Historic"
          variant={this.state.isHistoric ? "brand" : "neutral"}
          onClick={() => {
            if (this.state.isHistoric) {
              this.handleResetHistoric();
            } else {
              this.setState({
                isHistoric: true,
                historicModalOpen: true,
              });
            }
          }}
        />
        <Button
          assistiveText={{ icon: "Search" }}
          iconCategory="utility"
          iconName="search"
          iconVariant="border-filled"
          variant="icon"
          title="Search programs in historic"
          onClick={() => {
            this.setState({ historicModalOpen: !this.state.historicModalOpen });
          }}
          disabled={!this.state.isHistoric}
        /> */}
      </ButtonGroup>
      <ButtonGroup id="button-group-page-header-actions">
        <Link to="/create-planner">
          <Button label="New" />
        </Link>
      </ButtonGroup>
      <div>
        <div>
          {" "}
          Aggregates Budget Total:{" "}
          <span style={{ fontWeight: "bold", paddingLeft: "4px" }}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumSignificantDigits: 1,
            }).format(this.props.aggregates.budget)}
          </span>
        </div>{" "}
        <div>
          {" "}
          Aggregates MP Target Total:
          <span style={{ fontWeight: "bold", paddingLeft: "4px" }}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumSignificantDigits: 1,
            }).format(this.props.aggregates.mp_target)}
          </span>
        </div>{" "}
      </div>
    </PageHeaderControl>
  );

  controls = () => (
    <Fragment>
      <PageHeaderControl>
        <ButtonGroup id="button-group-page-header-controls">
          {this.state.expandTable && (
            <Button
              assistiveText={{ icon: "Contract" }}
              iconCategory="utility"
              iconName={"contract_alt"}
              iconVariant="border-filled"
              variant="icon"
              title={"Reset columns' size"}
              onClick={this.removeLocalStorageColumns}
            />
          )}
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
            onClick={this.resetTable}
          />
          <Button
            assistiveText={{ icon: "Filters" }}
            iconCategory="utility"
            iconName="filterList"
            iconVariant="border-filled"
            variant="icon"
            onClick={() => {
              this.setState({ isPanelOpen: !this.state.isPanelOpen });
            }}
          />
        </ButtonGroup>
      </PageHeaderControl>
    </Fragment>
  );

  onSearch = (search) => {
    if (search.owner === "" && search.name === "") {
      this.setState({ data: this.props.data, search });
      return false;
    }

    let data = [...this.props.data];

    if (search.owner) {
      data = data.filter((item) => {
        return item.owner
          ? item.owner.toLowerCase().includes(search.owner.toLowerCase())
          : false;
      });
    }
    if (search.name) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.name.toLowerCase())
      );
    }

    this.setState({ currentPage: 1, data, search });
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
      currentPage: 1,
      search: {
        owner: "",
        name: "",
      },
    });
  };

  handlePagination = (newData, currentPage) => {
    this.setState({ displayedData: newData, currentPage });
  };

  toggleOpen = (bool) => {
    this.setState({ editModalIsOPen: bool });
  };

  toggleHistoricModal = () => {
    this.setState({ historicModalOpen: !this.state.historicModalOpen });
  };

  handleRowAction = (item, { id }) => {
    switch (id) {
      case 0:
        // this.setState({
        //   selectedprogram: {
        //     ...item,
        //     metrics: item.metrics && item.metrics.toString(),
        //   },
        // });
        // this.toggleOpen(true);
        this.props.history.push("create-planner");
        break;
      case 1:
        this.props.onDelete(item);
        break;
      case 2:
        this.setState({ viewItem: item });
        // this.toggleViewProgramModal();
        // <Link to="/planner-slider" />
        this.props.history.push("/planner-slider");
        break;
      default:
        break;
    }
  };

  validations = (input, data) => {
    const { error, historicSearch } = this.state;
    let errors = { ...error };
    const inputs = ["startYear", "startQuarter", "endYear", "endQuarter"];

    if (input) {
      if (inputs.includes(input) && !data) {
        errors = { ...errors, [input]: "This field is required" };
      } else if (
        input === "startYear" &&
        data.length > 0 &&
        data.length !== 4
      ) {
        errors = {
          ...errors,
          startYear: "This field must contain 4 character",
        };
      } else if (input === "endYear" && data.length > 0 && data.length !== 4) {
        errors = { ...errors, endYear: "This field must contain 4 character" };
      } else {
        if (errors.endYear && errors.endQuarter) {
          delete errors.endYear;
          delete errors.endQuarter;
        }
        delete errors[input];
      }
    } else {
      inputs.forEach((inpt) => {
        if (
          inpt === "startYear" &&
          historicSearch.startYear &&
          historicSearch.startYear.length !== 4
        ) {
          errors = {
            ...errors,
            startYear: "This field must contain 4 character",
          };
        } else if (
          inpt === "endYear" &&
          historicSearch.endYear &&
          historicSearch.endYear.length !== 4
        ) {
          errors = {
            ...errors,
            endYear: "This field must contain 4 character",
          };
        } else if (!historicSearch[inpt]) {
          errors = { ...errors, [inpt]: "This field is required" };
        } else {
          delete errors[inpt];
        }
      });
      if (!Object.keys(errors).length) {
        const startFY = Number(
          `${historicSearch.startYear}${historicSearch.startQuarter[0].id}`
        );
        const endFY = Number(
          `${historicSearch.endYear}${historicSearch.endQuarter[0].id}`
        );

        if (startFY > endFY) {
          errors = {
            ...errors,
            endYear: true,
            endQuarter: true,
          };
        }
      }
    }

    this.setState({ error: errors });
    if (Object.keys(errors).length > 0) return false;

    return true;
  };

  handleChange = (key, value) => {
    if ((key === "endYear" || key === "startYear") && isNaN(value)) {
      return;
    }

    this.setState({
      historicSearch: {
        ...this.state.historicSearch,
        [key]: value,
      },
    });
    this.validations(key, value);
  };

  handleSearch = () => {
    const {
      historicSearch: { startYear, endYear, startQuarter, endQuarter },
    } = this.state;
    if (this.validations()) {
      this.toggleHistoricModal();
      const startDate = `FY${startYear}${startQuarter[0].label}`;
      const endDate = `FY${endYear}${endQuarter[0].label}`;
      this.props.onGetHistoric(startDate, endDate);
    }
  };

  handleResetHistoric = () => {
    this.setState({
      historicSearch: {
        startYear: "",
        endYear: "",
      },
      isHistoric: false,
    });
    this.props.onGetHistoric();
  };

  toggleViewProgramModal = () => {
    this.setState({ viewProgramModalOpen: !this.state.viewProgramModalOpen });
  };

  render() {
    return (
      <Container>
        <IconSettings iconPath="/assets/icons">
          {this.state.editModalIsOPen && (
            <EditProgramModal
              onSearch={this.onSearch}
              search={this.state.search}
              onEdit={this.props.onEdit}
              program={this.state.selectedprogram}
              toggleOpen={this.toggleOpen}
              title="Edit program"
              ariaHideApp={false}
            />
          )}
          <PageHeader
            onRenderActions={this.actions}
            icon={
              <Icon
                assistiveText={{ label: "Program Plans" }}
                category="standard"
                name="lead"
              />
            }
            info={`${this.state.displayedData.length} of ${
              this.state.data.length
            } ${this.state.data.length === 1 ? "item" : "items"}`}
            joined
            // onRenderControls={this.controls}
            title={<h1 style={{ padding: "4px" }}>Program Plans</h1>}
            truncate
            variant="object-home"
          />

          {this.state.isPanelOpen && (
            <Panel onSearch={this.onSearch} search={this.state.search} />
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
            fixedHeader
            fixedLayout={this.state.expandTable}
            items={this.state.displayedData}
            id="programsTable"
            joined
            onSort={this.onSort}
            ref={this.table}
            noRowHover={this.state.noRowHover}
            columnBordered
            className={`${
              this.state.displayedData && this.state.displayedData.length < 5
                ? "padding_bottom"
                : ""
            }`}
          >
            <DataTableColumn
              label="Program Name"
              property="programName"
              sortDirection={this.state.sortDirection || "desc"}
              sortable
              isSorted={this.state.sortProperty === "name"}
              width={`${this.state.columnWidth["Program Name"]}px`}
            />
            <DataTableColumn
              label="Program Owner"
              property="programOwner"
              sortDirection={this.state.sortDirection || "desc"}
              sortable
              isSorted={this.state.sortProperty === "name"}
              width={`${this.state.columnWidth["Program Owner"]}px`}
            />

            <DataTableColumn
              label="Abstract"
              property="abstract"
              width={`${this.state.columnWidth["Customer Message"]}px`}
            />

            <DataTableColumn
              label="Cumulative Budget"
              property="cumulative_budget"
              sortDirection={this.state.sortDirection || "desc"}
              sortable
              isSorted={this.state.sortProperty === "name"}
              width={`${this.state.columnWidth["Program Owner"]}px`}
            >
              <CurrencyCell />
            </DataTableColumn>

            <DataTableColumn
              label="Cumulative MP Target"
              property="cumulative_mp_target"
              sortDirection={this.state.sortDirection || "desc"}
              sortable
              isSorted={this.state.sortProperty === "name"}
              width={`${this.state.columnWidth["Program Owner"]}px`}
            >
              <CurrencyCell />
            </DataTableColumn>

            {/* <DataTableColumn
              label="Budget"
              property="budgets"
              sortDirection={this.state.sortDirection || "desc"}
              sortable
              isSorted={this.state.sortProperty === "budget"}
              width={`${this.state.columnWidth["Budget"]}px`}
            >
              <CurrencyCell />
            </DataTableColumn> */}
            {/* <DataTableColumn
              label="MP Target"
              property="metrics"
              width={`${this.state.columnWidth["MP Target"]}px`}
            >
              <CurrencyCell />
            </DataTableColumn> */}
            <DataTableColumn
              label="Actions"
              property="ProgramPlannerId"
              width={`${this.state.columnWidth["MP Target"]}px`}
            >
              <ActionCell />
            </DataTableColumn>
          </DataTable>
          <Pager
            data={this.state.data}
            itemsPerPage={20}
            setDisplayedItems={this.handlePagination}
            currentPage={this.state.currentPage}
          />
        </IconSettings>
        <Modal
          isOpen={this.state.historicModalOpen}
          footer={[
            <Button label="Cancel" onClick={this.toggleHistoricModal} />,
            <Button
              label="Search"
              variant="brand"
              onClick={this.handleSearch}
              disabled={
                !this.state.historicSearch.startYear ||
                !this.state.historicSearch.endYear ||
                !this.state.historicSearch.startQuarter ||
                !this.state.historicSearch.endQuarter
              }
            />,
          ]}
          onRequestClose={this.toggleHistoricModal}
          heading="Search programs"
        >
          <div className="slds-p-around_large">
            <div className="slds-grid slds-gutters">
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-form-element">
                <Input
                  required
                  placeholder="Enter fiscal year"
                  label="Start fiscal year"
                  onChange={(event, data) =>
                    this.handleChange("startYear", data.value)
                  }
                  errorText={this.state.error.startYear}
                  value={this.state.historicSearch.startYear}
                  maxLength="4"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-form-element">
                <Combobox
                  required
                  events={{
                    onSelect: (event, data) =>
                      data.selection.length &&
                      this.handleChange("startQuarter", data.selection),
                  }}
                  labels={{ label: "Start quarter" }}
                  options={this.state.quarter}
                  selection={this.state.historicSearch.startQuarter}
                  value="quarter"
                  variant="readonly"
                  errorText={this.state.error.startQuarter}
                />
              </div>
            </div>
            <div className="slds-grid slds-gutters">
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-form-element">
                <Input
                  required
                  placeholder="Enter fiscal year"
                  label="End fiscal year"
                  onChange={(event, data) =>
                    this.handleChange("endYear", data.value)
                  }
                  errorText={this.state.error.endYear}
                  value={this.state.historicSearch.endYear}
                  maxLength="4"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-form-element">
                <Combobox
                  required
                  events={{
                    onSelect: (event, data) =>
                      data.selection.length &&
                      this.handleChange("endQuarter", data.selection),
                  }}
                  labels={{ label: "End quarter" }}
                  options={this.state.quarter}
                  selection={this.state.historicSearch.endQuarter}
                  value="quarter"
                  variant="readonly"
                  errorText={this.state.error.endQuarter}
                />
              </div>
            </div>
            {this.state.error &&
              this.state.error.endQuarter &&
              this.state.error.endYear && (
                <FiscalYearErrorContainer className="slds-m-bottom_large">
                  End fiscal year-quarter set must be greater than start fiscal
                  year set
                </FiscalYearErrorContainer>
              )}
          </div>
        </Modal>
        <Modal
          isOpen={this.state.viewProgramModalOpen}
          contentClassName="program-modal-overflow"
          footer={[
            <Button
              label="Close"
              variant="brand"
              onClick={this.toggleViewProgramModal}
            />,
          ]}
          onRequestClose={this.toggleViewProgramModal}
          heading="View program"
          size="large"
        >
          <PlanningView />
        </Modal>
      </Container>
    );
  }
}

export default withRouter(Table);
