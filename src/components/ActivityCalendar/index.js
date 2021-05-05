import "./styles.css";
import React, { Component,} from "react";
import { withRouter } from 'react-router-dom';
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import moment from 'moment';
import {ModalTableContainer, CalendarContainer } from './styles';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Card, CardFilter, Icon, CardEmpty, Button, DataTable, DataTableColumn, DataTableRowActions, Dropdown} from "@salesforce/design-system-react";
import EditModal from "../EditActivityModal";
import CloneModal from "../CloneActivityModal";

moment.locale('en-GB');
const localizer = momentLocalizer(moment)
const columns =[
    <DataTableColumn 
        key="userId"
        label="Owner"
        property="userId"
        width="8em"
    />,
    <DataTableColumn 
        key="title"
        label="Title"
        property="title"
        width="6em"
    />,
    <DataTableColumn 
        key="abstract"
        label="Abstract"
        property="abstract"
        width="16em"
    />,
    <DataTableColumn 
        key="formatId"
        label="Format"
        property="formatId"
        width="16em"
    />,
    <DataTableColumn 
        key="programId"
        label="Program"
        property="programId"
        width="8em"
    />,
    <DataTableColumn 
        key="regionId"
        label="Region"
        property="regionId"
        width="4em"
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
            toast:{
                show:false
            }
        }
    }
    componentDidMount() {
        console.log('Inside update')
        this.state.data = this.props.activities
        this.computeDisplayedDateRange();
        console.log(this.state.data)
    }
    computeDisplayedDateRange = () => {
        const {currentDate, currentView} = this.state;
        let start = moment(currentDate).startOf(currentView);
        let end = moment(currentDate).endOf(currentView);
      if(currentView === 'month') {
          start = start.startOf('week');
          end = end.endOf('week');
      }
      let startDate = new Date(start.toString())
      let endDate = new Date(end.toString())
      console.log(this.state.data)
      
      this.state.displayedData = this.state.data.filter(a => {
          var date = new Date(a.startDate)
          return (date >= startDate && date <= endDate)
      });
      const finalEvents = []
      this.state.displayedData.forEach(e => {
          console.log(e.title)
        finalEvents.push({title:e.title, start:new Date(e.startDate), end:new Date(e.startDate), allDay:false, resource:{data:e}})
      })
      this.state.events = finalEvents
      console.log(this.state.events)
      this.setState({displayedDateRage:{start:start.toString(), end:end.toString()}})
    }
    onNavigate = async (date) => {
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
        console.log(event.resource.data)
        var modalActivities = event.resource.data
        this.setState({eventsOnModal:[modalActivities]})

        this.setState({toast:{show:true}})
    }

    toggleOpen = state => {
        console.log(state)
        this.setState({ [state]: !this.state[state] });
    };

    onToast = (show, message, variant) => {
        this.setState({ toast: { show, message, variant } });
    };

    handleRowClicked = (row, e) => {
        console.log('thisois i aosidjf')        
    }
    handleFilterChange = (event) => {
        console.log(event.target.value)
    }
    handleRowAction = (item, { id }) => {
        console.log('actino')
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
              this.setState({editItem:item})
              this.toggleOpen("detailModalIsOpen");
              break;
            default:
              break;
          }
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
                    />
                    )}
                    {this.state.editModalIsOPen && (
                        <EditModal
                            data={this.state.editItem}
                            onToast={this.onToast}
                            toggleOpen={this.toggleOpen}
                            reloadActivities={this.state.editItem}
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
                            heading="Releated Items"
                            icon={<Icon category="standard" name="document" size="small" />}
                            empty={
                                isEmpty ? (
                                    <CardEmpty heading="No Related Items">
                                        <Button label="Add Item" onClick={this.handleAddItem} />
                                    </CardEmpty>
                                ) : null
                            }
                        >
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
                            </ModalTableContainer>

                        </Card>
                    </Modal>}
            <Calendar localizer={localizer}
                events={this.state.events}
                views={['month']}
                defaultDate={this.state.currentDate}
                startAccessor="start"
                endAccessor="end"
                step={60}
                onNavigate={this.onNavigate}
                onView={this.onView}
                onSelectEvent={this.handleSelectEvent}
                onSelectSlot={this.handleSelectDay}
                onDrillDown={this.handleDrillDown}
                selectable
            /></CalendarContainer>
        );
    }

}

export default withRouter(ActivityCalendar);