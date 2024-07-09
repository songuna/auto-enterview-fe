import DatePicker from "react-datepicker";
import { DataPickerInput, DatePickerContainer } from "../css/input";

/**
 * 날짜 하나를 선택할 수 있게 해주는 컴포넌트 입니다.
 * 날짜변수와 선택되었을 때 값을 바꾸어주는 함수를 넘겨야 합니다.
 */

interface Props {
  value: Date;
  onChange: (date: Date) => void;
}

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
