import { ReserveEmailBody } from "../../type/reserveEmail";
import { ReserveEmail } from "../../type/sendEmail";
import { http } from "../instances";

export const postReserveEmail = (props: ReserveEmail, body: ReserveEmailBody) => {
  return http.post(
    `companies/${props.companyKey}/job-postings/${props.jobPostingKey}/steps/${props.stepId}/mail`,
    body,
  );
};
