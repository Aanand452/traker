import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';

import {
  Button,
  ButtonGroup,
  ButtonStateful,
  DataTable,
  DataTableColumn,
  DataTableCell,
  Icon,
  IconSettings,
  PageHeader,
  PageHeaderControl,
  ToastContainer,
  Toast
} from '@salesforce/design-system-react';
import Panel from '../Panel';
import { Container } from './styles';

const CustomDataTableCell = ({ children, ...props }) => (
  <DataTableCell title={children} {...props}>
    <a
      href="javascript:void(0);"
      onClick={(event) => event.preventDefault()}
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
    data: []
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({data: this.props.data});
    }
  }

  actions = () => (
    <PageHeaderControl>
      <ButtonGroup id="button-group-page-header-actions">
        <Link>
          <Button label="New" />
        </Link>
      </ButtonGroup>
    </PageHeaderControl>
  )

  controls = () => (
    <Fragment>
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
            onClick={() => {
              this.setState({ isPanelOpen: !this.state.isPanelOpen });
            }}
          />
        </ButtonGroup>
      </PageHeaderControl>
    </Fragment>
  );
  
  onSearch = text => {
    this.setState({search: text});
    if (!text){
      this.setState({data: this.props.data});
      return false;
    }

    let data = [...this.props.data];
    data = data.filter(item => item.programName.includes(text))
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
          <PageHeader
            onRenderActions={this.actions}
            icon={
              <Icon
                assistiveText={{ label: 'Programs' }}
                category="standard"
                name="lead"
              />
            }
            info={`${this.state.data.length} ${this.state.data.length === 1 ? 'item' : 'items'}`}
            joined
            onRenderControls={this.controls}
            title={<h1>Programs</h1>}
            truncate
            variant="object-home"
          />
          {this.state.isPanelOpen && (
            <Panel label="Search by Name" search={this.state.search} handleSearch={(e) => this.onSearch(e)} />
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
            id="DataTableExample-FixedHeaders"
            joined
            onSort={this.onSort}
          >
            <DataTableColumn
              label="Program Name"
              property="name"
              sortDirection={this.state.sortDirection}
              sortable
              isSorted={this.state.sortProperty === 'programName'}
            />
            <DataTableColumn label="Program Owner" property="owner" />
            <DataTableColumn label="Budget" property="budget" />
            <DataTableColumn label="Metrics" property="metrics" />
            <DataTableColumn label="Parent Campaign ID" property="parentCampaignId" />
            <DataTableColumn label="Target Region" property="targetRegion" />
            <DataTableColumn label="Lifecycle Stage" property="lifecycleStage" />
            <DataTableColumn label="APM1" property="apm1" />
            <DataTableColumn label="APM2" property="apm2" />
            <DataTableColumn label="Industry" property="industry" />
            <DataTableColumn label="Segment" property="segment" />
            <DataTableColumn label="Persona" property="persona" />
            <DataTableColumn label="Customer Message" property="customerMessage" />
            <DataTableColumn label="Business Goal" property="businessGoal" />
          </DataTable>
          
          {this.state.showToast && (
            <ToastContainer>
              <Toast 
                labels={{heading: ["A new Program was added successfully"]}}
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

export default withRouter(Table);