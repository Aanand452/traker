import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
} from '@salesforce/design-system-react';

import Panel from '../Panel';
import { Container } from './styles';
import Pager from '../Pager';
import Modal from '../ProgramModal';

const CurrencyCell = ({ children, ...props }) => {

  if(parseInt(children, 10) === 0) {
    return <DataTableCell title={children} {...props}>
      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 1 }).format(children)}
    </DataTableCell>
  } else {
    return <DataTableCell title={children} {...props}>
      {parseInt(children, 10) ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(children) : ''}
    </DataTableCell>
  }
}

const DropDownCell = ({ children, ...props }) => {

  let items = props.property;
  let options = props.item[items].map(el => el);

  if(options.length <= 0) {
    return <DataTableCell title={children} {...props}>

    </DataTableCell>
  }

  return <DataTableRowActions
          options={options}
          menuPosition="overflowBoundaryElement"
          dropdown={<Dropdown />}
        />
}

CurrencyCell.displayName = DataTableCell.displayName;
DropDownCell.displayName = DataTableCell.displayName;

class Table extends Component {
  state = {
    sortProperty: '',
    sortDirection: '',
    isPanelOpen: false,
    data: [],
    displayedData: [],
    editModalIsOPen: false,
    selectedprogram: {},
    currentPage: 1,
    search: {
      owner: '',
      name: ''
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({data: this.props.data}, () => {
        if(this.state.sortProperty && this.state.sortDirection) {
          this.onSort({property: this.state.sortProperty, sortDirection: this.state.sortDirection})
        }
      });
      this.onSearch(this.state.search);
    }
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
        <Button
          assistiveText={{ icon: 'Refresh' }}
          iconCategory="utility"
          iconName="refresh"
          iconVariant="border-filled"
          variant="icon"
          onClick={this.resetTable}
        />
      </PageHeaderControl>
      <PageHeaderControl>
        <ButtonGroup id="button-group-page-header-controls">
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
            fixedLayout
            items={this.state.displayedData}
            id="DataTableExample-FixedHeaders"
            joined
            onSort={this.onSort}
          >
            <DataTableColumn
              label="Program Name"
              property="name"
              sortDirection={this.state.sortDirection}
              sortable
              isSorted={this.state.sortProperty === 'name'}
            />
            <DataTableColumn label="Program Owner" property="owner" />
            <DataTableColumn
              label="Budget"
              property="budget"
              sortDirection={this.state.sortDirection}
              sortable
              isSorted={this.state.sortProperty === 'budget'}
            >
              <CurrencyCell />
            </DataTableColumn>
            <DataTableColumn label="MP Target" property="metrics">
              <CurrencyCell />
            </DataTableColumn>
            <DataTableColumn
              label="Target Region"
              property="targetRegion"
              sortDirection={this.state.sortDirection}
              sortable
              isSorted={this.state.sortProperty === 'targetRegion'}
            />
            <DataTableColumn label="Lifecycle Stage" property="lifecycleStage">
              <DropDownCell />
            </DataTableColumn>
            <DataTableColumn label="APM1" property="apm1">
              <DropDownCell />
            </DataTableColumn>
            <DataTableColumn label="APM2" property="apm2">
             <DropDownCell />
            </DataTableColumn>
            <DataTableColumn
              label="Industry"
              property="industry"
              sortDirection={this.state.sortDirection}
              sortable
              isSorted={this.state.sortProperty === 'industry'}
            >
              <DropDownCell />
            </DataTableColumn>
            <DataTableColumn label="Segment" property="segment">
              <DropDownCell />
            </DataTableColumn>
            <DataTableColumn label="Persona" property="persona">
              <DropDownCell />
            </DataTableColumn>
            <DataTableColumn label="Customer Message" property="customerMessage" />
            <DataTableColumn label="Other KPI's" property="otherKpis" />
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
          <Pager data={this.state.data} itemsPerPage={20} setDisplayedItems={this.handlePagination} currentPage={this.state.currentPage} />
        </IconSettings>
      </Container>
    );
  }
}

export default withRouter(Table);
