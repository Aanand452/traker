import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Button,
  ButtonGroup,
  ButtonStateful,
  Combobox,
  DataTable,
  DataTableColumn,
  DataTableCell,
  DataTableRowActions,
  Datepicker,
  Dropdown,
  Icon,
  Input,
  PageHeader,
  PageHeaderControl,
  ToastContainer,
  Toast
} from '@salesforce/design-system-react';

import { getAPIUrl } from '../../config/config';
import Modal from '../EditActivityModal';
import Pager from '../Pager';

// ACTIONS
import {
  selectItem,
  setItem
} from '../../actions/DataTable';
import { Container, PanelContainer } from './styles';

const DateCell = ({ children, ...props }) => (
  <DataTableCell title={children} {...props}>
    {moment(children).format('DD/MM/YYYY')}
  </DataTableCell>
);
DateCell.displayName = DataTableCell.displayName;

const CustomDataTableCell = ({ children, ...props }) => (
	<DataTableCell {...props}>
		<a
      target="blank"
			href={children}
		>
			View asset
		</a>
	</DataTableCell>
);
CustomDataTableCell.displayName = DataTableCell.displayName;

class Table extends Component {
  state = {
    sortProperty: '',
    sortDirection: '',
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
    search: {},
    errors: {}
  };

  componentDidMount() {
    this.setupAndFetch();
  }

  setupAndFetch = async () => {
    if(window.location.hostname === 'localhost') this.API_URL =  "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();
    
    this.checkProgram();
    this.checkRegion();
    this.checkFormat();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({data: this.props.data});
    }
  }

  async checkProgram() {
    try {
      let response = await fetch(`${this.API_URL}/program`);
      if(response.status === 200) {
        let { result } = await response.json();
        this.setState({ programs: [{label: 'All'}, ...result], search: {...this.state.search, program: [{label: 'All'}]} });
      } else throw new Error(response);
    } catch(err) {
      console.error(err);
    }
  }

  async checkRegion() {
    try {
      let response = await fetch(`${this.API_URL}/region`);
      if(response.status === 200) {
        let { result } = await response.json();
        this.setState({ regions: [{label: 'All'}, ...result], search: {...this.state.search, region: [{label: 'All'}]}});
      } else {
        throw new Error(response);
      }
    } catch(err) {
      console.error(err);
    }
  }

  async checkFormat() {
    try {
      let response = await fetch(`${this.API_URL}/format`);
      if(response.status === 200) {
        let { result } = await response.json();
        this.setState({ formats: [{label: 'All'}, ...result], search: {...this.state.search, format: [{label: 'All'}]}});
      } else {
        throw new Error(response);
      }
    } catch(err) {
      console.error(err);
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

  search = text => {
    this.setState({search: text});
    if (!text){
      this.setState({data: this.props.data});
      return false;
    }
    
    let data = [...this.props.data];
    
    data = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));

    this.setState({data});
  }

  onSort = sortInfo => {
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
      isPanelOpen: false
    })
  };

  handlePagination = newData => this.setState({displayedData: newData});

  handleChange = (name, value) => {
    if(name === "startDate") {
      this.setState({ errors: { ...this.state.errors, startDate: false } });
    }
    if(name === "endDate") {
      this.setState({ errors: { ...this.state.errors, endDate: false } });
    }
    this.setState({search: {...this.state.search, [name]: value}});
  }

  filter = (arr, filters) => {
    const filterKeys = Object.keys(filters);
    return arr.filter(eachObj => {
      return filterKeys.every(eachKey => {
        if (!filters[eachKey].length) {
          return true;
        }
        return filters[eachKey].includes(eachObj[eachKey]);
      });
    });
  };

  onSearch = () => {
    let { title, campaignId, program, region, format, startDate, endDate } = this.state.search;
    let data = [...this.props.data];
    let search = {};    
    
    if(title && title.length > 0) search.title = title;
    if(campaignId && campaignId.length > 0) search.campaignId = campaignId;
    if(program && program.length > 0 && program[0].label !== "All") search.program = program[0].label;
    if(region && region.length > 0 && region[0].label !== "All") search.region = region[0].label;
    if(startDate && startDate.length > 0) search.startDate = startDate;
    if(endDate && endDate.length > 0) search.endDate = endDate;

    if(startDate && startDate.length > 0 && !endDate) {
      this.setState({ errors: { ...this.state.errors, endDate: true } });
      return;
    }

    if(endDate && endDate.length > 0 && !startDate) {
      this.setState({ errors: { ...this.state.errors, startDate: true } });
      return;
    }
    
    let filter = this.filter(data, search);

    if(filter.length <= 0) {
      this.setState({ errors: {} });
      filter = data;
    }

    this.setState({ data: filter });
  }

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
          <PanelContainer>
            <Input onChange={e => this.handleChange("campaignId", e.target.value)} value={this.state.search.campaignId} type="text" label="Search by campaign ID" className="slds-m-top_small" />
            <Input onChange={e => this.handleChange("title", e.target.value)} value={this.state.search.title} type='text' label="Search by title" className="slds-m-top_small" />
            <Combobox
              id="combobox-readonly-single"
              classNameContainer="slds-m-top_small"
              events={{onSelect: (event, data) => data.selection.length && this.handleChange("region", data.selection)}}
              labels={{label: 'Region'}}
              name="region"
              options={this.state.regions}
              selection={this.state.search.region}
              variant="readonly"
            />
            <Combobox
              id="combobox-readonly-single"
              classNameContainer="slds-m-top_small"
              events={{onSelect: (event, data) => data.selection.length && this.handleChange("program", data.selection)}}
              labels={{label: 'Program'}}
              name="program"
              options={this.state.programs}
              selection={this.state.search.program}
              variant="readonly"
            />
            <Combobox
              id="combobox-readonly-single"
              classNameContainer="slds-m-top_small"
              events={{onSelect: (event, data) => data.selection.length && this.handleChange("format", data.selection)}}
              labels={{label: 'Format'}}
              name="format"
              options={this.state.formats}
              selection={this.state.search.format}
              variant="readonly"
            />
            <div className={`slds-col slds-size_1-of-1 slds-m-top_small ${this.state.errors.startDate && "slds-has-error"}`}>
              <Datepicker
                labels={{label: 'Start Date'}}
                triggerClassName="slds-col slds-size_1-of-1"
                onChange={(event, data) => this.handleChange("startDate", data.formattedDate)}
                formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
                parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
                formattedValue={this.state.search.startDate}
              />
              {this.state.errors.startDate && <div class="slds-form-element__help">This field is required</div>}
            </div>
            <div className={`slds-col slds-size_1-of-1 slds-m-top_small ${this.state.errors.endDate && "slds-has-error"}`}>
              <Datepicker
                labels={{label: 'End Date'}}
                triggerClassName="slds-col slds-size_1-of-1"
                onChange={(event, data) => this.handleChange("endDate", data.formattedDate)}
                formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
                parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
                formattedValue={this.state.search.endDate}
              />
              {this.state.errors.endDate && <div class="slds-form-element__help">This field is required</div>}
            </div>
            <Button onClick={this.onSearch} className="slds-m-top_small" label="Search" variant="brand" />
          </PanelContainer>
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