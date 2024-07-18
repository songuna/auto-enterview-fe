import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResume, deleteResume } from '../axios/http/resume'

interface ResumeData {
  title: string;
  name: string;
  gender: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  address: string;
  jobWant: string;
  techStack: string;
  scholarship:string;
  schoolName: string;
  career : string;
  companyName : string;
  startDate : string;
  endDate : string;
  education: { degree: string, schoolName: string };
  certificates : string;
  certificateName : string;
  certificateDate : string;
  experience: string[];
  activities: string[];
  qualifications: string[];
  portfolio: string;
}


const ViewResume: React.FC  = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const navigate = useNavigate();


  // 이력서 삭제버튼 구현
  const handleDelete = async () => {
    if (deleteConfirm) {
      // 이미 확인된 상태에서 더블 클릭 시
      alert('이력서가 이미 삭제되었습니다!');
      return;
    } else {
      // 처음 클릭 시 확인 알림
      if (window.confirm('정말 삭제하시겠습니까?')) {
        try {
          await deleteResume('candidateKey'); 
          alert('이력서가 삭제되었습니다!');
          setDeleteConfirm(true);
          navigate('/user-mypage');
        } catch (error) {
          console.error("삭제 실패:", error);
          alert('이력서 삭제에 실패했습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  // 이력서 불러오기 (조회)
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResume('candidateKey');
        setResumeData(data);
      } catch (error) {
        console.error('이력서 불러오기 실패:', error);
      }
    };

    fetchResume();
  }, []);

  // 이력서 수정버튼 구현
  const handleEdit = () => {
    if (window.confirm('이력서를 수정하시겠습니까?')) {
      navigate('/create-resume');
    }
  };

  return (
    <>
      <Helmet>
        <title>이력서</title>
      </Helmet>
      <Wrapper className="inner-1200">
        <Title>
          이력서
          <Icon>
            <Edit onClick={handleEdit}>
              <MdOutlineEdit size={20} />
            </Edit>
            <Delet onClick={handleDelete}>
              <RiDeleteBin6Line size={20} />
            </Delet>
          </Icon>
        </Title>
        <All>
          <InputContainer>
            <H2 className="inputBox">" 한줄 소개 "</H2>
            <AllContainer>
              <Image></Image>
              <FlexContainer>
                <H3 className="input textBox">{resumeData.name}</H3>
                <H3 className="input textBox">{resumeData.gender}</H3>
                <H3 className="input textBox">{resumeData.birthDate}</H3>
                <H3 className="input textBox">{resumeData.phoneNumber}</H3>
                <H3 className="input emailBox">{resumeData.email}</H3>
                <H3 className="input addressBox">{resumeData.address}</H3>
              </FlexContainer>
            </AllContainer>
            <Line></Line>
          </InputContainer>

          <InputContainer>
            <InputTitle>희망 직무</InputTitle>
            <H3 className="input textBox">{resumeData.jobWant}</H3>
          </InputContainer>

          <InputContainer>
            <InputTitle>기술 스택</InputTitle>
            <H3 className="input textBox">{resumeData.techStack}</H3>
          </InputContainer>

          <InputContainer className="school">
            <InputTitle>최종 학력</InputTitle>
            <H3 className="input textBox">{resumeData.scholarship}</H3>
            <InputTitle className="schoolName">학교명</InputTitle>
            <H3 className="input textBox">{resumeData.schoolName}</H3>
          </InputContainer>

          <InputContainer>
            <InputTitle>경력</InputTitle>
            <Container>
              {resumeData.career.map((exp, index) => (
                <Input1 key={index} value={exp} readOnly />
              ))}
            </Container>
          </InputContainer>

          <InputContainer>
            <InputTitle>경험/활동/교육</InputTitle>
            <Container>
              {resumeData.experience.map((activity, index) => (
                <Input1 key={index} value={activity} readOnly />
              ))}
            </Container>
          </InputContainer>

          <InputContainer>
            <InputTitle>자격/어학/수상</InputTitle>
            <Container>
              {resumeData.certificates.map((certificates, index) => (
                <Input1 key={index} value={certificates} readOnly />
              ))}
            </Container>
          </InputContainer>

          <InputContainer>
            <InputTitle>포트폴리오</InputTitle>
            <Container>
              <H4>URL - {resumeData.portfolio}</H4>
            </Container>
          </InputContainer>
        </All>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  padding: 0 24px;
  padding-bottom: 120px;
`

const All = styled.div`
  border: solid #b7b7b7 5px;
`

const Title = styled.h2`
  width: 100%;
  margin-bottom: 24px;
  margin-top: 150px;
  display: flex;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 20px;
  &.school{
  display: flex;
  flex-direction: row;
  }
  &.schoolName{
    margin-left: 50px;
  }
`;

const AllContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const FlexContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: flex-end;
  width: 50%;
`;

const Image = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.h2`
  width: 100%;
  height: 40px;
  font-size: 30px;
  color: #222222;
  border: none;
  border-bottom: solid #B7B7B7 1px;
  margin-top: 10px;
  margin-bottom: 15px;
  position: relative;
  text-align: center;
`

const H3 = styled.h3`
  width: 70px;
  margin-top: 20px;
  &.input {
    width: 100%;
    height: 40px;
    font-size: 20px;
    color: #222222;
    border: none;
    border-bottom: solid #b7b7b7 1px;
    margin-bottom: 5px;
    padding-left: 10px;
    position: relative;
  }
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

const H4 = styled.h4`
  margin-left: 40px;
`

const Line = styled.div`
  border-top: 1px solid #b7b7b7;
  margin: 10px 0px;
`;

const InputTitle = styled.p`
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 23px;
`;

const Container = styled.div`
  margin-top: 8px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
 `

const Input1 = styled.input`
  width: 200px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-left: 40px;
  border: 1px solid #B7B7B7;
  border-radius: 8px;
`

const Icon = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 20px;
  gap: 15px;
`

const Edit = styled.div`
  color: #000694;
  cursor: pointer;
`

const Delet = styled.div`
  color: #000694;
  cursor: pointer;
`

export default ViewResume;
