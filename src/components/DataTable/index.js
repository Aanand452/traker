import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Button,
  ButtonGroup,
  ButtonStateful,
  DataTable,
  DataTableColumn,
  DataTableCell,
  DataTableRowActions,
  Dropdown,
  Icon,
  IconSettings,
  PageHeader,
  PageHeaderControl,
  ToastContainer,
  Toast
} from '@salesforce/design-system-react';

import Modal from '../Modal';
import Panel from '../Panel';
import Prompt from '../Prompt';

// ACTIONS
import {
  openDeletePrompt,
  selectItem,
  handleDeleteSelection,
  resetItems,
  setItem,
  setPages,
  sortItems
} from '../../actions/DataTable';

const CustomDataTableCell = ({ children, ...props }) => (
  <DataTableCell title={children} {...props}>
    <a
      href="javascript:void(0);"
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {children}
    </a>
  </DataTableCell>
);

CustomDataTableCell.displayName = DataTableCell.displayName;


class Table extends Component {
  state = {
    sortColumn: 'opportunityName',
    sortColumnDirection: {
      opportunityName: 'asc',
    },
    editModalIsOPen: false,
    isPanelOpen: false,
    searchByTitle: '',
    isDeletePromptOpen: false,
    showToast: this.props.location.newRow ? true : false
  };

  actions = () => (
    <PageHeaderControl>
      <ButtonGroup id="button-group-page-header-actions">
        <Button label="New" onClick={() => this.props.history.push('/home')} />
        <Button label="Import data" onClick={() => this.props.history.push('/home')} />
      </ButtonGroup>
    </PageHeaderControl>
  )

  controls = () => (
    <Fragment>
      <PageHeaderControl>
        <ButtonGroup id="button-group-page-header-controls">
        {this.props.dataTable.selection.length > 0 && <Button
          onClick={this.props.openDeletePrompt}
          assistiveText={{ icon: 'Delete List' }}
          iconCategory="utility"
          iconName="delete"
          iconVariant="border"
          variant="icon"
        />}
      
        <ButtonStateful
          assistiveText={{ icon: 'Refresh' }}
          iconCategory="utility"
          iconName="refresh"
          iconVariant="border"
          variant="icon"
          onClick={this.props.resetItems}
        />
          <ButtonStateful
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

  toggleOpen = () => {
    this.setState({ editModalIsOPen: !this.state.editModalIsOPen });
  };
  
  editData = row => {
    let items = [...this.props.dataTable.items];
    items.splice(row.id, 1, row)
    this.setState({ items });
    this.toggleOpen();
  }

  handleRowAction = (item, { id }) => {
    switch(id) {
      case 0:
        this.props.setItem(item);
        this.toggleOpen();
        break;
      case 1:
        this.props.openDeletePrompt(item);
        break;
      default:
        break;
    }
  };
  
  handleSearch = text => {
    this.setState({ searchByTitle: text });
  }

  handleSort = (sortColumn, ...rest) => {
    if (this.props.log) {
      this.props.log('sort')(sortColumn, ...rest);
    }

    const sortProperty = sortColumn.property;
    const { sortDirection } = sortColumn;
    const newState = {
      sortColumn: sortProperty,
      sortColumnDirection: {
          [sortProperty]: sortDirection,
      },
      items: [...this.props.dataTable.items],
    };

    // needs to work in both directions
    newState.items = newState.items.sort((a, b) => {
      let val = 0;

      if (a[sortProperty] > b[sortProperty]) {
        val = 1;
      }
      if (a[sortProperty] < b[sortProperty]) {
        val = -1;
      }

      if (sortDirection === 'desc') {
        val *= -1;
      }

      return val;
    });

    this.setState(newState);
    this.props.sortItems(newState.items)
  };

  componentDidMount() {
    let { items, limit } = this.props.dataTable;
    this.props.setPages(items, limit);
  }

  render() {

    let filtered = this.props.dataTable.items && this.props.dataTable.items.filter((e, i) => {
      if(e && e.title)
        return e.title.toLowerCase().indexOf(this.state.searchByTitle.toLowerCase()) !== -1
      else
        return [];
    });

    return (
      <div
        style={{
          width: '100%',
          marginTop: '90px',  
        }}
      >
        <IconSettings iconPath="/assets/icons">
          {this.state.editModalIsOPen && <Modal data={this.props.dataTable.item} title='Edit activity' toggleOpen={this.toggleOpen} />}
          {this.props.dataTable.isDeletePromptOpen && <Prompt />}
          <PageHeader
            icon={
              <Icon
                assistiveText={{ label: 'User' }}
                category="standard"
                name="lead"
              />
            }
            info={`${this.props.dataTable.items.length} ${this.props.dataTable.items.length === 1 ? 'item' : 'items'}`}
            joined
            label="Activities"
            onRenderControls={this.controls}
            title={
              <h1 className="slds-page-header__title slds-p-right_x-small">
                <Button
                  className="slds-button_reset slds-type-focus"
                  iconCategory="utility"
                  iconPosition="right"
                  label="Report data"
                  responsive
                  variant="base"
                />
              </h1>
            }
            truncate
            variant="object-home"
          />
          {this.state.isPanelOpen && <Panel searchByTitle={this.state.searchByTitle} handleSearch={this.handleSearch} />}
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
            fixedLayout
            items={filtered}
            id="DataTableExample-FixedHeaders123456789"
            joined
            onRowChange={this.props.selectItem}
            onSort={this.handleSort}
            selection={this.props.dataTable.selection}
            selectRows="checkbox"
          >
            <DataTableColumn label="Campaign ID" property="campaignId" />
            <DataTableColumn label="Program" property="program" />
            <DataTableColumn label="Title" property="title" />
            <DataTableColumn label="Tactics" property="tactic" />
            <DataTableColumn label="Format" property="format" />
            <DataTableColumn label="Abstract" property="abstract" />
            { this.props.type === "2" &&
              <DataTableColumn
                sortDirection={this.state.sortColumnDirection.region}
                sortable
                isSorted={this.state.sortColumn === 'region'}
                label="Region"
                property="region"
              />
            }
            <DataTableColumn
              isSorted={this.state.sortColumn === 'startDate'}
              label="Start date"
              property="startDate"
              sortable
              sortDirection={this.state.sortColumnDirection.startDate}
            />
            <DataTableColumn
              isSorted={this.state.sortColumn === 'endDate'}
              label="End date"
              property="endDate"
              sortable
              sortDirection={this.state.sortColumnDirection.endDate}
            />
            <DataTableColumn label="Assets" property="asset" />
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
          {this.state.showToast && (
            <ToastContainer>
              <Toast 
                labels={{heading: ["A new campaign was added successfully"]}}
                variant="success"
                duration={5000}
                onRequestClose={() => this.setState({showToast: false})}
              />
            </ToastContainer>
          )}
        </IconSettings>
      </div>
    );
  }
}

let mapState = ({ dataTable }) => ({
  dataTable
});

export default withRouter(connect(mapState, { openDeletePrompt, selectItem, handleDeleteSelection, resetItems, setItem, setPages, sortItems })(Table));