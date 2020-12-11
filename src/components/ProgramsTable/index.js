import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
} from '@salesforce/design-system-react';

import Panel from '../Panel';
import { Container } from './styles';
import Pager from '../Pager';
import Modal from '../ProgramModal';
import "./styles.css";

const CurrencyCell = ({ children, ...props }) => {
  if(parseInt(children, 10) === 0) {
    return (
      <DataTableCell
        title={children.toString()}
        {...props}
      >
        {
          new Intl.NumberFormat(
            'en-US',
            {
              style: 'currency',
              currency: 'USD',
              maximumSignificantDigits: 1
            }
          ).format(children)
        }
      </DataTableCell>
    );
  } else {
    return (
      <DataTableCell
        title={typeof children === 'number' ? children.toString() : children}
        {...props}
      >
        {
          parseInt(children, 10)
            ? new Intl.NumberFormat(
              'en-US',
              {
                style: 'currency',
                currency: 'USD'
              },
            ).format(children)
            : ''
        }
      </DataTableCell>
    );
  }
}

const DropDownCell = ({ children, ...props }) => {
  let items = props.property;
  let options = props.item[items].map(el => el);

  if(options.length <= 0) {
    return <DataTableCell title="" {...props}></DataTableCell>
  }

  return (
    <DataTableRowActions
      options={options}
      menuPosition="overflowBoundaryElement"
      dropdown={<Dropdown />}
    />
  );
}

CurrencyCell.displayName = DataTableCell.displayName;
DropDownCell.displayName = DataTableCell.displayName;

class Table extends Component {
  state = {
    sortProperty: '',
    sortDirection: null,
    isPanelOpen: false,
    data: [],
    displayedData: [],
    editModalIsOPen: false,
    selectedprogram: {},
    currentPage: 1,
    search: {
      owner: '',
      name: ''
    },
    expandTable: true,
    columnWidth: {},
    tableExtraWidth: 0,
    noRowHover: false
  };

  table = React.createRef();

