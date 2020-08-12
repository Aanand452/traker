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
  DropdownTrigger,
  Icon,
  IconSettings,
  PageHeader,
  PageHeaderControl
} from '@salesforce/design-system-react';

import Modal from '../Modal';
import Panel from '../Panel';
import Pager from '../Pager';
import Prompt from '../Prompt';

// ACTIONS
import {
  openDeletePrompt,
  selectItem,
  handleDeleteSelection
} from '../../actions/DataTable';

import data from '../../data';
import { PagerContainer } from './styles.js';

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
    item: undefined,
    selection: [],
    editModalIsOPen: false,
    isPanelOpen: false,
    searchByTitle: '',
    isDeletePromptOpen: false
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
      {this.props.dataTable.selection.length > 0 ? <PageHeaderControl>
        <Button
          onClick={this.props.openDeletePrompt}
          assistiveText={{ icon: 'Delete List' }}
          iconCategory="utility"
          iconName="delete"
          iconVariant="border"
          variant="icon"
        />
      </PageHeaderControl> : null}
      <PageHeaderControl>
        <ButtonStateful
          assistiveText={{ icon: 'Refresh' }}
          iconCategory="utility"
          iconName="refresh"
          iconVariant="border-filled"
          variant="icon"
          onClick={this.resetItems}
        />
      </PageHeaderControl>
      <PageHeaderControl>
        <ButtonGroup id="button-group-page-header-controls">
          <ButtonStateful
            assistiveText={{ icon: 'Charts' }}
            iconCategory="utility"
            iconName="chart"
            iconVariant="border-filled"
            variant="icon"
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

  resetItems = () => {
    this.setState({ items: [...data] });
  }

  toggleOpen = () => {
    this.setState({ editModalIsOPen: !this.state.editModalIsOPen });
  };

  handleDeleteSelection = item => {
    if(item) {
      let items = this.props.dataTable.items.filter(el => el.id !== item.id);
      this.setState({ items, item: undefined, isDeletePromptOpen: false });
    } else {
      let items = this.props.dataTable.items.filter(el => !this.state.selection.includes(el))
      this.setState({ selection: [], items, isDeletePromptOpen: false, item: undefined });
    }
  }
  
  editData = row => {
    let items = [...this.props.dataTable.items];
    items.splice(row.id, 1, row)
    this.setState({ items });
    this.toggleOpen();
  }

  handleRowAction = (item, { id }) => {
    switch(id) {
      case 0:
        this.setState({ item });
        this.toggleOpen();
        break;
      case 1:
        this.props.openDeletePrompt(item);
        // this.setState({ item, isDeletePromptOpen: !this.state.isDeletePromptOpen });
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
  };

  render() {

    let filtered = this.props.dataTable.items && this.props.dataTable.items.filter(e => {
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
          {this.state.editModalIsOPen && <Modal onSubmit={this.editData} data={this.state.item} title='Edit row' isOpen={this.state.editModalIsOPen} toggleOpen={this.toggleOpen} />}
          {this.props.dataTable.isDeletePromptOpen && <Prompt onDelete={true} />}
          <IconSettings iconPath="/assets/icons">
            <PageHeader
              onRenderActions={this.actions}
              icon={
                <Icon
                  assistiveText={{ label: 'User' }}
                  category="standard"
                  name="lead"
                />
              }
              info={`${this.props.dataTable.items.length} ${this.props.dataTable.items.length === 1 ? 'item' : 'items'}`}
              joined
              label="Leads"
              onRenderControls={this.controls}
              title={
                <h1 className="slds-page-header__title slds-p-right_x-small">
                  <Dropdown
                    options={[
                      { label: 'Menu Item One', value: 'A0' },
                      { label: 'Menu Item Two', value: 'B0' },
                      { label: 'Menu Item Three', value: 'C0' },
                      { type: 'divider' },
                      { label: 'Menu Item Four', value: 'D0' },
                    ]}
                  >
                    <DropdownTrigger>
                      <Button
                        className="slds-button_reset slds-type-focus"
                        iconCategory="utility"
                        iconName="down"
                        iconPosition="right"
                        label="Sales report"
                        responsive
                        variant="base"
                      />
                    </DropdownTrigger>
                  </Dropdown>
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
            id="DataTableExample-FixedHeaders"
            joined
            onRowChange={this.props.selectItem}
            onSort={this.handleSort}
            selection={this.props.dataTable.selection}
            selectRows="checkbox"
          >
            <DataTableColumn
              isSorted={this.state.sortColumn === 'theme'}
              label="Theme"
              primaryColumn
              property="theme"
              sortable
              sortDirection={this.state.sortColumnDirection.theme}
            >
              <CustomDataTableCell />
            </DataTableColumn>
            <DataTableColumn label="Program" property="program" />
            <DataTableColumn label="Title" property="title" />
            <DataTableColumn label="Format" property="format" />
            <DataTableColumn label="Persona" property="persona" />
            <DataTableColumn label="Abstract" property="abstract" />
            { this.props.type === "2" &&
              <DataTableColumn
                sortDirection={this.state.sortColumnDirection.region}
                sortable isSorted={this.state.sortColumn === 'region'}
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
            <DataTableColumn label="Results" property="results" />
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
                },
              ]}
              menuPosition="overflowBoundaryElement"
              onAction={this.handleRowAction}
              dropdown={<Dropdown length="7" />}
            />
          </DataTable>
        </IconSettings>
        <PagerContainer>
            <Pager />
        </PagerContainer>
      </div>
    );
  }
}

let mapState = ({ dataTable }) => ({
  dataTable
});

export default withRouter(connect(mapState, { openDeletePrompt, selectItem, handleDeleteSelection })(Table));