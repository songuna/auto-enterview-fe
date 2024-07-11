import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { PiPlusThin, PiMinusThin } from "react-icons/pi";
import DatePickerDuration from "../input/DatePickerDuration";
import DatePickerOne from "../input/DatePickerOne";
import SelectInput from "../input/SelectInput";
//import Checkbox from "../input/Checkbox";
import { useState} from 'react';
import { Link } from 'react-router-dom';

 interface Career {
  company: string;
  role: string;
  startDate: Date | null;
  endDate: Date | null;
  }

  interface Experience {
  name: string;
  start: Date | null;
  end: Date | null;
}

interface Qualification {
  name: string;
  date: Date | null;
}

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


  // 이미지 업로드
  const [imgURL, setImgURL] = useState('');
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImgURL(imageURL);
    }
  };
  const handleClickImage = () => {
    // 클릭 시 input 엘리먼트를 클릭하는 방법
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  //성별
  const [gender, setGender] = useState<string>(''); // 성별 상태 추가
  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender); // 성별 선택 시 상태 업데이트
  };

  //파일업로드
  const [fileName, setFileName] = useState("");
  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  };

  // 희망 직무 상태 추가
  const [jobCategory, setJobCategory] = useState<string | null>(null);
  const handleJobChange = (optionJob: any) => {
    setJobCategory(optionJob?.value || null);
  };
  
  // 최종 경력 상태 추가
  const [education, setEducation] = useState<string | null>(null);
  const handleEducationChange = (optionEducation: any) => {
    setEducation(optionEducation?.value || null);
  }; 


  // 경력사항 추가 기능
  const [careerList, setCareerList] = useState<Career[]>([
    { company: "", role: "", startDate: new Date(), endDate: new Date() }
  ]);

  const addCareer = () => {
    const newCareer: Career = { company: "", role: "", startDate: new Date(), endDate: new Date() };
    setCareerList([...careerList, newCareer]);
  };

  const removeCareer = (index: number) => {
    const updatedList = careerList.filter((_, i) => i !== index);
    setCareerList(updatedList);
  };

  // 경험/활동/교육 추가 기능
 const [experiences, setExperiences] = useState<Experience[]>([
    { name: "", start: new Date(), end: new Date() }
  ]);

  const addExperience = () => {
    const newExperience: Experience = { name: "", start: new Date(), end: new Date() };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (index: number) => {
    const updatedList = experiences.filter((_, i) => i !== index);
    setExperiences(updatedList);
  };

  // 자격/어학/수상 추가 기능
   const [qualifications, setQualifications] = useState<Qualification[]>([
    { name: "", date: new Date() }
  ]);

  const addQualification = () => {
    const newQualification: Qualification = { name: "", date: new Date() };
    setQualifications([...qualifications, newQualification]);
  };

  const removeQualification = (index: number) => {
    const updatedList = qualifications.filter((_, i) => i !== index);
    setQualifications(updatedList);
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
          <AllContainer>
          <Image>
            <div onClick={handleClickImage}>
              {imgURL ? ( // imgURL이 존재하면 이미지 표시
                <img src={imgURL} alt="Selected" style={{ width: '200px', height: '250px' }} />) : (
              <LabelName>
                <ImgInput type="file" onChange={handleFileChange} />
              </LabelName>
               )}
            </div>
          </Image>
          <FlexContainer>
            <Label1>이름</Label1>
            <Input className="textBox " type ="text" placeholder="이름을 입력하세요."></Input>
          <Label1>성별</Label1>
          <GenderContainer className="genderCheck">
            <GenderLabel>
              <input type="radio" id="male" name="gender" value="남" checked={gender === '남'}
                onChange={() => handleGenderSelect('남')} />
              <label htmlFor="male"> 남</label>
            </GenderLabel>
            <GenderLabel>
              <input type="radio" id="female" name="gender" value="여" checked={gender === '여'}
                onChange={() => handleGenderSelect('여')} />
              <label htmlFor="female"> 여</label>
            </GenderLabel>
          </GenderContainer>
          <Label1>생년월일</Label1>
          <Input className="textBox" type ="text" placeholder="YYYY.MM.DD"></Input>
          <Label1>전화번호</Label1>
          <Input className="textBox" type ="text" placeholder="전화번호(-)를 입력하세요."></Input>
          <Label1>이메일</Label1>
          <Input className="emailBox" type ="text" placeholder="이메일을 입력하세요."></Input>
          <Label1>주소</Label1>
          <Input className="addressBox" type ="text" placeholder="주소을 입력하세요."></Input>
          </FlexContainer>
          </AllContainer>
          <Line></Line>
        </InputContainer>

        <InputContainer>
          <InputTitle>희망 직무</InputTitle>
            <SelectInput
              placeholder="희망하는 직무를 선택하세요"
              options={[
                { value: "서버/백엔드 개발", label: "서버/백엔드 개발" },
                { value: "프론트엔드 개발", label: "프론트엔드 개발" },
                { value: "웹 풀스택 개발", label: "웹 풀스택 개발" },
                { value: "안드로이드 개발", label: "안드로이드 개발" },
                { value: "iOS 개발", label: "iOS 개발" },
              ]}
              value={jobCategory}
              onChange={handleJobChange}
            />
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
            <SelectInput
              options={optionEducation}
              placeholder="최종 학력을 선택하세요"
              value={education}
              onChange={handleEducationChange}
            />
            <ErrorMessage>{errors.education && String(errors.education?.message)}</ErrorMessage>
            <InputTitle>학교명</InputTitle>
            <Input1 type="text" placeholder="학교명" ></Input1 >
          </InputContainer>
          
          <Label2>경력</Label2>
          {careerList.map((career, index) => (
        <Container key={index}>
          <Input1 type="text" placeholder="회사명" value={career.company} onChange={(e) => {
            const updatedList = [...careerList];
            updatedList[index].company = e.target.value;
            setCareerList(updatedList);
          }} />
          <Input1 type="text" placeholder="담당업무" value={career.role} onChange={(e) => {
            const updatedList = [...careerList];
            updatedList[index].role = e.target.value;
            setCareerList(updatedList);
          }} />
          <DatePickerDuration
                startDate={career.startDate}
                endDate={career.endDate}
                onChangeStartDate={(date) => {
                  const updatedCareerList = [...careerList];
                  updatedCareerList[index].startDate = date;
                  setCareerList(updatedCareerList);
                }}
                onChangeEndDate={(date) => {
                  const updatedCareerList = [...careerList];
                  updatedCareerList[index].endDate = date;
                  setCareerList(updatedCareerList);
                }}
                betweenString=" ~ "
              />
          {index === careerList.length - 1 && (
            <PlusIcon onClick={addCareer}>
              <PiPlusThin size={20} color="#B7B7B7" />
            </PlusIcon>
          )}
          {index !== careerList.length - 1 && (
            <MinusIcon onClick={() => removeCareer(index)}>
              <PiMinusThin size={20} color="#B7B7B7" />
            </MinusIcon>
          )}
        </Container>
      ))}
          
          <Label2>경험/활동/교육</Label2>
          {experiences.map((experience, index) => (
        <Container key={index}>
          <Input1 type="text" placeholder="경험/활동/교육" value={experience.name} onChange={(e) => {
              const updatedList = [...experiences];
              updatedList[index].name = e.target.value;
              setExperiences(updatedList);
            }}
          />
          <DatePickerDuration
                startDate={experience.start}
                endDate={experience.end}
                onChangeStartDate={(date) => {
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index].start = date;
                  setExperiences(updatedExperiences);
                }}
                onChangeEndDate={(date) => {
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index].end = date;
                  setExperiences(updatedExperiences);
                }}
                betweenString=" ~ "
                dateFormat="YYYY.MM.dd"
              />
          {index === experiences.length - 1 && (
            <PlusIcon onClick={addExperience}>
              <PiPlusThin size={20} color="#B7B7B7" />
            </PlusIcon>
          )}
          {index !== experiences.length - 1 && (
            <MinusIcon onClick={() => removeExperience(index)}>
              <PiMinusThin size={20} color="#B7B7B7" />
            </MinusIcon>
          )}
        </Container>
      ))}
          
          <Label2>자격/어학/수상</Label2>
          {qualifications.map((qualification, index) => (
        <Container key={index}>
          <Input1
            type="text"
            placeholder="자격/어학/수상"
            value={qualification.name}
            onChange={(e) => {
              const updatedList = [...qualifications];
              updatedList[index].name = e.target.value;
              setQualifications(updatedList);
            }}
          />
          <DatePickerOne
            value={qualification.date}
            onChange={(date: Date | null) => {
            const updatedList = [...qualifications];
            updatedList[index].date = date;
            setQualifications(updatedList);
            }}
          />
          {index === qualifications.length - 1 && (
            <PlusIcon onClick={addQualification}>
              <PiPlusThin size={20} color="#B7B7B7" />
            </PlusIcon>
          )}
          {index !== qualifications.length - 1 && (
            <MinusIcon onClick={() => removeQualification(index)}>
              <PiMinusThin size={20} color="#B7B7B7" />
            </MinusIcon>
          )}
        </Container>
        ))}
          
          <Label2>포트폴리오</Label2>
          <FileContainer>
            <FileName>{fileName || ""}</FileName>
            <FileInput type="file" id="file" placeholder="" onChange={uploadFile} />
            <label htmlFor="file">파일 업로드</label>
          </FileContainer>

          <Container className="resumeBtn">
          <ViewLink to="/view-resume/:candidateKey">
            <Button>이력서 등록</Button>
          </ViewLink>
          </Container>
          
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
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  margin-top: 8px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  &.resumeBtn{
    display: flex;
    align-items: center;
  }
