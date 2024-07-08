import styled from "styled-components";
import { Container, Inner, Wrapper } from "../css/Common";
import { CiEdit } from "react-icons/ci";
import { IconButton } from "../css/ReactIconButton";

const JobPostDetail = () => {
  return (
    <Wrapper className="text">
      <Inner className="inner-1200">
        <InfoMessage>서류 필터링에 걸리면 지원 불가 안내</InfoMessage>
        <Container>
          <Top>
            <DeadLineContainer>
              <p>마감일자</p>
              <Dday>(D-1)</Dday>
            </DeadLineContainer>
            <h1>제목</h1>
            <EditButton className="edit">
              <CiEdit />
            </EditButton>
          </Top>
          <InfoContainer>
            <Info>
              <InfoTitle>채용직무</InfoTitle>
              <InfoDesc>안드로이드</InfoDesc>
            </Info>
            <Info>
              <InfoTitle>기술스택</InfoTitle>
              <InfoDesc>Kotlin</InfoDesc>
            </Info>
            <Info>
              <InfoTitle>고용형태</InfoTitle>
              <InfoDesc>정규직</InfoDesc>
            </Info>
            <Info>
              <InfoTitle>근무시간</InfoTitle>
              <InfoDesc>09:00 ~ 18:00</InfoDesc>
            </Info>
            <Info>
              <InfoTitle>필요경력</InfoTitle>
              <InfoDesc>3년</InfoDesc>
            </Info>
            <Info>
              <InfoTitle>필요학력</InfoTitle>
              <InfoDesc>4년제</InfoDesc>
            </Info>
            <Info>
              <InfoTitle>급여</InfoTitle>
              <InfoDesc>6000만원</InfoDesc>
            </Info>
            <Info>
              <InfoTitle>접수기간</InfoTitle>
              <InfoDesc>2024.07.08 ~ 2024.08.08</InfoDesc>
            </Info>
            <LongInfo>
              <InfoTitle>근무지</InfoTitle>
              <InfoDesc>부산광역시 강서구 녹산산단382로14번가길 10~29번지(송정동)</InfoDesc>
            </LongInfo>
            <LongInfo>
              <InfoTitle>전형절차</InfoTitle>
              <StepContainer>
                <Step>
                  <StepNumber>1단계</StepNumber>
                  <p>서류전형</p>
                </Step>
                <Step>
                  <StepNumber>2단계</StepNumber>
                  <p>1차면면접차면접면면접면접접면접차면접면면접면접접면접차면접면면접면접접접</p>
                </Step>
                <Step>
                  <StepNumber>3단계</StepNumber>
                  <p>2차면접</p>
                </Step>
                <Step>
                  <StepNumber>4단계</StepNumber>
                  <p>2차면접</p>
                </Step>
                <Step>
                  <StepNumber>5단계</StepNumber>
                  <p>2차면접</p>
                </Step>
                <Step>
                  <StepNumber>6단계</StepNumber>
                  <p>면접차면접면면접면접접차면접</p>
                </Step>
                <Step>
                  <StepNumber>7단계</StepNumber>
                  <p>2차면접면접</p>
                </Step>
                <Step>
                  <StepNumber>8단계</StepNumber>
                  <p>2차면접</p>
                </Step>
                <Step>
                  <StepNumber>9단계</StepNumber>
                  <p>2차면접</p>
                </Step>
                <Step>
                  <StepNumber>10단계</StepNumber>
                  <p>2차면접</p>
                </Step>
              </StepContainer>
            </LongInfo>
          </InfoContainer>
          <ContentsContianer>
            <h2>공고내용</h2>
            <div>
              설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명
            </div>
            <ContentImage src="" alt="채용공고 설명 이미지" />
          </ContentsContianer>
        </Container>
        <Container>
          <h2>회사정보</h2>
          <InfoContainer>
            <CompanyName>(주)안드로메다</CompanyName>
            <Info>
              <InfoTitle>대표자</InfoTitle>
              <InfoDesc>데애표</InfoDesc>
            </Info>
            <Info>
              <InfoTitle>사원수</InfoTitle>
              <InfoDesc>534명</InfoDesc>
            </Info>
            <Info>
              <InfoTitle>회사 홈페이지</InfoTitle>
              <InfoDesc>http://www.naver.com/</InfoDesc>
            </Info>
            <Info>
              <InfoTitle>설립년도</InfoTitle>
              <InfoDesc>1945년</InfoDesc>
            </Info>
            <LongInfo>
              <InfoTitle>주소</InfoTitle>
              <InfoDesc>부산광역시 강서구 녹산산단382로14번가길 10~29번지(송정동)</InfoDesc>
            </LongInfo>
          </InfoContainer>
        </Container>
        <ApplyButton>지원하기</ApplyButton>
      </Inner>
    </Wrapper>
  );
};

const InfoMessage = styled.p`
  text-align: center;
  color: var(--color-red);
`;

const Top = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DeadLineContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Dday = styled.div`
  color: var(--color-red);
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  row-gap: 40px;
  padding: 40px;
  background-color: var(--bg-light-blue);
  border-radius: var(--box-radius);

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Info = styled.div`
  display: flex;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const InfoTitle = styled.p`
  width: 150px;
  font-weight: 700;
  flex-shrink: 0;
`;

const InfoDesc = styled.div``;

const ContentsContianer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContentImage = styled.img`
  max-width: 100%;
`;

const LongInfo = styled(Info)`
  grid-column-start: 1;
  grid-column-end: 3;

  @media screen and (max-width: 1000px) {
    grid-column-end: 1;
  }
`;

const StepContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;

  @media screen and (max-width: 500px) {
    justify-content: center;
  }
`;

const Step = styled.div`
  width: 160px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;

  &:not(:first-child)::before {
    content: "";
    position: absolute;
    top: calc(8px + 0.4rem);
    left: -20px;
    width: 63px;
    height: 2px;
    background-color: var(--primary-color);
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: calc(8px + 0.4rem);
    left: 117px;
    width: 63px;
    height: 2px;
    background-color: var(--primary-color);
  }
`;

const StepNumber = styled.div`
  width: 74px;
  padding: 8px 16px;
  color: var(--primary-color);
  font-size: 0.8rem;
  font-weight: 700;
  border: 2px solid var(--primary-color);
  border-radius: var(--box-radius);
`;

const CompanyName = styled(LongInfo)`
  font-size: 1.3rem;
  font-weight: 700;
`;

const ApplyButton = styled.button`
  margin: 100px auto;
  padding: 32px 104px;
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 700;
  background-color: var(--primary-color);
  border-radius: var(--button-radius);

  transition: all 0.1s;
  &:active {
    transform: scale(99%);
  }
`;

const EditButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
`;

export default JobPostDetail;
