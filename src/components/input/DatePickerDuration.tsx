import DatePicker from "react-datepicker";
import { DataPickerInput, DatePickerContainer } from "../css/input";

interface Props {
  startDate: Date;
  onChangeStartDate: (date: Date) => void;
  endDate: Date;
  onChangeEndDate: (date: Date) => void;
  betweenString?: string;
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
}: Props) => {
  return (
    <>
      <DatePickerContainer>
        <DatePicker
          selected={startDate}
          onChange={date => onChangeStartDate(date || new Date())}
          selectsStart
          dateFormat="YYYY.MM.dd"
          customInput={<DataPickerInput />}
          startDate={startDate}
          endDate={endDate}
        />
      </DatePickerContainer>
      {betweenString && <p>{betweenString}</p>}
      <DatePickerContainer>
        <DatePicker
          selected={endDate}
          onChange={date => onChangeEndDate(date || new Date())}
          selectsEnd
          dateFormat="YYYY.MM.dd"
          customInput={<DataPickerInput />}
          startDate={startDate}
          endDate={endDate}
        />
      </DatePickerContainer>
    </>
  );
};

export default DatePickerDuration;
