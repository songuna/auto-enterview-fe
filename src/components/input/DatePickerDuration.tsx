import DatePicker from "react-datepicker";
import styled from "styled-components";

/**
 * 날짜 기간을 선택할 수 있게 해주는 컴포넌트 입니다.
 * 시작 날짜와 끝나는 날짜, 그리고 선택되었을 때 값을 바꾸어주는 함수를 넘겨야 합니다.
 */

interface Props {
  startDate: Date;
  onChangeStartDate: (date: Date) => void;
  endDate: Date;
  onChangeEndDate: (date: Date) => void;
  betweenString?: string;
}

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

const DataPickerInput = styled.input`
  display: inline-block;
  padding: 16px;
  width: 100%;
  text-align: center;
  border: 1px solid #b7b7b7;
  border-radius: 8px;
  cursor: pointer;
  word-break: keep-all;
  font-size: 1rem;

  &:disabled {
    border: 1px solid var(--bg-light-gray);
    color: var(--bg-light-gray);
    background-color: #f8f8f8;
  }
`;

const DatePickerContainer = styled.div`
  position: relative;
  width: 150px;

  .react-datepicker-popper {
    z-index: 2;

    position: relative;
    background-color: #ffffff;
    border: 1px solid #b7b7b7;
    border-radius: var(--button-radius);
  }

  &:nth-child(1) .react-datepicker-popper {
    transform: translate(0, -300px) !important;
  }

  &:nth-child(3) .react-datepicker-popper {
    transform: translate(-137px, -300px) !important;
  }

  .react-datepicker__aria-live {
    display: none;
  }

  .react-datepicker {
    width: 100%;
  }

  .react-datepicker__navigation {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      display: none;
    }

    &::after {
      content: "";
      position: relative;
      width: 24px;
      height: 24px;
      background: url("/img/arrow.svg") no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
  .react-datepicker__navigation--previous {
    &::after {
      transform: rotate(180deg);
    }
  }

  .react-datepicker__navigation--next {
    left: auto;
    right: 8px;
  }

  .react-datepicker__month-container {
    padding: 8px;
  }

  .react-datepicker__current-month {
    text-align: center;
    line-height: 48px;
    font-size: 1.3rem;
  }

  .react-datepicker__day-names {
    display: flex;

    .react-datepicker__day-name {
      flex: 1;
      width: 2.4rem;
      text-align: center;
      line-height: 2rem;
      user-select: none;
    }
  }

  .react-datepicker__navigation {
    position: absolute;
  }

  .react-datepicker__week {
    display: flex;
  }

  .react-datepicker__day {
    width: 2.4rem;
    text-align: center;
    line-height: 2.4rem;
    cursor: pointer;

    &.react-datepicker__day--today {
      font-weight: 700;
    }

    &:hover {
      color: #ffffff;
      background-color: var(--primary-color);
    }

    &.react-datepicker__day--range {
      background-color: var(--border-gray-100);
    }

    &.react-datepicker__day--in-selecting-range {
      color: var(--text-black);
      background-color: #eff5ff;
    }

    &.react-datepicker__day--in-range {
      color: var(--text-black);
      background-color: var(--bg-light-gray);
    }

    &[aria-selected="true"] {
      color: #ffffff;
      background-color: var(--primary-color);
    }

    &.react-datepicker__day--in-range:not(.react-datepicker__day--in-selecting-range) {
      color: var(--text-black);
      background-color: var(--bg-light-blue);
    }
  }

  .react-datepicker__triangle {
    display: none;
  }
`;

export default DatePickerDuration;
