import { RecruitBoardData } from "../../type/recruitBoard";
import { http } from "../instances";

// recruit-board 페이지 정보 한 번에 불러오기
export const getRecruitBoardData = (jobPostingKey: string) => {
  return http.get<RecruitBoardData[]>(`/job-postings/${jobPostingKey}/candidates-list`);
};
