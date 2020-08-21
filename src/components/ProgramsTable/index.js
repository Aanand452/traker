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
import Pager from '../Pager';
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
    sortColumn: 'opportunityName',
    sortColumnDirection: {
      opportunityName: 'asc',
    },
    searchByTitle: '',
    showToast: this.props.location.newRow ? true : false,
    isPanelOpen: false,
  };

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
        <ButtonStateful
          assistiveText={{ icon: 'Refresh' }}
          iconCategory="utility"
          iconName="refresh"
          iconVariant="border"
          variant="icon"
          onClick={this.props.resetItems}
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
            info={`${this.props.data.length} ${this.props.data.length === 1 ? 'item' : 'items'}`}
            joined
            onRenderControls={this.controls}
            title={<h1>Programs</h1>}
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
            items={this.props.data}
            id="DataTableExample-FixedHeaders"
            joined
            onSort={this.handleSort}
          >
            <DataTableColumn label="Program Name" property="programName" />
            <DataTableColumn label="Program Owner" property="programOwner" />
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
          {/* <PagerContainer>
              <Pager />
          </PagerContainer> */}
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