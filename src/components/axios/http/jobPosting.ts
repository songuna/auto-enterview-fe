import { AxiosRequestConfig } from "axios";
import { companyInfo } from "../../type/company";
import { JobPosting, JobPostingList } from "../../type/jobPosting";
import { http } from "../instances";

export const postCompaniesJobPosting = (
  companyKey: number,
  data: JobPosting,
  config: AxiosRequestConfig,
) => {
  return http.post<JobPosting>(`companies/${companyKey}/job-posting`, data, config);
};

export const putCompaniesJobPosting = (companyKey: number, data: JobPosting) => {
  return http.put<JobPosting>(`companies/${companyKey}/job-posting`, data);
};

export const postJobPostingApply = (jobPostingKey: number) => {
  return http.post(`job-posting/${jobPostingKey}`);
};

export const getJobPosting = (jobPostingKey: number) => {
  return http.get<JobPosting>(`common/job-postings/${jobPostingKey}`);
};

export const getCompanyPostedJobPostings = (companyKey: number) => {
  return http.get<JobPostingList>(`companies/${companyKey}/posted-job-postings`);
};

export const getCompanyInfomation = (companyKey: number) => {
  return http.get<companyInfo>(`companies/${companyKey}/information`);
};
