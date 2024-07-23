import { AppliedJobPostings } from "../../type/candidate";
import { http } from "../instances";

export const getAppliedJobPostings = (candidateKey: string): Promise<AppliedJobPostings> => {
  return http.get<AppliedJobPostings>(`/candidates/${candidateKey}/applied-job-postings?page=1`);
};
