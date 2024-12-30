import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const AppointmentCalendarView = () => {
  const localizer = momentLocalizer(moment);

  const events = [
    {
      title: "John Doe - Family Dispute Case",
      start: new Date(2024, 8, 5, 14, 0),
      end: new Date(2024, 8, 5, 16, 0),
    },
    {
      title: "John Doe - Family Dispute Case",
      start: new Date(2024, 8, 12, 14, 0),
      end: new Date(2024, 8, 12, 16, 0),
    },
    {
      title: "John Doe - Family Dispute Case",
      start: new Date(2024, 8, 20, 14, 0),
      end: new Date(2024, 8, 20, 16, 0),
    },
  ];

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default AppointmentCalendarView;
