import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
import Pager from '../Pager';
import Prompt from '../Prompt';

// ACTIONS
import {
  openDeletePrompt,
  selectItem,
  handleDeleteSelection,
  resetItems,
  setItem
} from '../../actions/DataTable';
import { Container } from './styles';

// import { PagerContainer } from './styles.js';

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
    sortProperty: '',
    sortDirection: '',
    search: '',
    showToast: this.props.location.newRow ? true : false,
    isPanelOpen: false,
    data: [],
    editModalIsOPen: false,
    isDeletePromptOpen: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({data: this.props.data});
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
        <Button
          assistiveText={{ icon: 'Refresh' }}
          iconCategory="utility"
          iconName="refresh"
          iconVariant="border"
          variant="icon"
          onClick={this.resetTable}
        />
      </PageHeaderControl>
      <PageHeaderControl>
        <ButtonGroup id="button-group-page-header-controls">
          <ButtonStateful
            assistiveText={{ icon: 'Filters' }}
            iconCategory="utility"
            iconName="filterList"
            iconVariant="border-filled"
            variant="icon"
            onClick={() => this.setState({isPanelOpen: !this.state.isPanelOpen })}
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
  
  onSearch = text => {
    this.setState({search: text});
    if (!text){
      this.setState({data: this.props.data});
      return false;
    }

    let data = [...this.props.data];
    data = data.filter(item => item.title.includes(text))
    this.setState({data});
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
      search: '',
      isPanelOpen: false
    })
  };

  render() {
    return (
      <Container>
        <IconSettings iconPath="/assets/icons">
          {this.state.editModalIsOPen && <Modal data={this.props.dataTable.item} title='Edit row' toggleOpen={this.toggleOpen} />}
          {this.props.dataTable.isDeletePromptOpen && <Prompt />}
          <PageHeader
            onRenderActions={this.actions}
            icon={
              <Icon
                assistiveText={{ label: 'User' }}
                category="standard"
                name="lead"
              />
            }
            info={`${this.state.data.length} ${this.state.data.length === 1 ? 'item' : 'items'}`}
            joined
            onRenderControls={this.controls}
            title={<h1>Activities</h1>}
            truncate
            variant="object-home"
          />
          {this.state.isPanelOpen && (
            <Panel label="Search by title" search={this.state.search} handleSearch={(e) => this.onSearch(e)} />
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
            fixedLayout
            items={this.state.data}
            id="activitiesTable"
            joined
            onRowChange={this.props.selectItem}
            onSort={this.onSort}
            selection={this.props.dataTable.selection}
            selectRows="checkbox"
          >
            <DataTableColumn label="Program" property="program" />
            <DataTableColumn label="Campaign ID" property="campaignId" />
            <DataTableColumn label="Title" property="title" />
            <DataTableColumn label="Tactic" property="tactic" />
            <DataTableColumn label="Format" property="format" />
            <DataTableColumn label="Abstract" property="abstract" />
            <DataTableColumn
              sortDirection={this.state.sortDirection}
              sortable
              isSorted={this.state.sortProperty === 'region'}
              label="Region"
              property="region"
            />
            <DataTableColumn
              isSorted={this.state.sortProperty === 'startDate'}
              label="Start date"
              property="startDate"
              sortable
              sortDirection={this.state.sortDirection}
            />
            <DataTableColumn
              isSorted={this.state.sortProperty === 'endDate'}
              label="End date"
              property="endDate"
              sortable
              sortDirection={this.state.sortDirection}
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
          {/* <PagerContainer>
              <Pager />
          </PagerContainer> */}
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
      </Container>
    );
  }
}

let mapState = ({ dataTable }) => ({
  dataTable
});

export default withRouter(connect(mapState, { openDeletePrompt, selectItem, handleDeleteSelection, resetItems, setItem })(Table));