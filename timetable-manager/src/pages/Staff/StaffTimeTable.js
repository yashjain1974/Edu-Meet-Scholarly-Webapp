import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { red,amber } from '@mui/material/colors';
import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';



import { appointments } from './Resources/appointments';

const submitOrderHandler = async (day,time,userData) => {
  try {
    
    const response = await fetch(
      `https://userdetails-d84c5-default-rtdb.firebaseio.com/staff/-ND-W7QSbcPJme6zVAqn/timeTable/${day}/${time}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(userData),
      }
    );
    if (!response.ok) {
      throw new Error("Unable to Order...");
    }
    

  } catch (error) {
    
  }
};
const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label
        text="Custom Field"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Custom field"
      />
    </AppointmentForm.BasicLayout>
  );
};


export default class Rough extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      resources: [
        {
          fieldName: 'roomId',
          title: 'Slot Book',
          instances:[{
            text: 'Book the slot',
            id: 1,
            color:red,
            
          },
        {
            text: 'For meet',
            id: 2,
            color:amber,
            
            
          },
        ]
        }]
      
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        console.log(added)
        const day=added.endDate.getDay();
        const entime=added.endDate.getHours();
        const stime=added.startDate.getHours();
        const timee=`${stime}-${entime}`
        submitOrderHandler(day,timee,added)
        
        data = [...data, { id: startingAddedId, ...added }];
        
        
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }
  
  render() {
    const { currentDate, data,resources } = this.state;
console.log(data)
    return (
      <Paper>
        
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <EditRecurrenceMenu />
          <WeekView
            startDayHour={8}
            endDayHour={18}
            cellDuration={60}
            showAllDayTitle={false}
            excludedDays={[0]}
          />
          <Appointments />
          
          <AppointmentTooltip
         
            showOpenButton
            showDeleteButton
            
            
          />
          <ConfirmationDialog />
          <AppointmentForm
        
            basicLayoutComponent={BasicLayout}
            textEditorComponent={TextEditor}
          />
           <Resources
            data={resources}
            mainResourceName="roomId"
          />
          
        </Scheduler>
       
      </Paper>
      
    );
  }
}
