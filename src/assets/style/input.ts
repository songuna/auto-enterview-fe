import styled from "styled-components";

export const InputDefault = styled.input`
  padding: 16px;
  font-size: 1rem;
  background-color: var(--bg-light-gray);
  border: 0;
  border-radius: var(--button-radius);
  flex: 1;

  &:disabled {
    color: var(--bg-light-gray);
    background-color: #f8f8f8;

    &::placeholder {
      color: var(--bg-light-gray);
    }
  }
`;

export const InputCheckbox = styled.input`
  display: none;

  & + label {
    display: inline-block;

    padding: 16px;
    border: 1px solid #b7b7b7;
    border-radius: var(--button-radius);
    cursor: pointer;
    word-break: keep-all;
    transition: all 0.1s;
    user-select: none;

    &:active {
      transform: scale(99%);
    }
  }

  &:checked + label {
    color: #ffffff;
    border: 1px solid var(--primary-color);
    background-color: var(--primary-color);
  }
`;

export const DataPickerInput = styled.input`
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
    border: 1px solid var(--border-gray-100);
    color: var(--border-gray-100);
    background-color: #f8f8f8;
    cursor: auto;
  }
`;

export const DatePickerContainer = styled.div`
  position: relative;
  width: 150px;

  .react-datepicker-popper {
    z-index: 99;
    position: relative;
    background-color: #ffffff;
    border: 1px solid #b7b7b7;
    border-radius: var(--button-radius);
  }

  .react-datepicker__header__dropdown {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    line-height: 48px;
  }

  .react-datepicker__year-read-view,
  .react-datepicker__month-read-view {
    text-align: center;
  }

  .react-datepicker__year-read-view--selected-year,
  .react-datepicker__month-read-view--selected-month {
    cursor: pointer;
  }

  .react-datepicker__navigation.react-datepicker__navigation--years.react-datepicker__navigation--years-previous,
  .react-datepicker__navigation.react-datepicker__navigation--years.react-datepicker__navigation--years-upcoming {
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .react-datepicker__month-dropdown-container,
  .react-datepicker__year-dropdown-container {
    position: relative;
    width: 65px;
    line-height: 48px;
    font-weight: 700;
    font-size: 1.125rem;
  }

  .react-datepicker__month-dropdown,
  .react-datepicker__year-dropdown {
    position: absolute;
    width: 65px;
    left: -50%;
    height: 200px;
    background-color: var(--bg-light-gray);
    border-radius: var(--button-radius);
    transform: translate(50%);
    overflow: scroll;
  }
  .react-datepicker__year-option,
  .react-datepicker__month-option {
    padding: 8px;
    font-size: 0.8rem;
    font-weight: 400;
    text-align: center;
    line-height: 0.8rem;
    cursor: pointer;
    &:hover {
      color: #ffffff;
      background-color: var(--primary-color);
    }
  }
  .react-datepicker__year-option--selected_year,
  .react-datepicker__month-option--selected_month {
    color: #ffffff;
    background-color: var(--primary-color);
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
    background: url("/img/arrow.svg") no-repeat;
    background-size: 24px 24px;
    background-position: center;
    z-index: 20;

    span {
      display: block;
      width: 0;
      height: 0;
      overflow: hidden;
    }
  }
  .react-datepicker__navigation--previous {
    transform: rotate(180deg);
  }

  .react-datepicker__navigation--next {
    left: auto;
    right: 8px;
  }

  .react-datepicker__month-container {
    padding: 8px;
  }

  .react-datepicker__current-month {
    display: block;
    width: 0;
    height: 0;
    overflow: hidden;

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
