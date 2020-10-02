import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
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
  PageHeader,
  PageHeaderControl,
  ToastContainer,
  Toast
} from '@salesforce/design-system-react';

import Modal from '../EditActivityModal';
import Panel from '../Panel';
import Pager from '../Pager';

// ACTIONS
import {
  selectItem,
  setItem
} from '../../actions/DataTable';
import { Container } from './styles';

const DateCell = ({ children, ...props }) => (
  <DataTableCell title={children} {...props}>
    {moment(children).format('DD/MM/YYYY')}
  </DataTableCell>
);
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
    sortProperty: '',
    sortDirection: '',
    search: '',
    toast: {
      show: this.props.location.newRow ? true : false,
      message: "A New Activity Has Been Added",
      variant: "success"
    },
    isPanelOpen: false,
    data: [],
    editModalIsOPen: false,
    isDeletePromptOpen: false,
    displayedData: [],
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
      {this.props.dataTable.selection.length > 0 && <PageHeaderControl>
        <Button
          onClick={this.props.openDeletePrompt}
          assistiveText={{ icon: 'Delete List' }}
          iconCategory="utility"
          iconName="delete"
          iconVariant="border"
          variant="icon"
        />
      </PageHeaderControl>}
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
        this.props.onDelete(item);
        break;
      default:
        break;
    }
  };
  
  onToast = (show, message, variant) => {
    this.setState({toast: {show, message, variant}});
  }

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

  handlePagination = (newData) => {
    this.setState({displayedData: newData});
  };

  render() {
    return (
      <Container>
        {this.state.editModalIsOPen && <Modal data={this.props.dataTable.item} onToast={this.onToast} title='Edit activity' toggleOpen={this.toggleOpen} reloadActivities={this.props.reloadActivities} />}
        <PageHeader
          onRenderActions={this.actions}
          icon={
            <Icon
              assistiveText={{ label: 'User' }}
              category="standard"
              name="lead"
            />
          }
          info={`${this.state.displayedData.length} of ${this.state.data.length} ${this.state.data.length === 1 ? 'item' : 'items'}`}
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
          items={this.state.displayedData}
          id="activitiesTable"
          joined
          onRowChange={this.props.selectItem}
          onSort={this.onSort}
          selection={this.props.dataTable.selection}
          selectRows="checkbox"
        >
          <DataTableColumn label="Program" property="programId" />
          <DataTableColumn label="Campaign ID" property="campaignId" />
          <DataTableColumn label="Title" property="title" />
          <DataTableColumn label="Tactic" property="tacticId" />
          <DataTableColumn label="Format" property="formatId" />
          <DataTableColumn label="Abstract" property="abstract" />
          <DataTableColumn
            sortDirection={this.state.sortDirection}
            sortable
            isSorted={this.state.sortProperty === 'region'}
            label="Region"
            property="regionId"
          />
          <DataTableColumn
            isSorted={this.state.sortProperty === 'startDate'}
            label="Start date"
            property="startDate"
            sortable
            sortDirection={this.state.sortDirection}
          >
            <DateCell />
          </DataTableColumn>
          <DataTableColumn
            isSorted={this.state.sortProperty === 'endDate'}
            label="End date"
            property="endDate"
            sortable
            sortDirection={this.state.sortDirection}
          >
            <DateCell />
          </DataTableColumn>
          <DataTableColumn label="Assets" property="asset">
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
              }
            ]}
            menuPosition="overflowBoundaryElement"
            onAction={this.handleRowAction}
            dropdown={<Dropdown length="7" />}
          />
        </DataTable>
        <Pager data={this.state.data} itemsPerPage={20} setDisplayedItems={this.handlePagination} />
        {this.state.toast.show && (
          <ToastContainer>
            <Toast 
              labels={{heading: [this.state.toast.message]}}
              variant={this.state.toast.variant}
              duration={5000}
              onRequestClose={() => this.setState({toast: {show: false}})}
            />
          </ToastContainer>
        )}
      </Container>
    );
  }
}

let mapState = ({ dataTable }) => ({
  dataTable
});

export default withRouter(connect(mapState, {selectItem, setItem })(Table));