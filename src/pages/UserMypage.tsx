import styled from "styled-components";
import { Container, Inner, SubTitle, Wrapper } from "../assets/style/Common";
import {
  Dday,
  Info,
  InfoDesc,
  InfoTitle,
  Label,
  LabelWrap,
  ListStep,
  ListTitle,
  RecruitList,
  RecruitLists,
  Top,
  UserInfo,
} from "../assets/style/MypageStyle";
import { useEffect, useState } from "react";
import { getResume } from "../axios/http/resume";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

const infoTitles = ["이름", "이메일", "휴대폰 번호"];

const UserMypage = () => {
  const [isResume, setIsResume] = useState(true);
  // todo: 로그인한 유저 정보
  const currentUserKey = "id";
  // const currentUserKey = useRecoilValue()

  useEffect(() => {
    // 이력서가 등록되어 있는지 확인
    const fetchResume = async () => {
      try {
        const response = await getResume(currentUserKey);
        if (response.length) setIsResume(true);
      } catch (error) {
        alert("이력서를 불러오는데 문제가 생겼습니다.");
        setIsResume(false);
      }
    };
    fetchResume();
  }, []);

  return (
    <Wrapper>
      <Inner className="inner-1200">
        <Container>
          <UserTop>
            <SubTitle>응시자 정보</SubTitle>
            {isResume ? (
              <ReadResume to={`/view-resume/${currentUserKey}`}>이력서 보기</ReadResume>
            ) : (
              <CreateResume to="/create-resume">이력서 생성</CreateResume>
            )}
          </UserTop>
          <UserInfo>
            {infoTitles.map(info => (
              <Info className="text" key={info}>
                <InfoTitle>{info}</InfoTitle>
                <InfoDesc>{info}</InfoDesc>
              </Info>
            ))}
          </UserInfo>
        </Container>
        <Container>
          <SubTitle className="sub-title">내가 지원한 공고 목록</SubTitle>
          <RecruitLists>
            <RecruitList>
              <LabelWrap>
                <Label />
                <Dday>{"2024.06.26"}</Dday>
              </LabelWrap>
              <Time>{"14:00"}</Time>
              <ListStep>{"서류 단계"}</ListStep>
              <UserListTitle>
                {
                  "제목입니다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ"
                }
              </UserListTitle>
            </RecruitList>
          </RecruitLists>
        </Container>
      </Inner>
    </Wrapper>
  );
};

const UserTop = styled(Top)`
  justify-content: space-between;
`;

const Time = styled(Dday)``;

const ReadResume = styled(Link)`
  padding: 16px 48px;
  background-color: var(--sub-color);
  border-radius: var(--button-radius);
  font-size: 1.2rem;
  color: #fff;
`;

const CreateResume = styled(ReadResume)`
  background-color: var(--primary-color);
`;

const UserListTitle = styled(ListTitle)`
  max-width: 600px;
  padding-right: 24px;
`;

export default UserMypage;
