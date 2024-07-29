import styled from "styled-components";
import { Wrapper } from "../assets/style/Common";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUserState } from "../recoil/store";
import { getJobPostings, postJobPostingApply } from "../axios/http/jobPosting";
import { useEffect, useRef, useState } from "react";
import { JobInfo } from "../type/jobPosting";
import { getDday } from "../utils/Format";
import { getResume } from "../axios/http/resume";
import { getCompanyInfo } from "../axios/http/company";
import axios from "axios";

const Index = () => {
  const authUser = useRecoilValue(authUserState);
  const [jobInfos, setJobInfos] = useState<JobInfo[]>([]);
  const [page, setpage] = useState(1);
  const totalPage = useRef(0);
  const [isInfoMessage, setIsInfoMessage] = useState(false);

  const navigate = useNavigate();
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        setpage(page => {
          if (page < totalPage.current) return page + 1;
          else return page;
        });
      },
      {
        threshold: 0,
      },
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  useEffect(() => {
    (async () => {
      if (!observerTarget.current) return;

      const response = await getJobPostings(page);
      totalPage.current = response.totalPages;

      if (response.jobPostingsList.length > 0 && jobInfos.length <= (page - 1) * 24) {
        setJobInfos(jobInfos => [...jobInfos, ...response.jobPostingsList]);
      }
    })();
  }, [jobInfos.length, page]);

  useEffect(() => {
    (async () => {
      if (!authUser) return;

      if (authUser.role == "ROLE_CANDIDATE") {
        const response = await getResume(authUser?.key);
        if (response.title == null) setIsInfoMessage(true);
      } else if (authUser.role === "ROLE_COMPANY") {
        const response = await getCompanyInfo(authUser?.key);
        if (!response.boss) setIsInfoMessage(true);
      }
    })();
  }, [authUser]);

  const goDetail = (jobPostingKey: string) => {
    navigate(`/jobpost-detail/${jobPostingKey}`);
  };

  const apply = async (jobPostingKey: string) => {
    if (!jobPostingKey) return; // url에 jobPostingKey가 없음

    if (!authUser) {
      //로그인하지 않았다면 로그인으로 보내기 alert
      if (confirm("로그인 하시겠습니까?")) navigate("/login");
    } else if (confirm("정말 지원하시겠습니까?")) {
      // 로그인한 사용자만
      try {
        await postJobPostingApply(jobPostingKey);
        alert("지원되었습니다.");
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response?.status == 403) {
            alert("지원할 수 없습니다.");
          } else {
            alert(e.response?.data.message);
          }
        }
      }
    }
  };

  return (
    <Wrapper className="inner-1200">
      {isInfoMessage && (
        <InfoMessage>
          {authUser?.role == "ROLE_CANDIDATE"
            ? "아직 이력서를 작성하지 않았습니다."
            : "아직 회사정보를 작성하지 않았습니다."}
          <br></br>
          마이페이지에서 작성해주세요.
        </InfoMessage>
      )}
      <JobsContainer>
        {jobInfos.map(jobInfo => {
          return (
            <JobContainer
              onClick={() => goDetail(jobInfo.jobPostingKey)}
              key={jobInfo.jobPostingKey}
            >
              <CompanyName>{jobInfo.companyName}</CompanyName>
              <JogTitle>{jobInfo.title}</JogTitle>
              <TeckStack>{jobInfo.techStack.map(stack => `#${stack}`)}</TeckStack>
              <ApplyButton
                onClick={event => {
                  event.stopPropagation();
                  apply(jobInfo.jobPostingKey);
                }}
              >
                지원하기
              </ApplyButton>
              <Dday>{getDday(jobInfo.endDate)}</Dday>
            </JobContainer>
          );
        })}
      </JobsContainer>
      <Observer ref={observerTarget}></Observer>
    </Wrapper>
  );
};

const InfoMessage = styled.p`
  margin-bottom: 100px;
  text-align: center;
  color: var(--color-red);
  line-height: 120%;
`;

const JobsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 16px;
`;

const JobContainer = styled.div`
  position: relative;
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

const CompanyName = styled.p`
  width: calc(100% - 40px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const JogTitle = styled.p`
  width: 100%;
  margin-top: 14px;
  font-size: 1.3rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TeckStack = styled.p`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
  color: #969696;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Dday = styled.p`
  right: 16px;
  position: absolute;
  font-size: 0.8rem;
  color: var(--color-red);
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

const Observer = styled.div`
  height: 10vh;
`;

export default Index;
