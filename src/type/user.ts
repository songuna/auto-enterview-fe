export interface IUser {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  key: string;
  name: string;
  email: string;
  role: "ROLE_COMPANY" | "ROLE_CANDIDATE";
}

export interface IUserAuth {
  email: string;
  password: string;
}
