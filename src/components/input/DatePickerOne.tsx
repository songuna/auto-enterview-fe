import DatePicker, { registerLocale } from "react-datepicker";
import { DataPickerInput, DatePickerContainer } from "../css/input";
import { ko } from "date-fns/locale";

registerLocale("ko", ko);

export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";

interface Props {
  value: Date;
  onChange: (date: Date) => void;
  popperPlacement?: Placement;
}

/**
 * 날짜 하나를 선택할 수 있게 해주는 컴포넌트 입니다.
 * 날짜값 변수(value)와 선택되었을 때 값을 바꾸어주는 함수(onChange)를 넘겨야 합니다.
 */

const DatePickerOne = ({ value, onChange, popperPlacement = "bottom" }: Props) => {
  return (
    <>
      <DatePickerContainer>
        <DatePicker
          locale="ko"
          selected={value}
          onChange={date => onChange(date || new Date())}
          selectsStart
          dateFormat="YYYY.MM.dd"
          customInput={<DataPickerInput />}
          popperPlacement={popperPlacement}
          showMonthDropdown
          showYearDropdown
          yearDropdownItemNumber={100}
        />
      </DatePickerContainer>
    </>
  );
};

export default DatePickerOne;
