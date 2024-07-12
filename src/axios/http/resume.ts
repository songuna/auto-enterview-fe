import { Method } from "../../../type/resume";
import { http } from "../instances";

const resumeEndpoint = (method: Method, candidateKey: string) => {
  const url = `candidates/${candidateKey}/resume`;
  return http[method](url);
};

export const getResume = (candidateKey: string) => resumeEndpoint("get", candidateKey);
export const postResume = (candidateKey: string) => resumeEndpoint("post", candidateKey);
export const putResume = (candidateKey: string) => resumeEndpoint("put", candidateKey);
export const deleteResume = (candidateKey: string) => resumeEndpoint("delete", candidateKey);
