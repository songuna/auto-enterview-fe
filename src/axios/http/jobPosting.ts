import { AxiosRequestConfig } from "axios";
import { CompanyInfo, PostedJobPoting } from "../../type/company";
import { JobInfo, JobPosting, JobPostingList } from "../../type/jobPosting";
import { http } from "../instances";

// 전체 공고 조회
export const getJobPostings = (page: number) => {
  return http.get<JobInfo[]>(`common/job-postings?page=${page}`);
};

// 회사 마이페이지 공고 조회
export const getPostedJobPostings = (companyKey: string) => {
  return http.get<PostedJobPoting[]>(`common/${companyKey}/posted-job-postings`);
};

export const postCompaniesJobPosting = (
  companyKey: number,
  data: JobPosting,
  config?: AxiosRequestConfig,
) => {
  return http.post<JobPosting>(`companies/${companyKey}/job-postings`, data, config);
};

export const putCompaniesJobPosting = (companyKey: number, data: JobPosting) => {
  return http.put<JobPosting>(`companies/${companyKey}/job-posting`, data);
};

export const postJobPostingApply = (jobPostingKey: string) => {
  return http.post(`candidate/job-posting/${jobPostingKey}/apply`);
};

export const getJobPosting = (jobPostingKey: string) => {
  return http.get<JobPosting>(`common/job-postings/${jobPostingKey}`);
};

export const getCompanyPostedJobPostings = (companyKey: number) => {
  return http.get<JobPostingList>(`companies/${companyKey}/posted-job-postings`);
};

export const getCompanyInfomation = (companyKey: number) => {
  return http.get<CompanyInfo>(`companies/${companyKey}/information`);
};
