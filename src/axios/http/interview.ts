import { IInterviewProps } from "../../type/interview";
import { http } from "../instances";

export const getInterviewSchedule = (props: IInterviewProps) => {
  return http.get(`/job-postings/${props.jobPostingKey}/steps/${props.stepId}/interview-schedule`);
};

export const postInterviewParticipants = (props: IInterviewProps) => {
  return http.post(
    `/job-postings/${props.jobPostingKey}/steps/${props.stepId}/interview-schedule-participants`,
  );
};

export const postInterviewSchedule = (props: IInterviewProps) => {
  return http.post(`/job-postings/${props.jobPostingKey}/steps/${props.stepId}/interview-schedule`);
};

// todo: delete API 백엔드에서 수정중
export const deleteInterviewSchedule = (props: IInterviewProps) => {
  return http.delete(
    `/job-postings/${props.jobPostingKey}/steps/${props.stepId}/interview-schedule`,
  );
};
