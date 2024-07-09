import DatePicker from "react-datepicker";
import { DataPickerInput, DatePickerContainer } from "../css/input";

interface Props {
  value: Date;
  onChange: (date: Date) => void;
}

/**
 * 날짜 하나를 선택할 수 있게 해주는 컴포넌트 입니다.
 * 날짜값 변수(value)와 선택되었을 때 값을 바꾸어주는 함수(onChange)를 넘겨야 합니다.
 */

const DatePickerOne = ({ value, onChange }: Props) => {
  return (
    <>
      <DatePickerContainer>
        <DatePicker
          selected={value}
          onChange={date => onChange(date || new Date())}
          selectsStart
          dateFormat="YYYY.MM.dd"
          customInput={<DataPickerInput />}
        />
      </DatePickerContainer>
    </>
  );
};

export default DatePickerOne;
