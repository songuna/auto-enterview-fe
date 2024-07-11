import styled from "styled-components";
import { Wrapper } from "../css/Common";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUserState } from "../../recoil/atoms/userAtom";

const Index = () => {
  const authUser = useRecoilValue(authUserState);
  const navigate = useNavigate();
  console.log(authUser);

  const goDetail = () => {
    navigate("/jobpost-detail/1");
  };

  const apply = event => {
    event.stopPropagation();
    //TODO: 지원하기
  };

  return (
    <Wrapper className="inner-1200">
      {!authUser && (
        <InfoMessage>
          아직 이력서를 작성하지 않았습니다. 아직 회사정보를 작성하지 않았습니다. 마이페이지에서
          작성해주세요.
        </InfoMessage>
      )}
      <JobsContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
        <JobContainer onClick={goDetail}>
          <CompanyName>(주)회사이름</CompanyName>
          <JogTitle>제용공고 제목</JogTitle>
          <TeckStack>#기술 스택</TeckStack>
          <ApplyButton onClick={apply}>지원하기</ApplyButton>
        </JobContainer>
      </JobsContainer>
    </Wrapper>
  );
};

const InfoMessage = styled.p`
  margin-bottom: 100px;
  text-align: center;
  color: var(--color-red);
`;

const JobsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 16px;
`;

const JobContainer = styled.div`
  min-width: 270px;
  display: flex;
  align-items: start;
  flex-direction: column;
  padding: 16px;
  background-color: var(--bg-light-blue);
  border-radius: var(--button-radius);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    filter: brightness(98%);
  }
`;

const CompanyName = styled.p``;

const JogTitle = styled.p`
  margin-top: 14px;
  font-size: 1.3rem;
`;

const TeckStack = styled.p`
  margin-top: 16px;
  color: #636363;
`;

const ApplyButton = styled.button`
  align-self: flex-end;
  color: #ffffff;
  padding: 8px 16px;
  background-color: var(--primary-color);
  border-radius: var(--button-radius);
  font-family: "Pretendard";
  font-weight: 400;

  &:hover {
    filter: brightness(110%);
  }

  &:active {
    transform: scale(99%);
  }
`;

export default Index;
