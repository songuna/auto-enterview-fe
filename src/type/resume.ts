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
  techStack: string[];
  experience: {
    experienceName: string;
    startDate: string;
    endDate: string;
  }[];
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

export interface ResumeData extends Resume {
  jobCategory: string;
  qualifications: string[];
}

export interface ResumeKeyUrl {
  resumeKey: string;
  resumeImageUrl: string;
}
