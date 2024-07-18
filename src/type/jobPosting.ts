export interface JobInfo {
  jobPostingKey: string;
  companyName: string;
  title: string;
  techStack: string[];
  endDate: string;
}

export interface JobPosting {
  companyKey: 1;
  title: string;
  jobCategory: string;
  career: number;
  techStack: string[];
  jobPostingStep: string[];
  workLocation: string;
  education: string;
  employmentType: string;
  salary: number;
  workTime: string;
  startDate: Date;
  endDate: Date;
  jobPostingContent: string;
  image: File;
  passingNumber: number;
}

export interface JobPostingForCompany {
  jobPostingkey: string;
  title: string;
  jobCategory: string;
  startDateTime: Date;
  endDateTime: Date;
}

export type JobPostingList = JobPostingForCompany[];
