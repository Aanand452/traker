import React, { Component, Fragment } from 'react';
import {
  Button,
  ButtonGroup,
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

import data from '../../data';
import { TableContainer } from './styles.js';

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
    items: [...data],
    selection: [],
  };

  actions = () => (
    <PageHeaderControl>
      <ButtonGroup id="button-group-page-header-actions">
        <Button label="New" onClick={() => console.log('Create row')} />
        <Button label="Import data" onClick={() => console.log('Import data')} />
        <Dropdown
          align="right"
          assistiveText={{ icon: 'More Options' }}
          iconCategory="utility"
          iconName="down"
          iconVariant="border-filled"
          id="page-header-dropdown-object-home-nav-right"
          options={[
            { label: 'Menu Item One', value: 'A0' },
            { label: 'Menu Item Two', value: 'B0' },
            { label: 'Menu Item Three', value: 'C0' },
            { type: 'divider' },
            { label: 'Menu Item Four', value: 'D0' },
          ]}
        />
      </ButtonGroup>
    </PageHeaderControl>
  )

  controls = () => (
    <Fragment>
      <PageHeaderControl>
        <Dropdown
          align="right"
          id="page-header-dropdown-object-home-content-right"
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
              assistiveText={{ icon: 'List View Controls' }}
              iconCategory="utility"
              iconName="settings"
              iconVariant="more"
            />
          </DropdownTrigger>
        </Dropdown>
      </PageHeaderControl>
      <PageHeaderControl>
        <Dropdown
          align="right"
          assistiveText={{ icon: 'Change view' }}
          iconCategory="utility"
          iconName="settings"
          iconVariant="more"
          id="page-header-dropdown-object-home-content-right-2"
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
              assistiveText={{ icon: 'Change view' }}
              iconCategory="utility"
              iconName="table"
              iconVariant="more"
              variant="icon"
            />
          </DropdownTrigger>
        </Dropdown>
      </PageHeaderControl>
      {this.state.selection.length > 0 ? <PageHeaderControl>
        <Button
          assistiveText={{ icon: 'Edit List' }}
          iconCategory="utility"
          iconName="edit"
          iconVariant="border"
          variant="icon"
        />
      </PageHeaderControl> : null}
      {this.state.selection.length > 0 ? <PageHeaderControl>
        <Button
          onClick={this.handleDeleteSelection}
          assistiveText={{ icon: 'Delete List' }}
          iconCategory="utility"
          iconName="delete"
          iconVariant="border"
          variant="icon"
        />
      </PageHeaderControl> : null}
      <PageHeaderControl>
        <Button
          assistiveText={{ icon: 'Refresh' }}
          iconCategory="utility"
          iconName="refresh"
          iconVariant="border"
          variant="icon"
        />
      </PageHeaderControl>
      <PageHeaderControl>
        <ButtonGroup id="button-group-page-header-controls">
          <Button
            assistiveText={{ icon: 'Charts' }}
            iconCategory="utility"
            iconName="chart"
            iconVariant="border"
            variant="icon"
          />
          <Button
            assistiveText={{ icon: 'Filters' }}
            iconCategory="utility"
            iconName="filterList"
            iconVariant="border"
            variant="icon"
          />
        </ButtonGroup>
      </PageHeaderControl>
    </Fragment>
  );

  handleDeleteSelection = () => {
    let items = this.state.items.filter(el => !this.state.selection.includes(el))
    this.setState({ selection: [], items });
  }

  handleChanged = (event, data) => {
    this.setState({ selection: data.selection });
  };

  handleRowAction = (item, { id }) => {
    switch(id) {
      case 0:
        console.log('Edit');
        break;
      case 1:
        let items = this.state.items.filter((el, idx) => el.id !== item.id);
        this.setState({items});
        break;
      default:
        break;
    }
  };

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
      items: [...this.state.items],
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
    return (
      <TableContainer>
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
            info={`${this.state.items.length} ${this.state.items.length === 1 ? 'item' : 'items'}`}
            joined
            label="Leads"
            onRenderControls={this.controls}
            title={
              <h1 className="slds-page-header__title slds-p-right_x-small">
                <Dropdown
                  id="page-header-dropdown-object-home-header"
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
            items={this.state.items}
            id="DataTableExample-FixedHeaders"
            joined
            onRowChange={this.handleChanged}
            onSort={this.handleSort}
            selection={this.state.selection}
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
            <DataTableColumn label="Region" property="region" />
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
            <DataTableColumn label="Assets" property="assets">
              <CustomDataTableCell />
            </DataTableColumn>
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
      </TableContainer>
    );
  } 
}

export default Table;