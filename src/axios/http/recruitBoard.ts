import { IStep } from "../../type/recruitBoard";
import { http } from "../instances";

// todo: 정보 한번에 받아오는걸로 API 수정중
export const getSteps = (jobPostingKey: string) => {
  return http.get<IStep[]>(`/job-postings/{jobPostingKey}/steps`);
};
