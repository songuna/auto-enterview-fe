import styled from "styled-components";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { JobPosting } from "../type/jobPosting";
import { postCompaniesJobPosting } from "../axios/http/jobPosting";
import { useNavigate } from "react-router-dom";
import { getTwoDigit } from "../common/Format";
import DatePickerDuration from "../input/DatePickerDuration";
import SelectInput from "../input/SelectInput";
import { InputDefault } from "../css/input";
import Checkbox from "../input/Checkbox";
import TimePicker from "../input/TimePicker";

const CreateJobPost = () => {
  //enum
  const optionJob = [
    { value: "backend", label: "서버/백엔드 개발" },
    { value: "frontend", label: "프론트엔드 개발" },
    { value: "fullstack", label: "웹 풀스택 개발" },
    { value: "android", label: "안드로이드 개발" },
    { value: "ios", label: "iOS 개발" },
  ];

  const optionEducation = [
    { value: "no", label: "학력무관" },
    { value: "middle", label: "중졸 이하" },
    { value: "high", label: "고졸" },
    { value: "associate", label: "대학 2,3년제" },
    { value: "bachelor", label: "대학 4년제" },
    { value: "master", label: "석사" },
    { value: "doctor", label: "박사" },
  ];

  const optionEmploymentType = [
    { value: "intern", label: "인턴직" },
    { value: "contract", label: "계약직" },
    { value: "regular", label: "정규직" },
  ];

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

  //form
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm();

  // 필요경력, 급여같은 input에서 disable될 때 임시로 저장해두는 값
  const inputMemory = useRef({ career: 0, salary: 0 });
  const [freeHour, setFreeHour] = useState(false);

  const [formData, setFormData] = useState({
    jobCategory: "",
    title: "",
    career: 0,
    teckstack: [],
    workLocation: "",
    education: "",
    employmentType: "",
    salary: 0,
    startHour: new Date(2024, 7, 13, 9, 0),
    endHour: new Date(2024, 7, 13, 18, 0),
    startDate: new Date(),
    endDate: new Date(),
    jobPostingSteps: [],
    jobPostingContent: "",
  });

  //전형절차단계
  //추가
  const [addStepValue, setAddStepValue] = useState("");
  const addStep = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    if (addStepValue === "") return;

    setFormData(formData => {
      return {
        ...formData,
        jobPostingSteps: [...formData.jobPostingSteps, addStepValue],
      };
    });
    setAddStepValue("");
  };
  //삭제
  const deleteStep = (idx: number) => {
    const temp = [...formData.jobPostingSteps];
    temp.splice(idx, 1);

    setFormData({ ...formData, jobPostingSteps: temp });
  };

  //파일업로드
  const [fileName, setFileName] = useState("");
  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.split("\\");
    setFileName(value[value.length - 1]);
  };

  const getStringWorkingHour = (startTime: Date, endTime: Date) => {
    return `${getTwoDigit(startTime.getHours())}:${getTwoDigit(startTime.getMinutes())} ~ ${getTwoDigit(endTime.getHours())}:${getTwoDigit(endTime.getMinutes())}`;
  };

  // 채용공고생성 api
  const navigate = useNavigate();

  const onSubmit = async (formData: any) => {
    const requestData: JobPosting = {
      title: formData.title,
      jobCategory: formData.jobCategory,
      career: +formData.career,
      techStack: formData.teckStack,
      jobPostingStep: formData.jobPostingSteps,
      workLocation: formData.workLocation,
      education: formData.education,
      employmentType: formData.employmentType,
      salary: formData.salary,
      workTime: freeHour
        ? "자율출근제"
        : getStringWorkingHour(formData.startHour, formData.endHour),
      startDateTime: formData.startDateTime,
      endDateTime: formData.endDateTime,
      jobPostingContent: formData.jobPostingContent,
      image: {
        fileName: fileName,
        originalFileName: fileName,
        filePath: fileName,
      },
    };

    await postCompaniesJobPosting(1, requestData);
    navigate("/company-mypage");
  };

  return (
    <>
      <Helmet>
        <title>채용공고 생성</title>
      </Helmet>
      <Wrapper className="inner-1200">
        <Title>채용공고 생성</Title>
        <form onSubmit={onSubmit}>
          <InputContainer>
            <InputTitle>채용직무</InputTitle>
            <SelectInput
              placeholder="채용할 직무를 선택하세요"
              options={[
                { value: "backend", label: "서버/백엔드 개발" },
                { value: "frontend", label: "프론트엔드 개발" },
                { value: "fullstack", label: "웹 풀스택 개발" },
                { value: "android", label: "안드로이드 개발" },
                { value: "ios", label: "iOS 개발" },
              ]}
              value={formData.jobCategory}
              onChange={value =>
                setFormData({ ...formData, jobCategory: value })
              }
            />
            <ErrorMessage>
              {formData.jobCategory ? "" : "채용할 직무를 선택해주세요."}
            </ErrorMessage>
          </InputContainer>
          <InputContainer>
            <InputTitle>제목</InputTitle>
            <InputDefault
              type="text"
              placeholder="공고 제목을 입력하세요"
              value={formData.title}
              onChange={e =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <ErrorMessage>
              {formData.title ? "" : "공고 제목을 입력해주세요."}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <InputTitle>필요경력</InputTitle>
            <InputContents>
              <InputShortText
                type="number"
                placeholder="신입은 0"
                className="text"
                value={formData.career}
                onChange={event => {
                  setFormData({
                    ...formData,
                    career: Number(event.target.value),
                  });
                  inputMemory.current.career = Number(event.target.value);
                }}
                disabled={formData.career == -1}
              />
              <AdditionExplanation>년 이상</AdditionExplanation>
              <Checkbox
                id={"career-year"}
                text="경력무관"
                onChange={event => {
                  setFormData({
                    ...formData,
                    career: event.target.checked
                      ? -1
                      : inputMemory.current.career,
                  });
                }}
              />
            </InputContents>
            <ErrorMessage>
              {formData.career ? "" : "필요경력을 입력해주세요."}
            </ErrorMessage>
          </InputContainer>

          <InputContainerShortMargin>
            <InputTitle>기술스택</InputTitle>

            <StackInputContainer>
              {teckStacks.map(stack => {
                return (
                  <StackInputGroup key={stack}>
                    <Checkbox
                      id={stack}
                      text={stack}
                      onChange={event => {
                        if (event.target.checked) {
                          // 체크하면 추가
                          const temp = formData.teckstack;
                          temp.push(stack);
                          setFormData({ ...formData, teckstack: temp });
                        } else {
                          //해제하면 빼기
                          const temp = [...formData.teckstack];
                          const result = temp.filter(el => el !== stack);
                          setFormData({ ...formData, teckstack: result });
                        }
                      }}
                    />
                  </StackInputGroup>
                );
              })}
            </StackInputContainer>
            <ErrorMessage>
              {formData.teckstack ? "" : "테크스택을 1개이상 선택해주세요."}
            </ErrorMessage>
          </InputContainerShortMargin>

          <InputContainer>
            <InputTitle>근무지</InputTitle>
            <InputDefault
              type="text"
              placeholder="주소를 입력하세요"
              className="text"
              value={formData.workLocation}
              onChange={event =>
                setFormData({ ...formData, workLocation: event.target.value })
              }
            />
            <ErrorMessage>
              {formData.workLocation ? "" : "근무지를 입력해주세요."}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <InputTitle>필요학력</InputTitle>
            <SelectInput
              options={optionEducation}
              placeholder="필요한 학력을 선택하세요"
              value={formData.education}
              onChange={value => setFormData({ ...formData, education: value })}
            />
            <ErrorMessage>
              {formData.education ? "" : "필요한 학력 입력해주세요."}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <InputTitle>고용형태</InputTitle>
            <SelectInput
              options={optionEmploymentType}
              placeholder="고용형태를 선택하세요"
              value={formData.employmentType}
              onChange={value =>
                setFormData({ ...formData, employmentType: value })
              }
            />
            <ErrorMessage>
              {formData.employmentType ? "" : "고용형태를 선택해주세요."}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <InputTitle>급여</InputTitle>
            <InputContents>
              <>
                <InputShortText
                  type="number"
                  placeholder="연봉"
                  className="text"
                  value={formData.salary}
                  onChange={event => {
                    setFormData({
                      ...formData,
                      salary: Number(event.target.value),
                    });
                    inputMemory.current.salary = Number(event.target.value);
                  }}
                  disabled={formData.salary == -1}
                />
                <AdditionExplanation>만원</AdditionExplanation>
                <Checkbox
                  id="pay"
                  text="회사내규에 따름"
                  onChange={event => {
                    setFormData({
                      ...formData,
                      salary: event.target.checked
                        ? -1
                        : inputMemory.current.salary,
                    });
                  }}
                />
              </>
            </InputContents>
            <ErrorMessage>
              {formData.salary ? "" : "급여를 입력해주세요."}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <InputTitle>근무기간</InputTitle>
            <InputContents>
              <TimePicker
                value={formData.startHour}
                onChange={date => setFormData({ ...formData, startHour: date })}
                disabled={freeHour}
              />
              <p>~</p>
              <TimePicker
                value={formData.endHour}
                onChange={date => setFormData({ ...formData, endHour: date })}
                disabled={freeHour}
              />
              <Checkbox
                id="hourfree"
                text="자율출근제"
                onChange={event => setFreeHour(event.target.checked)}
              />
            </InputContents>
            <ErrorMessage>
              {formData.startHour || formData.startHour
                ? ""
                : "근무시간을 선택해주세요."}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <InputTitle>접수기간</InputTitle>
            <InputContents>
              <DatePickerDuration
                startDate={formData.startDate}
                endDate={formData.endDate}
                onChangeStartDate={date =>
                  setFormData({ ...formData, startDate: date })
                }
                onChangeEndDate={date =>
                  setFormData({ ...formData, endDate: date })
                }
                betweenString="~"
              />
            </InputContents>
            <ErrorMessage>
              {formData.startDate || formData.endDate
                ? ""
                : "접수기간을 선택해주세요."}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <InputTitle>전형절차</InputTitle>
            <InputContents>
              <StepContainer>
                {formData.jobPostingSteps.map((jobPostingStep, idx) => {
                  return (
                    <Step key={`${jobPostingStep} ${idx}`}>
                      <StepNumber>{idx + 1}단계</StepNumber>
                      {jobPostingStep}
                      {idx >= 1 && (
                        <StepDelete onClick={() => deleteStep(idx)}>
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
                      )}
                    </Step>
                  );
                })}
              </StepContainer>
              <StepInputContianer>
                <StepInput
                  type="text"
                  placeholder="예) 1차 면접"
                  className="text"
                  value={addStepValue}
                  onChange={event => setAddStepValue(event.target.value)}
                  onKeyDown={event => event.key === "Enter" && addStep(event)}
                />
                <Button type="button" className="text" onClick={addStep}>
                  단계추가
                </Button>
              </StepInputContianer>
            </InputContents>
            <ErrorMessage>
              {formData.jobPostingSteps.length > 1
                ? ""
                : "전형단계를 추가해주세요."}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <TitleContainer>
              <InputTitle>공고내용</InputTitle>
              <Info className="text-sm">
                **텍스트와 이미지 둘 다 작성시, 이미지는 맨 하단에 추가됩니다.
              </Info>
            </TitleContainer>
            <Contents
              placeholder="공고내용을 입력해주세요."
              className="text"
              value={formData.jobPostingContent}
              onChange={event =>
                setFormData({
                  ...formData,
                  jobPostingContent: event.target.value,
                })
              }
            />
            <FileContainer>
              <FileName>{fileName || ""}</FileName>
              <FileInput type="file" id="image" onChange={uploadFile} />
              <label htmlFor="image">이미지 업로드</label>
            </FileContainer>
          </InputContainer>
          <SubmitButton type="submit" className="sub-title" />
        </form>
      </Wrapper>
    </>
  );
};

const ErrorMessage = styled.div`
  padding: 8px;
  color: var(--color-red);
`;

const Title = styled.h2`
  margin-top: 120px;
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  padding: 0 24px;
  padding-bottom: 120px;
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

const InputShortText = styled(InputDefault)`
  width: 150px;
  flex: 0;
  text-align: end;
`;

const AdditionExplanation = styled.p`
  margin: auto 8px;
`;

const StackInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StackInputGroup = styled.div`
  display: block;

  label {
    margin-right: 16px;
    margin-bottom: 16px;
  }
`;

const StepContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
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
const StepInput = styled(InputDefault)`
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

const SubmitButton = styled.input`
  margin-top: 100px;
  padding: 16px;
  width: 100%;
  color: #ffffff;
  border: 0;
  border-radius: var(--button-radius);
  background-color: var(--primary-color);
  cursor: pointer;
`;

export default CreateJobPost;
