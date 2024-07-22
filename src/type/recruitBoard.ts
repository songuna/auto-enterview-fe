export interface RecruitBoardData {
  stepId: number;
  stepName: string;
  candidateTechStackInterviewInfoDtoList: CandidateInfo[];
}

export interface CandidateInfo {
  candidateKey: string;
  candidateName: string;
  resumeKey: string;
  techStack: string[];
  scheduleDateTime: string | null;
}
