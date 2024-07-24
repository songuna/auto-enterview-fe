export interface RecruitBoardData {
  stepId: number;
  stepName: string;
  candidateTechStackInterviewInfoDtoList: {
    candidateKey: string;
    candidateName: string;
    resumeKey: string;
    techStack: string[];
    scheduleDateTime: string | null;
  }[];
}

export interface CandidateInfo {
  candidateKey: string;
  candidateName: string;
  resumeKey: string;
  techStack: string[];
  scheduleDateTime: string | null;
}

export interface NextStepBody {
  currentStepId: number;
  candidateKeys: string[];
}
