import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const MyEvents: React.FC = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from your API or set default events
    const initialEvents = [
      {
        id: "1",
        title: "Event 1",
        start: "2023-01-01T10:00:00",
        end: "2023-01-01T12:00:00",
        backgroundColor: "green", // Change any other color to green
        borderColor: "red", // Set border color to red
      },
    ];

    setEvents(initialEvents);
  }, []);

  const handleDateClick = (info) => {
    // alert("Clicked on: " + info.dateStr);
    // alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
    // alert("Current view: " + info.view.type);
  };

  return (
    <div className="border-[1px] border-[#464B62] w-full h-full rounded-lg p-4">
      <h1 className="text-2xl font-semibold p-2">Events</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dateClick={(info) => handleDateClick(info)}
        events={[
          { title: "event 1", date: "2023-11-01" },
          { title: "event 2", date: "2023-11-02" },
        ]}
        height={500}
      />
    </div>
  );
};

export default MyEvents;
