import styled from "styled-components";
import { DataPickerInput } from "../css/input";
import DatePicker from "react-datepicker";

interface Props {
  value: Date;
  onChange: (date: Date) => void;
  disabled?: boolean;
}

const TimePicker = ({ value, onChange, disabled }: Props) => {
  return (
    <TimePickerContainer>
      <DatePicker
        selected={value}
        onChange={date => onChange(date || new Date())}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        dateFormat="HH:mm"
        timeFormat="HH:mm"
        timeCaption=""
        customInput={<DataPickerInput />}
        disabled={disabled}
      />
    </TimePickerContainer>
  );
};

const TimePickerContainer = styled.div`
  position: relative;
  width: 100px;
  z-index: 2;

  .react-datepicker-popper {
    background-color: #ffffff;
    border: 1px solid #b7b7b7;
    border-radius: var(--button-radius);
    transform: translate(0px, -250px) !important;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__time-list {
    height: 250px;
    overflow-y: scroll;
  }

  .react-datepicker__time-list-item {
    list-style: none;
    width: 100px;
    padding: 8px;
    text-align: center;
    cursor: pointer;

    &:hover {
      color: #ffffff;
      background-color: var(--primary-color);
    }

    &[aria-selected="true"] {
      color: #ffffff;
      background-color: var(--primary-color);
    }
  }

  .react-datepicker__aria-live {
    display: none;
  }
`;

export default TimePicker;
