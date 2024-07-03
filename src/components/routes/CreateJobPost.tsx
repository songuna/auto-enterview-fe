import styled from "styled-components";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const CreateJobPost = () => {
  const teckStacks = [
    "Java",
    "Spring Boot",
    "Node.js",
    "Python",
    "Django",
    "PHP",
    "C++",
    "C#",
    "AWS",
    "MySQL",
    "Oracle",
    "React",
    "Vue.js",
    "JavaScript",
    "TypeScript",
    "Svelte",
    "HTML5",
    "CSS3",
    "AngularJS",
    "jQuery",
    "Kotlin",
    "RxJava",
    "Swift",
    "Objective-C",
    "Rxswift",
    "SwiftUI",
    "Xcode",
  ];

  const [startHour, setStartHour] = useState<Date | null>(new Date(2024, 7, 13, 9, 0));
  const [endHour, setEndHour] = useState<Date | null>(new Date(2024, 7, 13, 18, 0));

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <>
      <Helmet>
        <title>채용공고 생성</title>
      </Helmet>
      <Wrapper className="inner-1200">
        <Title>채용공고 생성</Title>
        <InputContainer>
          <InputTitle>채용직무</InputTitle>
          <Select
            options={[
              { value: "backend", label: "서버/백엔드 개발" },
              { value: "frontend", label: "프론트엔드 개발" },
              { value: "fullstack", label: "웹 풀스택 개발" },
              { value: "android", label: "안드로이드 개발" },
              { value: "ios", label: "iOS 개발" },
            ]}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#5690FB" : "#B7B7B7",
                borderRadius: "8px",
                padding: "6px 5px",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? "#5690FB" : "",
                color: state.isFocused ? "#ffffff" : "#000000",
                padding: "8px 13px",
              }),
            }}
            placeholder="채용할 직무를 선택하세요"
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>제목</InputTitle>
          <InputText type="text" placeholder="공고 제목을 입력하세요" className="text" />
        </InputContainer>

        <InputContainer>
          <InputTitle>필요경력</InputTitle>
          <InputContents>
            <InputShortText type="number" placeholder="신입은 0" className="text" />
            <AdditionExplanation>년 이상</AdditionExplanation>
            <Checkbox type="checkbox" id="career-year" />
            <label htmlFor="career-year">경력무관</label>
          </InputContents>
        </InputContainer>

        <InputContainerShortMargin>
          <InputTitle>기술스택</InputTitle>
          <StackInputContainer>
            {teckStacks.map(stack => {
              return (
                <StackInputGroup key={stack}>
                  <Checkboxs name="stack" type="checkbox" id={stack} />
                  <label htmlFor={stack}>{stack}</label>
                </StackInputGroup>
              );
            })}
          </StackInputContainer>
        </InputContainerShortMargin>
        <InputContainer>
          <InputTitle>주소</InputTitle>
          <InputText type="text" placeholder="주소를 입력하세요" className="text" />
        </InputContainer>
        <InputContainer>
          <InputTitle>필요학력</InputTitle>
          <Select
            options={[
              { value: "no", label: "학력무관" },
              { value: "middle", label: "중졸 이하" },
              { value: "high", label: "고졸" },
              { value: "associate", label: "대학 2,3년제" },
              { value: "bachelor", label: "대학 4년제" },
              { value: "master", label: "석사" },
              { value: "doctor", label: "박사" },
            ]}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#5690FB" : "#B7B7B7",
                borderRadius: "8px",
                padding: "6px 5px",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? "#5690FB" : "",
                color: state.isFocused ? "#ffffff" : "#000000",
                padding: "8px 13px",
              }),
            }}
            placeholder="필요한 학력을 선택하세요"
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>고용형태</InputTitle>
          <Select
            options={[
              { value: "intern", label: "인턴직" },
              { value: "contract", label: "계약직" },
              { value: "regular", label: "정규직" },
            ]}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#5690FB" : "#B7B7B7",
                borderRadius: "8px",
                padding: "6px 5px",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? "#5690FB" : "",
                color: state.isFocused ? "#ffffff" : "#000000",
                padding: "8px 13px",
              }),
            }}
            placeholder="고용형태를 선택하세요"
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>급여</InputTitle>

          <InputContents>
            <InputShortText type="number" placeholder="연봉" className="text" />
            <Checkbox type="checkbox" id="pay" />
            <label htmlFor="pay">회사 내규에 따름</label>
          </InputContents>
        </InputContainer>
        <InputContainer>
          <InputTitle>근무기간</InputTitle>
          <InputContents>
            <TimePickerContainer>
              <DatePicker
                selected={startHour}
                onChange={date => setStartHour(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                timeCaption=""
                customInput={<TimeInput />}
              />
            </TimePickerContainer>
            <p>~</p>
            <TimePickerContainer>
              <DatePicker
                selected={endHour}
                onChange={date => setEndHour(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                timeCaption=""
                customInput={<TimeInput />}
              />
            </TimePickerContainer>

            <Checkbox type="checkbox" id="hourfree" />
            <label htmlFor="hourfree">자율출근제</label>
          </InputContents>
        </InputContainer>
        <InputContainer>
          <InputTitle>접수기간</InputTitle>
          <InputContents>
            <DatePickerContainer>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                dateFormat="YYYY.MM.dd"
                customInput={<DateInput />}
                startDate={startDate || undefined}
                endDate={startDate || undefined}
              />
            </DatePickerContainer>
            <p>~</p>
            <DatePickerContainer>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                dateFormat="YYYY.MM.dd"
                customInput={<DateInput />}
                startDate={startDate || undefined}
                endDate={endDate || undefined}
              />
            </DatePickerContainer>
          </InputContents>
        </InputContainer>
        <InputContainer>
          <InputTitle>전형절차</InputTitle>
          <InputContents>
            <StepContainer>
              <Step>
                <StepNumber>1단계</StepNumber>서류전형
              </Step>
              <Step>
                <StepNumber>2단계</StepNumber>
                과제전형
                <StepDelete>
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8535 12.6463C12.9 12.6927 12.9368 12.7479 12.962 12.8086C12.9871 12.8693 13.0001 12.9343 13.0001 13C13.0001 13.0657 12.9871 13.1308 12.962 13.1915C12.9368 13.2522 12.9 13.3073 12.8535 13.3538C12.8071 13.4002 12.7519 13.4371 12.6912 13.4622C12.6305 13.4874 12.5655 13.5003 12.4998 13.5003C12.4341 13.5003 12.369 13.4874 12.3083 13.4622C12.2476 13.4371 12.1925 13.4002 12.146 13.3538L7.99979 9.20691L3.85354 13.3538C3.75972 13.4476 3.63247 13.5003 3.49979 13.5003C3.36711 13.5003 3.23986 13.4476 3.14604 13.3538C3.05222 13.26 2.99951 13.1327 2.99951 13C2.99951 12.8674 3.05222 12.7401 3.14604 12.6463L7.29291 8.50003L3.14604 4.35378C3.05222 4.25996 2.99951 4.13272 2.99951 4.00003C2.99951 3.86735 3.05222 3.7401 3.14604 3.64628C3.23986 3.55246 3.36711 3.49976 3.49979 3.49976C3.63247 3.49976 3.75972 3.55246 3.85354 3.64628L7.99979 7.79316L12.146 3.64628C12.2399 3.55246 12.3671 3.49976 12.4998 3.49976C12.6325 3.49976 12.7597 3.55246 12.8535 3.64628C12.9474 3.7401 13.0001 3.86735 13.0001 4.00003C13.0001 4.13272 12.9474 4.25996 12.8535 4.35378L8.70666 8.50003L12.8535 12.6463Z"
                      fill="#210909"
                    />
                  </svg>
                </StepDelete>
              </Step>
            </StepContainer>
            <StepInputContianer>
              <StepInput type="text" placeholder="예) 1차 면접" className="text" />
              <Button className="text">단계추가</Button>
            </StepInputContianer>
          </InputContents>
        </InputContainer>
        <InputContainer>
          <TitleContainer>
            <InputTitle>공고내용</InputTitle>
            <Info className="text-sm">
              **텍스트와 이미지 둘 다 작성시, 이미지는 맨 하단에 추가됩니다.
            </Info>
          </TitleContainer>
          <Contents placeholder="공고내용을 입력해주세요." className="text" />
          <FileContainer>
            <FileName>&nbsp;</FileName>
            <FileInput type="file" id="image" />
            <label htmlFor="image">이미지 업로드</label>
          </FileContainer>
        </InputContainer>
      </Wrapper>
    </>
  );
};

const Title = styled.h2`
  margin-top: 120px;
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  padding: 0 24px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const InputContainerShortMargin = styled(InputContainer)`
  margin-bottom: 16px;
`;

const InputTitle = styled.p`
  margin-bottom: 8px;
`;

const InputContents = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const InputText = styled.input`
  padding: 16px;
  background-color: var(--bg-light-gray);
  border: 0;
  border-radius: var(--button-radius);
  flex: 1;
`;

const InputShortText = styled(InputText)`
  width: 150px;
  flex: 0;
  text-align: end;
`;

const AdditionExplanation = styled.p`
  margin: auto 8px;
`;

const Checkbox = styled.input`
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

const Checkboxs = styled(Checkbox)`
  & + label {
    margin: 0;
    margin-right: 16px;
    margin-bottom: 16px;
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
`;

const StackInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StackInputGroup = styled.div`
  display: block;
`;

const TimePickerContainer = styled.div`
  position: relative;
  z-index: 2;

  & {
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
  }
`;

const DatePickerContainer = styled.div`
  position: relative;
  & {
    .react-datepicker-popper {
      z-index: 2;

      position: relative;
      background-color: #ffffff;
      border: 1px solid #b7b7b7;
      border-radius: var(--button-radius);
    }

    &:nth-child(1) .react-datepicker-popper {
      transform: translate(0, -290px) !important;
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
  }
`;

const TimeInput = styled.input`
  display: inline-block;
  width: 100px;
  text-align: center;
  padding: 16px;
  border: 1px solid #b7b7b7;
  border-radius: 8px;
  cursor: pointer;
  word-break: keep-all;
  font-size: 1rem;
`;

const DateInput = styled(TimeInput)`
  width: 150px;
`;

const StepContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StepNumber = styled.p``;

const StepDelete = styled.div`
  cursor: pointer;
`;
const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--border-gray-100);
  border-radius: var(--button-radius);

  &:nth-child(1) {
    color: #969696;
    border: 1px solid var(--border-gray-100);
  }
`;
const StepInputContianer = styled.div`
  display: flex;
  gap: 8px;
`;
const StepInput = styled(InputText)`
  flex: 0;
`;

const Button = styled.button`
  margin: 0;
  padding: 16px;
  line-height: 1rem;
  color: #ffffff;
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: var(--button-radius);

  &:active {
    transform: scale(99%);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Info = styled.div`
  color: #707070;
  margin-bottom: 8px;
`;

const Contents = styled.textarea`
  padding: 16px;
  font-family: "Pretendard";
  border: 1px solid var(--border-gray-100);
  border-radius: var(--button-radius);
  height: 20rem;
  resize: none;
`;

const FileContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 16px;
`;

const FileName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  line-height: 1rem;
  color: #707070;
  border: 1px solid var(--border-gray-100);
  border-radius: var(--button-radius);
`;

const FileInput = styled.input`
  display: none;

  & + label {
    display: inline-block;
    color: #ffffff;
    padding: 16px;
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
    border-radius: var(--button-radius);
    word-break: keep-all;
    transition: all 0.1s;
    cursor: pointer;
    user-select: none;

    &:active {
      transform: scale(99%);
    }
  }
`;

export default CreateJobPost;
