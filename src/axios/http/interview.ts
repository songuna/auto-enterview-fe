import {
  AssignmentScheduleBody,
  IInterviewProps,
  InterviewScheduleBody,
  InterviewScheduleKey,
} from "../../type/interview";
import { http } from "../instances";

export const getInterviewSchedule = (props: IInterviewProps) => {
  return http.get(`/job-postings/${props.jobPostingKey}/steps/${props.stepId}/interview-schedule`);
};

export const postAssignmentSchedule = (props: IInterviewProps, body: AssignmentScheduleBody) => {
  return http.post<InterviewScheduleKey>(
    `/job-postings/${props.jobPostingKey}/steps/${props.stepId}/task-schedule`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const postInterviewSchedule = (props: IInterviewProps, body: InterviewScheduleBody[]) => {
  return http.post<InterviewScheduleKey>(
    `/job-postings/${props.jobPostingKey}/steps/${props.stepId}/interview-schedule`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const postInterviewParticipants = (
  props: IInterviewProps,
  body: InterviewScheduleBody[],
) => {
  return http.post(
    `/job-postings/${props.jobPostingKey}/steps/${props.stepId}/interview-schedule-participants`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const deleteInterviewSchedule = (props: IInterviewProps) => {
  return http.delete(
    `/job-postings/${props.jobPostingKey}/steps/${props.stepId}/interview-schedule`,
  );
};
