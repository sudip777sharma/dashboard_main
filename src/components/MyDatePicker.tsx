import { useState, useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const MyDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const datePicker = flatpickr(datePickerRef.current, {
      dateFormat: 'Y-m-d',
      defaultDate: selectedDate, // Set the default date to today
      onChange: (selectedDates: Date[]) => {
        setSelectedDate(selectedDates[0] || null);
      },
    });

    return () => {
      // Cleanup Flatpickr instance on unmount
      datePicker.destroy();
    };
  }, []); // Run this effect only once on mount

  return (
    <div>
      <input
        className=''
        type="text"
        ref={datePickerRef}
        placeholder="Select date"
        readOnly // Making the input readonly to prevent keyboard input
      />
    </div>
  );
};

export default MyDatePicker;
