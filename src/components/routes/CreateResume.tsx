import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { PiPlusThin } from "react-icons/pi";
//import DatePicker from "react-datepicker";
import { useState} from 'react';



const CreateResume = () => {
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

  const {
    control,
    //watch,
    formState: { errors },
  } = useForm();


  //파일업로드
  const [fileName, setFileName] = useState("");
  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.split("\\");
    setFileName(value[value.length - 1]);
  };

  return (
    <>
      <Helmet>
        <title>이력서 작성</title>
      </Helmet>
      <Wrapper className="inner-1200">
        <InputContainer>
          <Title>이력서 작성</Title>
          <Input type ="text" placeholder="한 줄 소개를 작성하세요."></Input>
          <Image></Image>
          <FlexContainer>
          <Label1>이름</Label1>
          <Input className="textBox " type ="text" placeholder="이름을 입력하세요."></Input>
          <Label1>전화번호</Label1>
          <Input className="textBox" type ="text" placeholder="전화번호(-)를 입력하세요."></Input>
          <Label1>생년월일</Label1>
          <Input className="textBox" type ="text" placeholder="YYYY.MM.DD"></Input>
          <Label1>이메일</Label1>
          <Input className="emailBox" type ="text" placeholder="이메일을 입력하세요."></Input>
          <Label1>주소</Label1>
          <Input className="addressBox" type ="text" placeholder="주소을 입력하세요."></Input>
          </FlexContainer>
          <Line></Line>
        
        </InputContainer>

        <InputContainer>
          <InputTitle>희망 직무</InputTitle>
            <Controller
              control={control}
              name="jobCategory"
              rules={{ required: "희망하는 직무를 선택해주세요." }}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  options={optionJob}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? "#000694" : "#B7B7B7",
                      borderRadius: "8px",
                      padding: "6px 5px",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isFocused ? "#000694" : "",
                      color: state.isFocused ? "#ffffff" : "#000000",
                      padding: "8px 13px",
                    }),
                  }}
                  placeholder="희망하는 직무를 선택하세요"
                  ref={ref}
                  value={optionJob.find(option => option.value === value)}
                  onChange={option => onChange(option?.value)}
                />
              )}
            />
            <ErrorMessage>{errors.jobCategory && String(errors.jobCategory?.message)}</ErrorMessage>
        </InputContainer>

        <InputContainer>
        <InputContainerShortMargin>
            <InputTitle>기술스택</InputTitle>
            <Controller
              control={control}
              name="teckStack"
              rules={{ required: "기술스택은 1개이상 선택해주세요." }}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <StackInputContainer>
                  {teckStacks.map(stack => {
                    return (
                      <StackInputGroup key={stack}>
                        <Checkboxs
                          type="checkbox"
                          id={stack}
                          onChange={event => {
                            if (event.target.checked) {
                              // 체크하면 추가
                              onChange([...value, stack]);
                            } else {
                              //해제하면 빼기
                              const temp = value;
                              temp.splice(stack, 1);
                              onChange(temp);
                            }
                          }}
                        />
                        <label htmlFor={stack}>{stack}</label>
                      </StackInputGroup>
                    );
                  })}
                </StackInputContainer>
              )}
            />
            <ErrorMessage> {errors.teckStack && String(errors.teckStack?.message)}</ErrorMessage>
          </InputContainerShortMargin>
          </InputContainer>
          <InputContainer>
            <InputTitle>최종학력</InputTitle>
            <Controller
              control={control}
              name="education"
              rules={{ required: "최종학력을 선택해주세요." }}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  options={optionEducation}
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
                  placeholder="최종 학력을 선택하세요"
                  ref={ref}
                  value={optionEducation.find(option => option.value === value)}
                  onChange={option => onChange(option?.value)}
                />
              )}
            />
            <ErrorMessage>{errors.education && String(errors.education?.message)}</ErrorMessage>
          </InputContainer>

          <Container>
            <Label2>경력</Label2>
            <Input1 type ="text" placeholder="회사명"></Input1>
            <Input1 type ="text" placeholder="담당업무"></Input1>
            <Input1 type ="text" placeholder="입사년도/월"></Input1>
            <Input1 type ="text" placeholder="퇴사년도/월"></Input1>
            <Icon><PiPlusThin size={20} color="#B7B7B7"/></Icon>
          </Container>

          <Container>
            <Label2>경험/활동/교육</Label2>
            <Input1 type ="text" placeholder="경험/활동/교육"></Input1>
            <Input1 type ="text" placeholder="활동시작/월"></Input1>
            <Input1 type ="text" placeholder="활동종료/월"></Input1>
            <Icon><PiPlusThin size={20} color="#B7B7B7"/></Icon>
          </Container>

          <Container>
            <Label2>자격/어학/수상</Label2>
            <Input1 type ="text" placeholder="자격/어학/수상"></Input1>
            <Input1 type ="text" placeholder="취득년도/월"></Input1>
            <Icon><PiPlusThin size={20} color="##B7B7B7"/></Icon>
          </Container>


          <FileContainer>
            <label>포트폴리오</label>
            <FileName>{fileName || ""}</FileName>
            <FileInput type="file" id="image" placeholder="" onChange={uploadFile} />
            <label htmlFor="file">파일 업로드</label>
          </FileContainer>
      </Wrapper>
    </>
    );
};



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

const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  align-items: center;
`

const FlexContainer = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

const Title = styled.h2`
  margin-top: 120px;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: #222222;
  border: none;
  border-bottom: solid #B7B7B7 1px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  position: relative;
  text-align: center;
  &.textBox{
    width: 300px;
    font-size: 15px;
    margin-left: 10px;
  }

  &.addressBox{
    width: 550px;
    font-size: 15px;
    margin-left: 10px;
  }

  &.emailBox{
    width: 350px;
    font-size: 15px;
    margin-left: 10px;
  }
`

const Input1 = styled.input`
  width: 200px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-right: 20px;
  border: 1px solid #B7B7B7;
  border-radius: 8px;
`

const Line =styled.div`
  border-top: 1px solid #B7B7B7;
  margin: 10px 0px;
`

const Image = styled.div`
  
`

const InputTitle = styled.p`
  margin-bottom: 8px;
`;

const ErrorMessage = styled.div`
  padding: 8px;
  color: var(--color-red);
`;

const InputContainerShortMargin = styled(InputContainer)`
  margin-bottom: 16px;
`;

const StackInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StackInputGroup = styled.div`
  display: block;
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

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #B7B7B7;
  border-radius: 5px;
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

const Label2 = styled.div`
  margin-right : 20px;
`

const Label1 = styled.div`
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`

export default CreateResume;
