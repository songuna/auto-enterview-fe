import { ResumeData, ResumeKeyUrl } from "../../type/resume";
import { http } from "../instances";

export const getResume = (candidateKey: string): Promise<ResumeData> => {
  return http.get<ResumeData>(`candidates/${candidateKey}/resume`);
};

export const postResume = (candidateKey: string, body: any, config: any): Promise<ResumeKeyUrl> => {
  return http.post<ResumeKeyUrl>(`candidates/${candidateKey}/resume`, body, config);
};

export const putResume = (candidateKey: string, body: any, config: any): Promise<ResumeKeyUrl> => {
  return http.put<ResumeKeyUrl>(`candidates/${candidateKey}/resume`, body, config);
};

export const deleteResume = (candidateKey: string) => {
  return http.delete(`candidates/${candidateKey}/resume`);
};
