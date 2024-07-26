export interface IInterviewProps {
  jobPostingKey: string;
  stepId: number;
}

export interface AssignmentScheduleBody {
  endDate: string;
}

export interface InterviewScheduleBody {
  startDate: string;
  startTime: string;
  term: number;
  times: number;
}

export interface InterviewScheduleKey {
  interviewScheduleKey: string;
}

export interface IInterviewData {
  startDate: Date;
  startTime: Date;
  term: number;
  times: number;
}

export interface SendScheduleConText {
  sendSchedule: () => Promise<void>;
  clickNext: () => void;
}
