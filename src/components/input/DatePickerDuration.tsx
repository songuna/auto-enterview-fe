import DatePicker, { registerLocale } from "react-datepicker";
import { DataPickerInput, DatePickerContainer } from "../../assets/style/input";
import { Placement } from "./DatePickerOne";
import { ko } from "date-fns/locale";
import styled from "styled-components";

registerLocale("ko", ko);

interface Props {
  startDate: Date;
  onChangeStartDate: (date: Date) => void;
  endDate: Date;
  onChangeEndDate: (date: Date) => void;
  betweenString?: string;
  popperPlacement?: Placement;
}

/**
 * 날짜 기간을 선택할 수 있게 해주는 컴포넌트 입니다.
 * 시작 날짜(startDate)와 끝나는 날짜(endDate), 그리고 선택되었을 때 값을 바꾸어주는 함수(onChangeStartDate, onChangeEndDate)를 넘겨야 합니다.
 */

const DatePickerDuration = ({
  startDate,
  onChangeStartDate,
  endDate,
  onChangeEndDate,
  betweenString,
  popperPlacement = "bottom",
}: Props) => {
  return (
    <>
      <DatePickerContainer>
        <DatePicker
          locale="ko"
          selected={startDate}
          onChange={date => onChangeStartDate(date || new Date())}
          selectsStart
          dateFormat="YYYY.MM.dd"
          customInput={<DataPickerInput />}
          popperPlacement={popperPlacement}
          startDate={startDate}
          endDate={endDate}
          showMonthDropdown
          showYearDropdown
          yearDropdownItemNumber={100}
        />
      </DatePickerContainer>
      {betweenString && <BetweenString>{betweenString}</BetweenString>}
      <DatePickerContainer>
        <DatePicker
          locale="ko"
          selected={endDate}
          onChange={date => onChangeEndDate(date || new Date())}
          selectsEnd
          dateFormat="YYYY.MM.dd"
          customInput={<DataPickerInput />}
          startDate={startDate}
          endDate={endDate}
          showMonthDropdown
          showYearDropdown
          yearDropdownItemNumber={100}
        />
      </DatePickerContainer>
    </>
  );
};

const BetweenString = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;

export default DatePickerDuration;
