import styled from "styled-components";
import { Container, FullBtn, Inner, SubTitle, UserName, Wrapper } from "../assets/style/Common";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";
import Modal from "./Modal";
import { useParams } from "next/navigation";
import { ModalType } from "../type/modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteInterviewSchedule } from "../axios/http/interview";
import { ICandidate, IStep } from "../type/recruitBoard";
import { getSteps } from "../axios/http/recruitBoard";

const RecruitBoard = () => {
  // const param = useParams();
  const [steps, setSteps] = useState<IStep[]>([
    {
      stepId: 1,
      stepName: "서류전형",
    },
    {
      stepId: 2,
      stepName: "1차면접",
    },
    {
      stepId: 3,
      stepName: "2차면접",
    },
    {
      stepId: 4,
      stepName: "3차면접",
    },
  ]);
  const [candidateList, setCandidateList] = useState<ICandidate[][]>([
    [
      {
        candidateKey: "지원자 1",
        candidateName: "지원자 이름",
        createdAt: "지원 일자",
      },
      {
        candidateKey: "지원자 2",
        candidateName: "지원자 이름",
        createdAt: "지원 일자",
      },
      {
        candidateKey: "지원자 3",
        candidateName: "지원자 이름",
        createdAt: "지원 일자",
      },
      {
        candidateKey: "지원자 4",
        candidateName: "지원자 이름",
        createdAt: "지원 일자",
      },
      {
        candidateKey: "지원자 5",
        candidateName: "지원자 이름",
        createdAt: "지원 일자",
      },
      {
        candidateKey: "지원자 6",
        candidateName: "지원자 이름",
        createdAt: "지원 일자",
      },
    ],
    [],
    [],
    [],
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [schedule, setSchedule] = useState<string[]>([]);
  const [activeList, setActiveList] = useState<ICandidate[]>([]);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("schedule");
  const [modalStep, setModalStep] = useState<number>(0);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // 채용단계 fetch
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const steps = await getSteps(param.toString());
    //     setSteps(steps);
    //   } catch (error) {
    //     alert("채용단계를 불러오는데 문제가 생겼습니다. 다시 시도해주세요.");
    //   }
    // };
    // fetchData();
  }, []);

  // 단계별 지원자 목록 fetch
  useEffect(() => {
    // const fetchCandidates = async () => {
    //   try {
    //     const candidates = await axios.get(
    //       `/job-postings/${jobPostingKey}/steps/${stepId}/candidates-list`,
    //     );
    //     setCandidateList(candidates);
    //   } catch (error) {
    //     alert("지원자 목록을 불러오는데 문제가 생겼습니다. 다시 시도해주세요.");
    //   }
    // };
    // fetchCandidates();
  }, []);

  // 칸반보드 1200px 넘어가면 양쪽으로 드래그
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

  // 일정 삭제
  const handleRemoveSchedule = async (stepId: number) => {
    const response = confirm("일정이 초기화 됩니다. 전체 삭제를 진행하시겠어요?");
    if (response) {
      try {
        await deleteInterviewSchedule({ jobPostingKey: param.toString(), stepId });
        alert("일정이 성공적으로 삭제되었습니다.");
      } catch (error) {
        alert("일정을 삭제하는데 문제가 발생했습니다.");
      }
    }
  };

  // 모달 오픈
  const openModal = (type: ModalType, step: number) => {
    setModalType(type);
    setModalStep(step);
    setModal(true);
  };

  // 이력서 보기
  const handleOpenResume = (key: string) => {
    navigate(`/view-resume/${key}`);
  };

  // 지원자 선택하기
  const handleClickList = (candidate: ICandidate) => {
    setActiveList(prevActiveList => {
      if (prevActiveList.length === 0) {
        return [candidate];
      }

      //todo: 동일한 step의 지원자를 클릭했는지 검사할지?
      return prevActiveList.includes(candidate)
        ? prevActiveList.filter(item => item !== candidate)
        : [...prevActiveList, candidate];

      // const ok = confirm(
      //   "현재 다른 단계에서 선택중인 지원자가 있습니다. 클릭하신 단계의 지원자를 선택하시겠어요?",
      // );

      // if (ok) {
      //   return [stepName];
      // }
      // return prevActiveList;
    });
  };

  // 다음 단계로 넘기기
  const handleNexteStep = () => {
    if (currentStep < steps.length) {
      const activeCandidates = activeList;
      const inactiveCandidates = candidateList[currentStep - 1].filter(
        candidate => !activeList.includes(candidate),
      );

      setCandidateList(prev => {
        const newCandidateList = [...prev];
        newCandidateList[currentStep - 1] = inactiveCandidates;
        newCandidateList[currentStep] = [...newCandidateList[currentStep], ...activeCandidates];
        return newCandidateList;
      });

      setActiveList([]);
      setCurrentStep(prev => prev + 1);
    }
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
                <Step key={step.stepId}>
                  <StepHead>
                    <StepTitle className="sub-title">{step.stepName}</StepTitle>
                    {step.stepId !== 1 && schedule && (
                      <RemoveBtn onClick={() => handleRemoveSchedule(step.stepId)}>
                        <span>일정 삭제</span>
                        <RiDeleteBin6Line />
                      </RemoveBtn>
                    )}
                  </StepHead>
                  {step.stepId === 1 ? null : schedule.length ? (
                    <EmailBtn onClick={() => openModal("email", step.stepId)}>
                      예약 메일 발송하기
                    </EmailBtn>
                  ) : (
                    <ScheduleBtn onClick={() => openModal("schedule", step.stepId)}>
                      일정 생성하기
                    </ScheduleBtn>
                  )}
                  <Lists>
                    {candidateList[step.stepId - 1].map(candidate => (
                      <List
                        key={candidate.candidateKey}
                        $isActive={activeList.includes(candidate)}
                        onClick={() => handleClickList(candidate)}
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
                  {step.stepId === currentStep &&
                    activeList.length &&
                    step.stepId !== steps.length && (
                      <PassBtn onClick={handleNexteStep}>다음 단계로 넘기기</PassBtn>
                    )}
                </Step>
              ))}
            </Steps>
            {/* <Modal type={modalType} key={param} /> */}
            {modal ? (
              <Modal type={modalType} key={`id`} step={modalStep} onClose={() => setModal(false)} />
            ) : null}
          </Board>
        </Container>
      </Inner>
    </Wrapper>
  );
};

const Board = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 600px;
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

const StepHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.125rem;
  color: var(--color-red);
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
