import styled from "styled-components";
import { DataPickerInput } from "../css/input";
import DatePicker from "react-datepicker";
import { Placement } from "./DatePickerOne";

interface Props {
  value: Date;
  onChange: (date: Date) => void;
  disabled?: boolean;
  popperPlacement?: Placement;
}

const TimePicker = ({
  value,
  onChange,
  disabled,
  popperPlacement = "bottom",
}: Props) => {
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
        popperPlacement={popperPlacement}
      />
    </TimePickerContainer>
  );
};

const TimePickerContainer = styled.div`
  position: relative;
  width: 100px;
  z-index: 10;

  .react-datepicker-popper {
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #b7b7b7;
    border-radius: var(--button-radius);
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
    width: 100%;
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
