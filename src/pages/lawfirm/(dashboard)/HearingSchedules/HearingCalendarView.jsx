import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const HearingCalendarView = ({ hearings }) => {
  const localizer = momentLocalizer(moment);

  const events = hearings.map((hearing) => ({
    title: `${hearing.client.name} - ${hearing.client.caseType}`,
    start: new Date(hearing.dateTime),
    end: new Date(hearing.dateTimeEnd),
  }));

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

export default HearingCalendarView;
