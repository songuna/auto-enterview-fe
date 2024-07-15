export interface IInterviewProps {
  jobPostingKey: string;
  stepId: number;
}

export interface IInterviewData {
  date: Date;
  startTime: Date;
  term: number;
  times: number;
}

export interface SendScheduleConText {
  sendSchedule: () => Promise<void>;
  clickNext: () => void;
}
