import { JobPosting } from "../type/jobPosting";
import { http } from "./instances";

export const postCompaniesJobPosting = (companyKey: number, jobPosting: JobPosting) => {
  return http.post<JobPosting>(`/companies/${companyKey}/job-posting`, jobPosting);
};
