import styled from "styled-components";
import { Container, FullBtn, Inner, SubTitle, UserName, Wrapper } from "../css/Common";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";

interface ICandidateList {
  candidateKey: string;
  candidateName: string;
  createdAt: string;
}

const RecruitBoard = () => {
  const [steps, setSteps] = useState(["서류전형"]);
  const [candidateList, setCandidateList] = useState<ICandidateList[]>([
    {
      candidateKey: "지원자 key",
      candidateName: "지원자 이름",
      createdAt: "지원 일자",
    },
  ]);
  const [schedule, setSchedule] = useState(false);
  const [activeList, setActiveList] = useState<string[]>([]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  /* todo: 서류단계 통과한 지원자들 불러오기, jsx에도 적용 */
  /* todo: 일정생성, 메일발송 이벤트 구현 */

  useEffect(() => {
    async () => {
      try {
        const steps = await axios.get(`/companies/${companyKey}/${jobPostingKey}/job-posting-step`);
        setSteps(steps.data);

        const candidate = await axios.get(
          `/companies/${companyKey}/${jobPostingKey}/candidate-list`,
        );
        setCandidateList(candidate.data);
      } catch (error) {
        alert("채용단계를 불러오는데 문제가 생겼습니다. 다시 시도해주세요.");
      }
    };
  }, []);

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging = true;
    startX = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeft = containerRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDragging = false;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = x - startX;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleOpenResume = (key: string) => {
    navigate(`/view-resume/${key}`);
  };

  const handleClickList = (stepKey: string) => {
    setActiveList(prevActiveList => {
      if (prevActiveList.length === 0) {
        return [stepKey];
      }
      //동일한 step의 지원자를 클릭했는지 검사
      if (prevActiveList[0].split("/")[0] === stepKey.split("/")[0]) {
        return prevActiveList.includes(stepKey)
          ? prevActiveList.filter(item => item !== stepKey)
          : [...prevActiveList, stepKey];
      }

      const ok = confirm(
        "현재 다른 단계에서 선택중인 지원자가 있습니다. 클릭하신 단계의 지원자를 선택하시겠어요?",
      );

      if (ok) {
        return [stepKey];
      }
      return prevActiveList;
    });
  };

  return (
    <Wrapper>
      <Inner className="inner-1200">
        <UserName>{"(주)회사 이름"}</UserName>
        <Container>
          <SubTitle>{"[FE] 신입사원 채용"}</SubTitle>
          <Board
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <Steps>
              {steps.map(step => (
                <Step key={step}>
                  <StepTitle className="sub-title">{step}</StepTitle>
                  {step === "서류전형" ? null : schedule ? (
                    <EmailBtn>예약 메일 발송하기</EmailBtn>
                  ) : (
                    <ScheduleBtn>일정 생성하기</ScheduleBtn>
                  )}
                  <Lists>
                    {candidateList.map(candidate => (
                      <List
                        key={candidate.candidateKey}
                        $isActive={activeList.includes(`${step}/${candidate.candidateKey}`)}
                        onClick={() => handleClickList(`${step}/${candidate.candidateKey}`)}
                      >
                        <Name>{candidate.candidateName}</Name>
                        <Skills>
                          <Skill>{"Java"}</Skill>
                          <Skill>{"React"}</Skill>
                          <Skill>{"Typescript"}</Skill>
                        </Skills>
                        <View
                          onClick={e => {
                            e.stopPropagation();
                            handleOpenResume(candidate.candidateKey);
                          }}
                        >
                          <FaEnvelopeOpenText /> 이력서 보기
                        </View>
                      </List>
                    ))}
                  </Lists>
                  {activeList.length && activeList[0].split("/").includes(`${step}`) ? (
                    <PassBtn>다음 단계로 넘기기</PassBtn>
                  ) : null}
                </Step>
              ))}
            </Steps>
          </Board>
        </Container>
      </Inner>
    </Wrapper>
  );
};

const Board = styled.div`
  overflow: hidden;
  padding: 1rem;
  border-top: 3px solid var(--border-gray-200);
  border-radius: var(--box-radius);
  box-shadow: var(--box-shadow);
`;

const Steps = styled.ol`
  display: flex;
  gap: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Step = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 25%;
  min-width: 20%;
  height: 70vh;
  padding: 16px 8px;
  border-radius: var(--box-radius);
  background-color: var(--bg-light-gray);

  &::before,
  &::after {
    z-index: 1;
    content: "";
    position: absolute;
    bottom: 64px;
    left: 0%;
    width: 100%;
    pointer-events: none;
  }
  &::before {
    top: 36px;
    height: 20px;
    background: linear-gradient(to bottom, var(--bg-light-gray), transparent);
  }
  &::after {
    bottom: 16px;
    height: 60px;
    background: linear-gradient(to top, var(--bg-light-gray) 50%, transparent);
  }
`;

const StepTitle = styled.h3`
  padding-left: 10px;
`;

const EmailBtn = styled(FullBtn)`
  margin-top: 16px;
  background-color: var(--sub-color);
`;

const ScheduleBtn = styled(FullBtn)`
  margin-top: 16px;
`;

const Lists = styled.ul`
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0 50px;
  height: 100%;

  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;

const List = styled.li<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  height: 120px;
  padding: 1rem;
  border-radius: var(--box-radius);
  border: 1px solid ${props => (props.$isActive ? "#000694" : "transparent")};
  background-color: #fff;
  box-shadow: var(--box-shadow);
  cursor: pointer;
`;

const PassBtn = styled(FullBtn)`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  width: 90%;
  margin: 0 auto;
`;

const Name = styled.p`
  font-weight: 700;
`;

const Skills = styled.div`
  overflow: hidden;
  display: flex;
  gap: 5px;
  position: relative;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 100%;
    background: linear-gradient(to left, #fff, transparent);
  }
`;

const Skill = styled.p`
  padding: 4px 8px;
  background-color: rgba(197, 255, 197, 0.5);
  border-radius: var(--button-radius);
`;

const View = styled.button`
  font: inherit;
`;

export default RecruitBoard;