`

const FlexContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: flex-end;
  width: 50%;
`

const AllContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Image = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImgInput = styled.input`
  display: block;
  width: 0;
  height: 0;
  overflow: hidden;
`

const LabelName = styled.label`
  display: block;
  color: #B7B7B7;
  background-color: #B7B7B7;
  width: 200px;
  height: 250px;
` 

const GenderContainer = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  gap: 50px;
  margin-left: 60px;
  margin-right: 60px;
    &.genderCheck{
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

const GenderLabel = styled.label`
  margin-left: 20px;
  margin-right: 20px;
`;

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
  margin-bottom: 5px;
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
  padding: 16px;
  margin-right: 20px;
  border: 1px solid #B7B7B7;
  border-radius: 8px;
`

const Line =styled.div`
  border-top: 1px solid #B7B7B7;
  margin: 10px 0px;
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

const PlusIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #B7B7B7;
  border-radius: 5px;
  margin-left: 15px;
`;

const MinusIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;
  border: 1px solid #B7B7B7;
  border-radius: 5px;
  &.minus{
    margin-left: 10px;
  }
`

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
  margin-top: 80px;
`

const Label1 = styled.div`
  width: 70px;
  margin-top: 5px;
`

const Button = styled.button`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #000694;
  background-color: #000694;
  margin-top: 100px;
  color: #ffffff;
  font-size: 15px;
  padding: 12px 45px;
`

const ViewLink= styled(Link)`
  width: 100%;
`

export default CreateResume;
