import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { PiPlusThin, PiMinusThin } from "react-icons/pi";
import DatePickerDuration from "../components/input/DatePickerDuration";
import DatePickerOne from "../components/input/DatePickerOne";
import SelectInput from "../components/input/SelectInput";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postResume } from "../axios/http/resume";
import { useRecoilValue } from "recoil";
import { authUserState } from "../recoil/store";
import { optionEducation, optionJob, techStacks } from "../constants/options";


interface Career {
  companyName: string;
  jobCategory: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface Experience {
  experienceName: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface Qualification {
  certificateName: string;
  certificateDate: Date | null;
}

const CreateResume = () => {
  //유저
  const authUser = useRecoilValue(authUserState);

  const navigate = useNavigate();

  const {
    control,
    
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      birthDate: "",
      email: "",
      phoneNumber: "",
      address: "",
      schoolName: "",
      teckStack: [],
    },
  });

  
  //포트폴리오
  const [imgURL, setImgURL] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImgURL(imageURL);
    }
  };

  const handleClickImage = () => {
    inputRef.current?.click();
  };

  // 한줄 소개
  const [title, setTitle] = useState("");

  //성별
  const [gender, setGender] = useState<string>("");
  const handleGenderSelect = (selectedGender: string) => setGender(selectedGender);

  const [fileName, setFileName] = useState("");
  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  };
  const handleFileRemove = () => {
    setFileName("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // 희망직무
  const [jobCategory, setJobCategory] = useState<string | null>(null);
  const handleJobChange = (optionJob: string) => setJobCategory(optionJob || null);

  // 교육/경험
  const [education, setEducation] = useState<string | null>(null);
  const handleEducationChange = (optionEducation: string) => setEducation(optionEducation || null);

  //경력
  const [careerList, setCareerList] = useState<Career[]>([
    { companyName: "", jobCategory: "", startDate: new Date(), endDate: new Date() },
  ]);
  const addCareer = () =>
    setCareerList([
      ...careerList,
      { companyName: "", jobCategory: "", startDate: new Date(), endDate: new Date() },
    ]);
  const removeCareer = (index: number) => setCareerList(careerList.filter((_, i) => i !== index));



  const [experiences, setExperiences] = useState<Experience[]>([
    { experienceName: "", startDate: new Date(), endDate: new Date() },
  ]);
  const addExperience = () =>
    setExperiences([
      ...experiences,
      { experienceName: "", startDate: new Date(), endDate: new Date() },
    ]);
  const removeExperience = (index: number) =>
    setExperiences(experiences.filter((_, i) => i !== index));


  // 자격/어학
  const [qualifications, setQualifications] = useState<Qualification[]>([
    { certificateName: "", certificateDate: new Date() },
  ]);
  const addQualification = () =>
    setQualifications([...qualifications, { certificateName: "", certificateDate: new Date() }]);
  const removeQualification = (index: number) =>
    setQualifications(qualifications.filter((_, i) => i !== index));

  const onSubmit = async (data: any) => {
    const ResumeData = {
      title: "",
      jobWant: jobCategory || "",
      name: data.name || "",
      gender: gender || "",
      birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split("T")[0] : "",
      email: data.email || "",
      phoneNumber: data.phoneNumber || "",
      address: data.address || "",
      education: education || "",
      schoolName: data.schoolName || "",
      experience: experiences.map(experiences => ({
        experienceName: experiences.experienceName,
        startDate: experiences.startDate
          ? new Date(experiences.startDate).toISOString().split("T")[0]
          : "",
        endDate: experiences.endDate
          ? new Date(experiences.endDate).toISOString().split("T")[0]
          : "",
      })),
      techStack: data.teckStack || [],
      career: careerList.map(career => ({
        companyName: career.companyName,
        jobCategory: career.jobCategory,
        startDate: career.startDate ? new Date(career.startDate).toISOString().split("T")[0] : "",
        endDate: career.endDate ? new Date(career.endDate).toISOString().split("T")[0] : "",
      })),
      certificates: qualifications.map(qualification => ({
        certificateName: qualification.certificateName,
        certificateDate: qualification.certificateDate
          ? new Date(qualification.certificateDate).toISOString().split("T")[0]
          : "",
      })),
      portfolio: fileName ? `www.github.com/${fileName}` : "",
    };

    console.log(ResumeData);

    try {
      if (!authUser) return;
      const response = await postResume(authUser?.key, ResumeData);
      navigate(`/view-resume/${response.resumeKey}`);
      console.log(response);
    } catch (error) {
      console.error("Error posting resume:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>이력서 작성</title>
      </Helmet>
      <Wrapper className="inner-1200">
        <InputContainer>
          <Title>이력서 작성</Title>
          <Input type="text" placeholder="한 줄 소개를 작성하세요."
          value={title}
          onChange={e => setTitle(e.target.value)}/>
          <AllContainer>
            <Image>
              <div onClick={handleClickImage}>
                {imgURL ? (
                  <img src={imgURL} alt="Selected" style={{ width: "200px", height: "250px" }} />
                ) : (
                  <LabelName>
                    <ImgInput type="file" onChange={handleFileChange} ref={inputRef} />
                  </LabelName>
                )}
                {imgURL && (
                  <ImgInput
                    type="file"
                    onChange={handleFileChange}
                    ref={inputRef}
                    style={{ display: "none" }}
                  />
                )}
              </div>
            </Image>
            <FlexContainer>
              <Label1>이름</Label1>
              <Input
                className="textBox "
                name="name"
                type="text"
                placeholder="이름을 입력하세요."
              ></Input>
              <Label1>성별</Label1>
              <GenderContainer className="genderCheck">
                <GenderLabel>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="남"
                    checked={gender === "남"}
                    onChange={() => handleGenderSelect("남")}
                  />
                  <label htmlFor="male"> 남</label>
                </GenderLabel>
                <GenderLabel>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="여"
                    checked={gender === "여"}
                    onChange={() => handleGenderSelect("여")}
                  />
                  <label htmlFor="female"> 여</label>
                </GenderLabel>
              </GenderContainer>
              <Label1>생년월일</Label1>
              <Input
                className="textBox"
                name="birthDate"
                type="text"
                placeholder="YYYY.MM.DD"
              ></Input>
              <Label1>전화번호</Label1>
              <Input
                className="textBox"
                name="phoneNumber"
                type="text"
                placeholder="전화번호(-)를 입력하세요."
              ></Input>
              <Label1>이메일</Label1>
              <Input
                className="emailBox"
                name="email"
                type="text"
                placeholder="이메일을 입력하세요."
              ></Input>
              <Label1>주소</Label1>
              <Input
                className="addressBox"
                name="address"
                type="text"
                placeholder="주소을 입력하세요."
              ></Input>
            </FlexContainer>
          </AllContainer>
          <Line></Line>
        </InputContainer>

        <InputContainer>
          <InputTitle>희망 직무</InputTitle>
          <SelectInput
            placeholder="희망하는 직무를 선택하세요"
            options={optionJob}
            value={jobCategory || ""}
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
                  {techStacks.map(stack => {
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
            value={education || ""}
            onChange={handleEducationChange}
          />
          <ErrorMessage>{errors.education && String(errors.education?.message)}</ErrorMessage>
          <InputTitle>학교명</InputTitle>
          <Input1 type="text" placeholder="학교명"></Input1>
        </InputContainer>

        <Label2>경력</Label2>
        {careerList.map((career, index) => (
          <Container key={index}>
            <Input1
              type="text"
              placeholder="회사명"
              value={career.companyName}
              onChange={e => {
                const newCareerList = [...careerList];
                newCareerList[index].companyName = e.target.value;
                setCareerList(newCareerList);
              }}
            />
            <Input1
              type="text"
              placeholder="담당업무"
              value={career.jobCategory}
              onChange={(e: any) => {
                const newCareerList = [...careerList];
                newCareerList[index].jobCategory = e.value;
                setCareerList(newCareerList);
              }}
            />
            <DatePickerDuration
              startDate={career.startDate}
              endDate={career.endDate}
              onChange={date => {
                const newCareerList = [...careerList];
                newCareerList[index].startDate = date;
                setCareerList(newCareerList);
              }}
              onChange={date => {
                const newCareerList = [...careerList];
                newCareerList[index].endDate = date;
                setCareerList(newCareerList);
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
            <Input1
              type="text"
              placeholder="경험/활동/교육"
              value={experience.experienceName}
              onChange={e => {
                const newExperienceList = [...experiences];
                newExperienceList[index].experienceName = e.target.value;
                setExperiences(newExperienceList);
              }}
            />
            <DatePickerDuration
              startDate={experience.startDate}
              endDate={experience.endDate}
              onChangeStartDate={date => {
                const updatedExperiences = [...experiences];
                updatedExperiences[index].startDate = date;
                setExperiences(updatedExperiences);
              }}
              onChange={date => {
                const newExperienceList = [...experiences];
                newExperienceList[index].endDate = date;
                setExperiences(newExperienceList);
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
              value={qualification.certificateName}
              onChange={e => {
                const newQualificationList = [...qualifications];
                newQualificationList[index].certificateName = e.target.value;
                setQualifications(newQualificationList);
              }}
            />
            <DatePickerOne
              value={qualification.certificateDate}
              onChange={date => {
                const newQualificationList = [...qualifications];
                newQualificationList[index].certificateDate = date;
                setQualifications(newQualificationList);
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
          <FileName>{fileName || "포트폴리오를 첨부해주세요"}</FileName>
          <FileInput type="file" id="file" placeholder="" onChange={uploadFile} ref={inputRef} />
          <label htmlFor="file"> 파일 업로드</label>
          {fileName && <RemoveButton onClick={handleFileRemove}>파일 삭제</RemoveButton>}
        </FileContainer>

        <Container className="resumeBtn">
          <Button onClick={handleSubmit(onSubmit)}>이력서 등록</Button>
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
  &.resumeBtn {
    display: flex;
    align-items: center;
  }
`;

const FlexContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: flex-end;
  width: 50%;
`;

const AllContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Image = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgInput = styled.input`
  display: block;
  width: 0;
  height: 0;
  overflow: hidden;
`;

const LabelName = styled.label`
  display: block;
  color: #b7b7b7;
  background-color: #b7b7b7;
  width: 200px;
  height: 250px;
  cursor: pointer;
`;

const GenderContainer = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  gap: 50px;
  margin-left: 60px;
  margin-right: 60px;
  &.genderCheck {
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
  border-bottom: solid #b7b7b7 1px;
  margin-bottom: 5px;
  padding-left: 10px;
  position: relative;
  text-align: center;
  &.textBox {
    width: 300px;
    font-size: 15px;
    margin-left: 10px;
  }

  &.addressBox {
    width: 550px;
    font-size: 15px;
    margin-left: 10px;
  }

  &.emailBox {
    width: 350px;
    font-size: 15px;
    margin-left: 10px;
  }
`;

const Input1 = styled.input`
  width: 200px;
  display: flex;
  align-items: center;
  padding: 16px;
  margin-right: 20px;
  border: 1px solid #b7b7b7;
  border-radius: 8px;
`;

const Line = styled.div`
  border-top: 1px solid #b7b7b7;
  margin: 10px 0px;
`;

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
  border: 1px solid #b7b7b7;
  border-radius: 5px;
  margin-left: 15px;
`;

const MinusIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;
  border: 1px solid #b7b7b7;
  border-radius: 5px;
  &.minus {
    margin-left: 10px;
  }
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
  margin-right: 20px;
  margin-top: 80px;
`;

const Label1 = styled.div`
  width: 70px;
  margin-top: 5px;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #000694;
  background-color: #000694;
  margin-top: 100px;
  color: #ffffff;
  font-size: 15px;
  padding: 12px 45px;
`;

const RemoveButton = styled.button`
  color: #e74c3c;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e74c3c;
  border-radius: var(--button-radius);
  word-break: keep-all;
  transition: all 0.1s;
  cursor: pointer;
  user-select: none;

  &:active {
    transform: scale(99%);
  }
`;

const AddButton = styled.button`
  color: #ffffff;
  padding: 16px;
  background-color: #3498db;
  border: 1px solid #3498db;
  border-radius: var(--button-radius);
  word-break: keep-all;
  transition: all 0.1s;
  cursor: pointer;
  user-select: none;

  &:active {
    transform: scale(99%);
  }
`;

export default CreateResume;
