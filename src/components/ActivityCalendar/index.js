import "./styles.css";
import React, { Component,} from "react";
import { withRouter, Link } from 'react-router-dom';
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import moment from 'moment';
import {ModalTableContainer, CalendarContainer } from './styles';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Card, CardFilter, Icon, CardEmpty, Button, DataTable, DataTableColumn, DataTableRowActions, Tooltip, Dropdown} from "@salesforce/design-system-react";
import EditModal from "../EditActivityModal";
import CloneModal from "../CloneActivityModal";
import ViewActivityModal from "../ViewActivityModal";
import {setItem } from "../../actions/DataTable";
import { connect } from "react-redux";




moment.locale('en-GB',{
    week: {
        dow: 1,
        // doy: 1,
    },
});
const localizer = momentLocalizer(moment)
const columns =[
    <DataTableColumn 
        key="title"
        label="Title"
        property="title"
        width="16em"
    />,
    <DataTableColumn 
        key="abstract"
        label="Abstract"
        property="abstract"
        width="20em"
    />,
    <DataTableColumn 
        key="formatId"
        label="Format"
        property="formatId"
        width="6em"
    />,
    <DataTableColumn 
        key="regionId"
        label="Region"
        property="regionId"
        width="4em"
    />,
    <DataTableColumn
        key="Assets"
        width="14em"
        label="Assets"
        property="asset"
    />
]
class ActivityCalendar extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentDate: new Date(),
            currentView: 'month',
            displayedDateRage: {},
            data: [],
            displayedData : [],
            events: [],
            eventsOnModal:[],
            editItem:{},
            cloneModalIsOPen:false,
            editModalIsOPen:false,
            detailModalIsOpen:false,
            toast:{
                show:false
            }
        }
    }
    componentDidMount() {
        this.state.data = this.props.activities
        this.computeDisplayedDateRange();
    }
    computeDisplayedDateRange = () => {
        const {currentDate, currentView} = this.state;
        let start = moment(currentDate).startOf(currentView);
        let end = moment(currentDate).endOf(currentView);
      if(currentView === 'month') {
          start = start.startOf('week');
          end = end.endOf('week');
      }
    //   let startDate = new Date(start.toString())
    //   let endDate = new Date(end.toString())
    //   let today = new Date()
      let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
      let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0)
      this.state.displayedData = this.state.data.filter(a => {
          var date = new Date(a.startDate)
          return (date >= startDate && date <= endDate)
      });
      const finalEvents = []
      this.state.displayedData.forEach(e => {
        finalEvents.push({title:e.title, start:new Date(e.startDate), end:new Date(e.startDate), allDay:false, resource:{data:e}})
      })
      this.state.events = finalEvents
      this.setState({displayedDateRage:{start:start.toString(), end:end.toString()}})
    }
    onNavigate = async (date, view, action) => {
        await this.setState({currentDate:date});
        this.computeDisplayedDateRange();
    }
    onView = async (view) => {
        await this.setState({currentView:view});
      this.computeDisplayedDateRange();
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.activities !== prevProps.activities) {
            this.state.data = this.props.activities
            this.computeDisplayedDateRange();
            
        }
    }
    handleSelectDay = (slotinfo) => {
        var modalEvents = this.state.events.filter(a => {
            var date = new Date(a.start)
            return (date.getDay()+'-'+date.getMonth()+'-'+date.getFullYear() === slotinfo.start.getDay()+'-'+slotinfo.start.getMonth()+'-'+slotinfo.start.getFullYear())
        });
        var modalActivities = modalEvents.map(event => {
            return event.resource.data})
        this.setState({eventsOnModal:modalActivities})

        this.setState({toast:{show:true}})
    }
    hideModal = () => {
        this.setState({toast:{show:false}})
    }
    getModalEvents = (date) =>{
        return 
    }
    handleDrillDown = (slotinfo) => {
        var modalEvents = this.state.events.filter(a => {
            var date = new Date(a.start)
            return (date.getDay()+'-'+date.getMonth()+'-'+date.getFullYear() === slotinfo.getDay()+'-'+slotinfo.getMonth()+'-'+slotinfo.getFullYear())
        });
        var modalActivities = modalEvents.map(event => {
            return event.resource.data})
        this.setState({eventsOnModal:modalActivities})

        this.setState({toast:{show:true}})
    }
    handleSelectEvent = (event) =>{
        this.toggleOpen("detailModalIsOpen");
        var modalActivities = event.resource.data
        this.props.setItem(modalActivities);
    }

    toggleOpen = state => {
        this.setState({ [state]: !this.state[state] });
    };
    closeDetailModal = () => this.setState({detailModalIsOpen: false})

    onToast = (show, message, variant) => {
        this.setState({ toast: { show, message, variant } });
    };

    handleRowClicked = (row, e) => {
    }
    handleFilterChange = (event) => {
        // const filteredUserItems = this.state.eventsOnModal.filter((item) =>
        //         RegExp(event.target.value, 'i').test(item.userId)
        //     );
        // const filteredCampIDItems = this.state.eventsOnModal.filter((item) =>
        //         RegExp(event.target.value, 'i').test(item.campaignId)
        //     );
        // const filteredTitleItems = this.state.eventsOnModal.filter((item) =>
        //         RegExp(event.target.value, 'i').test(item.title)
        //     );
        // const filteredProgramItems = this.state.eventsOnModal.filter((item) =>
        //         RegExp(event.target.value, 'i').test(item.programId)
        //     );
        // const filteredItems = [...new Set([...filteredUserItems, ...filteredCampIDItems, ...filteredTitleItems, ...filteredProgramItems])]
    
        // this.setState({eventsOnModal:filteredItems})
    }
    handleRowAction = (item, { id }) => {
        switch (id) {
            case 0:
            //   this.props.setItem(item);
              this.setState({editItem:item})
              this.toggleOpen("editModalIsOPen")
              break;
            case 1:
              this.props.onDelete(item);
              break;
            case 2:
              this.setState({editItem:item})
              this.toggleOpen("cloneModalIsOPen");
              break;
            case 3:
              const fullItem = this.state.data.filter(obj => {if (obj.id===item.id) return true;})[0]
              this.props.setItem(fullItem);
              this.setState({toast:{show:false}})
              this.toggleOpen("detailModalIsOpen");
              break;
            default:
              break;
          }
    }

    getEventColor = (format) => {
        switch(format){
            case '3rdParty-Virtual Event': return '02d4308c'
            case 'Webinar': return 'e081048c'
            case 'Exec Engagement': return 'c9c5068c'
            case 'Executive Visit': return '058eb88c'
            case 'F2F Event': return '0520b88c'
            case 'Webinar - 3rd Party': return '4405b88c'
            case 'Virtual Event': return 'a905b88c'
            case 'SIC': return 'b805148c'
            case 'Launch': return '5983598c'
            default : return '04f7398c'
        }
    }
    eventStyleGetter = (event, start, end, isSelected) => {        
        var backgroundColor = '#' + this.getEventColor(event.resource.data.formatId);
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 1,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    render() {
        const isEmpty = this.state.eventsOnModal.length === 0;
        return (

            <CalendarContainer>
                {this.state.cloneModalIsOPen && (
                    <CloneModal
                        data={this.state.editItem}
                        onToast={this.onToast}
                        toggleOpen={this.toggleOpen}
                        reloadActivities={this.props.reloadActivities}
                        historicDate={this.props.historicDate}
                        isHistoric={this.props.isHistoric}
                    />
                    )}
                    {this.state.editModalIsOPen && (
                        <EditModal
                            data={this.state.editItem}
                            onToast={this.onToast}
                            toggleOpen={this.toggleOpen}
                            reloadActivities={this.props.reloadActivities}
                        />
                        )}
                    {this.state.detailModalIsOpen && (
                        <ViewActivityModal
                            onDelete={this.props.onDelete}
                            reloadActivities={this.props.reloadActivities}
                            closeDetailModal={this.closeDetailModal}
                        />
                    )}
                    {
                    <Modal
                        isOpen={this.state.toast.show}
                        labels={{heading:["This is called", "this is also called"]}}
                        onRequestClose={this.hideModal}
                        size="large">
                        <Card
                            filter={
                                (!isEmpty || this.state.isFiltering) && (
                                    <CardFilter onChange={this.handleFilterChange} />
                                )
                            }
                            headerActions={(
                            <Link to="/create-activity">
                                <Tooltip content="Add New Activity" align="bottom right">
                                <Button>
                                <Icon  assistiveText={{ icon: 'New' }} category="utility" name="new" size="x-small"/>
                                </Button></Tooltip>
                            </Link>)}

                            heading="Releated Items"
                            icon={<Icon category="standard" name="document" size="small" />}
                            empty={
                                isEmpty ? (
                                    <CardEmpty heading="No Related Items">
                                        <Button label="Add Item" onClick={this.handleAddItem} />
                                    </CardEmpty>
                                ) : null
                            }
                        ><section className="slds-p-around_large">
                            <ModalTableContainer>
                                <DataTable
                                    items={this.state.eventsOnModal}
                                    selectable={false}
                                    onClick={this.handleRowClicked}
                                    showCheckboxes={false}
                                    onCellClick={this.handleRowClicked}
                                    fixedLayout
                                >
                                {columns}
                                <DataTableRowActions
                                    options={[
                                    {
                                        id: 3,
                                        label: "View",
                                        value: "4",
                                    },
                                    {
                                        id: 0,
                                        label: "Edit",
                                        value: "1",
                                    },
                                    {
                                        id: 1,
                                        label: "Delete",
                                        value: "2",
                                    },
                                    {
                                        id: 2,
                                        label: "Clone",
                                        value: "3",
                                    },
                                    ]}
                                    menuPosition="overflowBoundaryElement"
                                    onAction={this.handleRowAction}
                                    dropdown={<Dropdown length="7" />}
                                />
                                </DataTable>
                            </ModalTableContainer></section>

                        </Card>
                    </Modal>}
            <Calendar localizer={localizer}
                events={this.state.events}
                views={['month','week']}
                defaultDate={this.state.currentDate}
                startAccessor="start"
                endAccessor="end"
                step={60}
                onNavigate={this.onNavigate}
                onView={this.onView}
                onSelectEvent={this.handleSelectEvent}
                onSelectSlot={this.handleSelectDay}
                onDrillDown={this.handleDrillDown}
                eventPropGetter={(this.eventStyleGetter)}
                selectable
            /></CalendarContainer>
        );
    }

}

let mapState = ({ dataTable }) => ({
    dataTable,
  });

export default withRouter(connect(mapState, { setItem })(ActivityCalendar));