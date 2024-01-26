import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

type eventDetailType = {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
};

const MyEvents: React.FC = () => {
  const [, setEvents] = useState<eventDetailType[]>();

  useEffect(() => {
    // Fetch events from your API or set default events
    const initialEvents: eventDetailType[] = [
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

  const handleDateClick = () => {
    // alert("Clicked on: " + info.dateStr);
    // alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
    // alert("Current view: " + info.view.type);
  };

  return (
    <div className="h-full w-full rounded-lg border-[1px] border-[#464B62] p-4">
      <h1 className="p-2 text-2xl font-semibold">Events</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dateClick={() => handleDateClick()}
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
