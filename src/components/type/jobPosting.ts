export interface JobPosting {
  title: string;
  jobCategory: string;
  career: number;
  techStack: string[];
  jobPostingStep: string[];
  workLocation: string;
  education: string;
  employmentType: string;
  salary: string;
  workTime: string;
  startDateTime: string;
  endDateTime: string;
  jobPostingContent: string;
  image: {
    fileName: string;
    originalFileName: string;
    filePath: string;
  };
}
