import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewResume: React.FC  = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const navigate = useNavigate();


  // 삭제버튼 구현
  const handleDelete = () => {
    if (deleteConfirm) {
      // 이미 확인된 상태에서 더블 클릭 시
      alert('이력서가 이미 삭제되었습니다!');
      return;
    } else {
      // 처음 클릭 시 확인 알림
      if (window.confirm('정말 삭제하시겠습니까?')) {
        alert('이력서가 삭제되었습니다!');
        setDeleteConfirm(true);
        navigate('/user-mypage');
      }
    }
  };

  // 수정버튼 구현
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
          <Title>이력서
            <Icon>
            <Edit onClick={handleEdit}>
              <MdOutlineEdit size={20}></MdOutlineEdit>
            </Edit>
            
            <Delet onClick={handleDelete}>
              <RiDeleteBin6Line size={20}></RiDeleteBin6Line>
            </Delet>
            </Icon>
          </Title>
        <All>
          <InputContainer>
            <H2 className="inputBox">" 한줄 소개 "</H2>
            <AllContainer>
              <Image></Image>
              <FlexContainer>
                <H3 className="input textBox">이름</H3>
                <H3 className="input textBox">성별</H3>
                <H3 className="input textBox">생년월일</H3>
                <H3 className="input textBox">전화번호</H3>
                <H3 className="input emailBox">이메일</H3>
                <H3 className="input addressBox">주소</H3>
              </FlexContainer>
            </AllContainer>
            <Line></Line>
           </InputContainer>

          <InputContainer>
            <InputTitle>희망 직무</InputTitle>
            <H3 className="input textBox"></H3>
          </InputContainer>

          <InputContainer>
            <InputTitle>기술 스택</InputTitle>
          </InputContainer>

          <InputContainer className="school">
            <InputTitle>최종 학력</InputTitle>
            <H3 className="input textBox"></H3>
            <InputTitle className="schoolName">학교명</InputTitle>
            <H3 className="input textBox"></H3>
          </InputContainer>

          <InputContainer>
            <InputTitle>경력</InputTitle>
            <Container>
              <Input1></Input1>
              <Input1></Input1>
              <Input1></Input1>
              <Input1></Input1>
            </Container>
          </InputContainer>

          <InputContainer>
            <InputTitle>경험/활동/교육</InputTitle>
            <Container>
              <Input1></Input1>
              <Input1></Input1>
              <Input1></Input1>
            </Container>
          </InputContainer>

          <InputContainer>
            <InputTitle>자격/어학/수상</InputTitle>
            <Container>
              <Input1></Input1>
              <Input1></Input1>
            </Container>
          </InputContainer>

          <InputContainer>
            <InputTitle>포트폴리오</InputTitle>
            <Container>
              <H4>URL - </H4>
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
