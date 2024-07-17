export interface CompanyInfo {
  companyInfoKey: string;
  employees: number;
  companyAge: Date;
  companyUrl: string;
  boss: string;
  address: string;
}

export interface PostedJobPoting {
  jobPostingKey: string;
  title: string;
  career: string;
  endDateTime: string;
}

export interface InfoItem {
  title: string;
  desc: string | number | Date;
}
