import { AxiosRequestConfig } from "axios";
import { PostedJobPoting } from "../../type/company";
import { JobInfo, JobPosting } from "../../type/jobPosting";
import { http } from "../instances";

// 전체 공고 조회
export const getJobPostings = (page: number) => {
  return http.get<JobInfo[]>(`common/job-postings?page=${page}`);
};

// 회사 마이페이지 공고 조회
export const getPostedJobPostings = (companyKey: string) => {
  return http.get<PostedJobPoting[]>(`companies/${companyKey}/posted-job-postings`);
};

export const postCompaniesJobPosting = (
  companyKey: string,
  data: JobPosting,
  config?: AxiosRequestConfig,
) => {
  return http.post<JobPosting>(`companies/${companyKey}/job-postings`, data, config);
};

export const putCompaniesJobPosting = (companyKey: string, data: JobPosting) => {
  return http.put<JobPosting>(`companies/${companyKey}/job-postings`, data);
};

export const postJobPostingApply = (jobPostingKey: string) => {
  return http.post(`candidate/job-postings/${jobPostingKey}/apply`);
};

export const getJobPosting = (jobPostingKey: string) => {
  return http.get<JobPosting>(`common/job-postings/${jobPostingKey}`);
};