  componentDidMount() {
    this.resizableTable(this.table.current.scrollerRef.children[0]);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({data: this.props.data}, () => {
        if(this.state.sortProperty && this.state.sortDirection) {
          this.onSort({
            property: this.state.sortProperty,
            sortDirection: this.state.sortDirection
          });
        }
      });
      this.onSearch(this.state.search);
    }
  }

  resetResizableTable = () => {
    this.setState(prev => ({ expandTable: !prev.expandTable }), () => {
      if(this.state.expandTable) {
        this.resizableTable(this.table.current.scrollerRef.children[0])
      }
    })
  }

  resizableTable(table) {
    let row = table.getElementsByTagName('tr')[0];
    let cols = row.children;

    table.style.overflow = 'hidden';

    this.setState({
      columnWidth: {
        'Program Owner': (table.offsetWidth - 52) / 10,
        'Program Name': (table.offsetWidth - 52) / 10,
        'Budget': (table.offsetWidth - 52) / 10,
        'MP Target': (table.offsetWidth - 52) / 10,
        'Target Region': (table.offsetWidth - 52) / 10,
        'Lifecycle Stage': (table.offsetWidth - 52) / 10,
        'APM1': (table.offsetWidth - 52) / 10,
        'APM2': (table.offsetWidth - 52) / 10,
        'Industry': (table.offsetWidth - 52) / 10,
        'Segment': (table.offsetWidth - 52) / 10,
        'Persona': (table.offsetWidth - 52) / 10,
        'Customer Message': (table.offsetWidth - 52) / 10,
        'Other KPI\'s': (table.offsetWidth - 52) / 10,
      },
      tableWidth: table.offsetWidth
    });

    for(let i = 0; i < cols.length - 1; i++) {
      let div = this.createDiv(1, '35px');
      cols[i].children[1].children[0].appendChild(div);
      this.setListener(div);
    }
  }

  setListener = (div) => {
    let pageX, curCol, curColWidth, colName;


    div.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    div.addEventListener('mousedown', (e) => {
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

    document.addEventListener('mousemove', (e) => {
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

    div.addEventListener('dblclick', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        columnWidth: {
          'Program Owner': (this.state.tableWidth - 52) / 10,
          'Program Name': (this.state.tableWidth - 52) / 10,
          'Budget': (this.state.tableWidth - 52) / 10,
          'MP Target': (this.state.tableWidth - 52) / 10,
          'Target Region': (this.state.tableWidth - 52) / 10,
          'Lifecycle Stage': (this.state.tableWidth - 52) / 10,
          'APM1': (this.state.tableWidth - 52) / 10,
          'APM2': (this.state.tableWidth - 52) / 10,
          'Industry': (this.state.tableWidth - 52) / 10,
          'Segment': (this.state.tableWidth - 52) / 10,
          'Persona': (this.state.tableWidth - 52) / 10,
          'Customer Message': (this.state.tableWidth - 52) / 10,
          'Other KPI\'s': (this.state.tableWidth - 52) / 10,
        },
        tableExtraWidth: 0
      });
    });

    document.addEventListener('mouseup', (e) => {
      e.preventDefault();
      e.stopPropagation();

      if(e.target.parentElement.children.length <= 2) {
        colName = e.target.previousSibling && e.target.previousSibling.title;
      } else {
        colName = e.target.parentElement.children[1] && e.target.parentElement.children[1].title;
      }

      if(curCol && colName) {
        let diffX = e.pageX - pageX;

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

  actions = () => (
    <PageHeaderControl>
      <ButtonGroup id="button-group-page-header-actions">
        <Link to="/create-program">
          <Button label="New" />
        </Link>
      </ButtonGroup>
    </PageHeaderControl>
  )

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
              onClick={() => this.setState({
                columnWidth: {
                  'Program Owner': (this.state.tableWidth - 52) / 10,
                  'Program Name': (this.state.tableWidth - 52) / 10,
                  'Budget': (this.state.tableWidth - 52) / 10,
                  'MP Target': (this.state.tableWidth - 52) / 10,
                  'Target Region': (this.state.tableWidth - 52) / 10,
                  'Lifecycle Stage': (this.state.tableWidth - 52) / 10,
                  'APM1': (this.state.tableWidth - 52) / 10,
                  'APM2': (this.state.tableWidth - 52) / 10,
                  'Industry': (this.state.tableWidth - 52) / 10,
                  'Segment': (this.state.tableWidth - 52) / 10,
                  'Persona': (this.state.tableWidth - 52) / 10,
                  'Customer Message': (this.state.tableWidth - 52) / 10,
                  'Other KPI\'s': (this.state.tableWidth - 52) / 10,
                },
                tableExtraWidth: 0
              })}
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
            assistiveText={{ icon: 'Refresh' }}
            iconCategory="utility"
            iconName="refresh"
            iconVariant="border-filled"
            variant="icon"
            onClick={this.resetTable}
          />
          <Button
            assistiveText={{ icon: 'Filters' }}
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

  onSearch = search => {
    if (search.owner === "" && search.name === ""){
      this.setState({data: this.props.data, search});
      return false;
    }

    let data = [...this.props.data];

    if(search.owner) {
      data = data.filter((item) => {
        return item.owner ? item.owner.toLowerCase().includes(search.owner.toLowerCase()) : false;
      });
    }
    if(search.name) {
      data = data.filter(item => item.name.toLowerCase().includes(search.name.toLowerCase()))
    }

    this.setState({ currentPage: 1, data, search });
  }

  onSort = (sortInfo) => {
    const {property, sortDirection} = sortInfo;
    let data = [...this.state.data];

    data = data.sort((a, b) => {
      let val = 0;

      if (a[property] > b[property]) val = 1;
      if (a[property] < b[property]) val = -1;
      if (sortDirection === 'desc') val *= -1;

      return val;
    });

    this.setState({data, sortProperty: property, sortDirection });
  };

  resetTable = () => {
    this.setState({
      data: this.props.data,
      sortProperty: '',
      sortDirection: '',
      isPanelOpen: false,
      currentPage: 1,
      search: {
        owner: '',
        name: ''
      }
    })
  };

  handlePagination = (newData, currentPage) => {
    this.setState({displayedData: newData, currentPage});
  };

  toggleOpen = bool => {
    this.setState({ editModalIsOPen: bool });
  };

  handleRowAction = (item, { id }) => {
    switch(id) {
      case 0:
        this.setState({
          selectedprogram: {
            ...item,
            metrics: item.metrics && item.metrics.toString(),
          },
        });
        this.toggleOpen(true);
        break;
      case 1:
        this.props.onDelete(item);
        break;
      default:
        break;
    }
  };


  render() {
    return (
      <Container>
        <IconSettings iconPath="/assets/icons">
          {this.state.editModalIsOPen && <Modal onSearch={this.onSearch} search={this.state.search} onEdit={this.props.onEdit} program={this.state.selectedprogram} toggleOpen={this.toggleOpen} title='Edit program' ariaHideApp={false} />}
          <PageHeader
            onRenderActions={this.actions}
            icon={
              <Icon
                assistiveText={{ label: 'Programs' }}
                category="standard"
                name="lead"
              />
            }
            info={`${this.state.displayedData.length} of ${this.state.data.length} ${this.state.data.length === 1 ? 'item' : 'items'}`}
            joined
            onRenderControls={this.controls}
            title={<h1>Programs</h1>}
            truncate
            variant="object-home"
          />
          {this.state.isPanelOpen && (
            <Panel onSearch={this.onSearch} search={this.state.search} />
          )}
          <DataTable
            assistiveText={{
              actionsHeader: 'actions',
              columnSort: 'sort this column',
              columnSortedAscending: 'asc',
              columnSortedDescending: 'desc',
              selectAllRows: 'Select all rows',
              selectRow: 'Select this row',
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
          >
            <DataTableColumn
              label="Program Name"
              property="name"
              sortDirection={this.state.sortDirection || "desc"}
              sortable
              isSorted={this.state.sortProperty === 'name'}
              width={this.state.columnWidth['Program Name'] || 'auto'}
            />
            <DataTableColumn
              label="Program Owner"
              property="owner"
              width={this.state.columnWidth['Program Owner'] || 'auto'}
            />
            <DataTableColumn
              label="Budget"
              property="budget"
              sortDirection={this.state.sortDirection || "desc"}
              sortable
              isSorted={this.state.sortProperty === 'budget'}
              width={this.state.columnWidth['Budget'] || 'auto'}
            >
              <CurrencyCell />
            </DataTableColumn>
            <DataTableColumn
              label="MP Target"
              property="metrics"
              width={this.state.columnWidth['MP Target'] || 'auto'}
            >
              <CurrencyCell />
            </DataTableColumn>
            <DataTableColumn
              label="Target Region"
              property="targetRegion"
              sortDirection={this.state.sortDirection || "desc"}
              sortable
              isSorted={this.state.sortProperty === 'targetRegion'}
              width={this.state.columnWidth['Target Region'] || 'auto'}
            />
            <DataTableColumn
              label="Lifecycle Stage"
              property="lifecycleStage"
              width={this.state.columnWidth['Lifecycle Stage'] || 'auto'}
            >
              <DropDownCell />
            </DataTableColumn>
            <DataTableColumn
              label="APM1"
              property="apm1"
              width={this.state.columnWidth['APM1'] || 'auto'}
            >
              <DropDownCell />
            </DataTableColumn>
            <DataTableColumn
              label="APM2"
              property="apm2"
              width={this.state.columnWidth['APM2'] || 'auto'}
            >
             <DropDownCell />
            </DataTableColumn>
            <DataTableColumn
              label="Industry"
              property="industry"
              sortDirection={this.state.sortDirection || "desc"}
              sortable
              isSorted={this.state.sortProperty === 'industry'}
              width={this.state.columnWidth['Industry'] || 'auto'}
            >
              <DropDownCell />
            </DataTableColumn>
            <DataTableColumn
              label="Segment"
              property="segment"
              width={this.state.columnWidth['Segment'] || 'auto'}
            >
              <DropDownCell />
            </DataTableColumn>
            <DataTableColumn
              label="Persona"
              property="persona"
              width={this.state.columnWidth['Persona']|| 'auto'}
            >
              <DropDownCell />
            </DataTableColumn>
            <DataTableColumn
              label="Customer Message"
              property="customerMessage"
              width={this.state.columnWidth['Customer Message'] || 'auto'}
            />
            <DataTableColumn
              label="Other KPI's"
              property="otherKpis"
              width={this.state.columnWidth['Other KPI\'s'] || 'auto'}
            />
            <DataTableRowActions
              options={[
                {
                  id: 0,
                  label: 'Edit',
                  value: '1',
                },
                {
                  id: 1,
                  label: 'Delete',
                  value: '2',
                }
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
        </IconSettings>
      </Container>
    );
  }
}

export default withRouter(Table);
