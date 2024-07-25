import styled from "styled-components";
import { Container, FullBtn, Inner, SubTitle, UserName, Wrapper } from "../assets/style/Common";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";
import Modal from "../components/Modal";
import { ModalType } from "../type/modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteInterviewSchedule } from "../axios/http/interview";
import { CandidateInfo, RecruitBoardData } from "../type/recruitBoard";
import { getRecruitBoardData, putNextStep } from "../axios/http/recruitBoard";
import { useRecoilValue } from "recoil";
import { authUserState } from "../recoil/store";

const RecruitBoard = () => {
  const { jobPostingKey } = useParams();
  const [dataList, setDataList] = useState<RecruitBoardData[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [schedule, setSchedule] = useState<(string | null)[][]>([]);
  const [activeList, setActiveList] = useState<CandidateInfo[]>([]);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("schedule");
  const [modalStep, setModalStep] = useState<number>(0);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const authUser = useRecoilValue(authUserState);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title");

  // 단계별 일정 추출하기
  const filterSchedules = useCallback((data: RecruitBoardData[]) => {
    const candidatesList = data.map(step => {
      return step.candidateTechStackInterviewInfoDtoList;
    });
    const scheduleDateTimes = candidatesList.map(candidates => {
      return candidates.map(candidate => candidate.scheduleDateTime);
    });
    setSchedule(scheduleDateTimes);
  }, []);

  // 단계 및 지원자 목록, 일정 정보
  const fetchCandidates = useCallback(async () => {
    if (!jobPostingKey) return;

    try {
      const data: RecruitBoardData[] = await getRecruitBoardData(jobPostingKey);
      setDataList(data);
      filterSchedules(data);
    } catch (error) {
      alert("지원자 목록을 불러오는데 문제가 생겼습니다. 다시 시도해주세요.");
    }
  }, [filterSchedules, jobPostingKey]);

  useEffect(() => {
    // console.log(schedule[0]);
    fetchCandidates();
  }, [fetchCandidates, jobPostingKey]);

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
    if (!jobPostingKey) return;

    const response = confirm("일정이 초기화 됩니다. 전체 삭제를 진행하시겠어요?");
    if (response) {
      try {
        await deleteInterviewSchedule({ jobPostingKey: jobPostingKey, stepId: stepId });
        alert("일정이 성공적으로 삭제되었습니다.");
      } catch (error) {
        if (error.message.split(" ").at(-1) === "404") {
          alert("일정이 존재하지 않습니다.");
        } else {
          alert("일정을 삭제하는데 문제가 발생했습니다.");
        }
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
  const handleClickList = (candidate: CandidateInfo, step: number) => {
    setActiveStep(prevStep => {
      // 동일한 step의 지원자를 클릭했는지 체크
      if (prevStep !== step) {
        alert("현재 단계에서만 선택하실 수 있습니다.");
        return prevStep;
      } else {
        // 같은 단계를 선택하면 activeList 업데이트
        setActiveList(prevActiveList => {
          const isAlreadyActive = prevActiveList.some(
            item => item.candidateKey === candidate.candidateKey,
          );

          if (isAlreadyActive) {
            // 이미 활성화된 지원자는 제거
            return prevActiveList.filter(item => item.candidateKey !== candidate.candidateKey);
          } else {
            // 새로운 지원자를 활성화 목록에 추가
            return [...prevActiveList, candidate];
          }
        });
      }
      return step;
    });
  };

  // 다음 단계로 넘기기
  const handleNexteStep = async (stepId: number) => {
    if (!jobPostingKey) return;

    if (currentStep < dataList.length) {
      const activeCandidates = activeList;
      const inactiveCandidates = dataList[
        currentStep - 1
      ].candidateTechStackInterviewInfoDtoList.filter(candidate => !activeList.includes(candidate));
      const activeCandidateKeys = activeCandidates.map(candidate => candidate.candidateKey);

      const nextStepBody = {
        currentStepId: stepId,
        candidateKeys: [...activeCandidateKeys],
      };

      try {
        await putNextStep(jobPostingKey, nextStepBody);

        setDataList(prev => {
          const newCandidateList = [...prev];
          newCandidateList[currentStep - 1].candidateTechStackInterviewInfoDtoList =
            inactiveCandidates;
          newCandidateList[currentStep].candidateTechStackInterviewInfoDtoList = [
            ...newCandidateList[currentStep].candidateTechStackInterviewInfoDtoList,
            ...activeCandidates,
          ];
          return newCandidateList;
        });

        setActiveList([]);
        setCurrentStep(prev => prev + 1);
      } catch (error) {
        alert("단계를 넘기는데 문제가 생겼습니다. 다시 시도해주세요.");
      }
    }
  };

  // 모달창 닫기
  const onClose = () => {
    setModal(false);
  };

  return (
    <Wrapper>
      <Inner className="inner-1200">
        <UserName>{authUser?.name}</UserName>
        <Container>
          <SubTitle>{title}</SubTitle>
          <Board
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <Steps>
              {dataList?.map((data, idx) => (
                <Step key={data.stepId}>
                  <StepHead>
                    <StepTitle className="sub-title">{data.stepName}</StepTitle>
                    {data.stepName !== "서류전형" &&
                      !!data.candidateTechStackInterviewInfoDtoList.length &&
                      data.candidateTechStackInterviewInfoDtoList.some(
                        candidate => candidate.scheduleDateTime !== null,
                      ) && (
                        <RemoveBtn onClick={() => handleRemoveSchedule(data.stepId)}>
                          <span>일정 삭제</span>
                          <RiDeleteBin6Line />
                        </RemoveBtn>
                      )}
                  </StepHead>
                  {data.stepName === "서류전형" ? null : data.candidateTechStackInterviewInfoDtoList
                      .length > 0 &&
                    data.candidateTechStackInterviewInfoDtoList.some(
                      candidate => candidate.scheduleDateTime !== null,
                    ) ? (
                    <EmailBtn onClick={() => openModal("email", idx + 1)}>
                      예약 메일 발송하기
                    </EmailBtn>
                  ) : (
                    <ScheduleBtn onClick={() => openModal("schedule", idx + 1)}>
                      일정 생성하기
                    </ScheduleBtn>
                  )}
                  <Lists>
                    {data.candidateTechStackInterviewInfoDtoList.map(candidate => (
                      <List
                        key={candidate.candidateKey}
                        $isActive={activeList.some(
                          active => active.candidateKey === candidate.candidateKey,
                        )}
                        onClick={() => handleClickList(candidate, idx + 1)}
                      >
                        <Name>{candidate.candidateName}</Name>
                        <Skills>
                          {candidate.techStack.map(teck => (
                            <Skill key={`${candidate.candidateKey}${teck}`}>{teck}</Skill>
                          ))}
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
                  {/* 현재 단계이고, 선택된 지원자가 있고, 마지막 단계가 아닐 경우 */}
                  {idx + 1 === currentStep &&
                    activeList.length > 0 &&
                    idx + 1 !== dataList.length && (
                      <PassBtn onClick={() => handleNexteStep(data.stepId)}>
                        다음 단계로 넘기기
                      </PassBtn>
                    )}
                </Step>
              ))}
            </Steps>
            {jobPostingKey && modal && (
              <Modal type={modalType} step={modalStep} onClose={onClose} />
            )}
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
