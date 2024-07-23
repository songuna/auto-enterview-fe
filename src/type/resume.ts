export interface Resume {
  title: string;
  jobWant: string;
  name: string;
  gender: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  address: string;
  education: string;
  schoolName: string;
  experience: {
    experienceName: string;
    startDate: string;
    endDate: string;
  }[];
  techStack: string[];
  career: {
    companyName: string;
    jobCategory: string;
    startDate: string;
    endDate: string;
  }[];
  certificates: {
    certificateName: string;
    certificateDate: string;
  }[];
  portfolio: string;
  resumeImageUrl: string;
}

export interface ResumeKeyUrl {
  resumeKey: string;
  resumeImageUrl: string;
}
