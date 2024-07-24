import { Method } from "../../type/resume";
import { http } from "../instances";

const resumeEndpoint = (method: Method, candidateKey: string, body?: any, config?: any) => {
  const url = `candidates/${candidateKey}/resume`;
  return http[method](url, body, config);
};

export const getResume = (candidateKey: string) => resumeEndpoint("get", candidateKey);
export const postResume = (candidateKey: string, body: any, config?: any) =>
  resumeEndpoint("post", candidateKey, body, config);
export const putResume = (candidateKey: string, body: any, config?: any) =>
  resumeEndpoint("put", candidateKey, body, config);
export const deleteResume = (candidateKey: string) => resumeEndpoint("delete", candidateKey);