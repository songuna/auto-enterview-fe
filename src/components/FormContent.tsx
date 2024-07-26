import { useState } from "react";
import {
  Buttons,
  CreateButton,
  Field,
  Form,
  Label,
  NextButton,
  Settings,
  Text,
} from "../assets/style/ScheduleFormStyle";
import DatePickerOne from "./input/DatePickerOne";
import TimePicker from "./input/TimePicker";
import { InputDefault } from "../assets/style/input";
import styled from "styled-components";
import { getDateFormat, getTimeFormat } from "../utils/Format";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconButton } from "../assets/style/ReactIconButton";
import { IInterviewData } from "../type/interview";
import {
  postAssignmentSchedule,
  postInterviewParticipants,
  postInterviewSchedule,
} from "../axios/http/interview";

interface FormContentProps {
  currentTab: string;
  jobPostingKey: string;
  stepId: number;
  setTypeEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormContent = ({ currentTab, jobPostingKey, stepId, setTypeEmail }: FormContentProps) => {
  const [assignmentFormData, setAssignmentFormData] = useState({
    endDate: new Date(),
    endHour: new Date(2024, 7, 13, 23, 59),
  });
  const [interviewFormData, setInterviewFormData] = useState<IInterviewData>({
    startDate: new Date(),
    startTime: new Date(2024, 7, 13, 18, 0),
    term: 0,
    times: 0,
  });
  const [dataList, setDataList] = useState<IInterviewData[]>([]);

  // 일정 저장하기 API
  const sendSchedule = async () => {
    const props = { jobPostingKey, stepId };
    const assignmentBody = {
      endDate: assignmentFormData.endDate.toISOString().split("T")[0],
    };

    const interviewBody = dataList.map(data => ({
      startDate: data.startDate.toISOString().split("T")[0],
      startTime: data.startTime.toTimeString().slice(0, 5),
      term: data.term,
      times: data.times,
    }));

    try {
      if (currentTab === "assignment") {
        // 과제 일정 생성
        await postAssignmentSchedule(props, assignmentBody);
      } else {
        // 면접 일정 생성
        await postInterviewSchedule(props, interviewBody);
        // 일정에 따른 지원자 분류
        await postInterviewParticipants(props, interviewBody);
      }
      alert("일정이 성공적으로 저장되었습니다.");
    } catch (error) {
      if (error instanceof Error) {
        alert("일정 생성에 문제가 발생했습니다.");
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  // 일정 생성 후, '다음' 클릭
  const clickNext = () => {
    const response = confirm("예약 메일로 넘어갑니다. 일정 생성을 완료하셨나요?");
    if (response) {
      setTypeEmail(true);
    }
  };

  // 면접일정 추가
  const handleAdd = () => {
    setDataList([...dataList, interviewFormData]);
  };

  // 추가한 면접일정 삭제
  const handleDelete = (idx: number) => {
    const deletedList = [...dataList];
    deletedList.splice(idx, 1);
    setDataList(deletedList);
  };

  return (
    <Form>
      <Settings>
        <Field>
          {currentTab === "assignment" ? (
            <>
              <Label>
                <Text>과제 마감 날짜</Text>
                <DatePickerOne
                  value={assignmentFormData.endDate}
                  onChange={date => setAssignmentFormData({ ...assignmentFormData, endDate: date })}
                />
              </Label>
              <Label>
                <Text>시간</Text>
                <TimePicker
                  disabled={true}
                  value={assignmentFormData.endHour}
                  onChange={time => setAssignmentFormData({ ...assignmentFormData, endHour: time })}
                />
              </Label>
            </>
          ) : (
            <>
              <Label>
                <Text>면접 날짜</Text>
                <DatePickerOne
                  value={interviewFormData.startDate}
                  onChange={date => setInterviewFormData({ ...interviewFormData, startDate: date })}
                />
              </Label>
              <Label>
                <Text>시작 시간</Text>
                <TimePicker
                  value={interviewFormData.startTime}
                  onChange={time => setInterviewFormData({ ...interviewFormData, startTime: time })}
                />
              </Label>
              <Label>
                <Text>간격(분)</Text>
                <NumberInput
                  type="number"
                  placeholder="공고 제목을 입력하세요"
                  value={interviewFormData.term}
                  onChange={e =>
                    setInterviewFormData({ ...interviewFormData, term: +e.target.value })
                  }
                />
              </Label>
              <Label>
                <Text>횟수</Text>
                <NumberInput
                  type="number"
                  placeholder="공고 제목을 입력하세요"
                  value={interviewFormData.times}
                  onChange={e =>
                    setInterviewFormData({ ...interviewFormData, times: +e.target.value })
                  }
                />
              </Label>
              <AddButton onClick={handleAdd} type="button" className="btn">
                일정 추가
              </AddButton>
            </>
          )}
        </Field>
        {currentTab === "interview" && (
          <Schedules>
            {dataList.map((data, idx) => (
              <Schecule key={`schedule${idx}`}>
                <DataText>{getDateFormat(data.startDate)}</DataText>
                <DataText>{getTimeFormat(data.startTime)}</DataText>
                <DataText>{data.term}분 간격</DataText>
                <DataText>{data.times}회 반복</DataText>
                <IconButton type="button" className="delete" onClick={() => handleDelete(idx)}>
                  <RiDeleteBin6Line />
                </IconButton>
              </Schecule>
            ))}
          </Schedules>
        )}
      </Settings>
      <Buttons>
        <CreateButton className="btn" type="button" onClick={sendSchedule}>
          일정 저장하기
        </CreateButton>
        <NextButton className="btn" type="button" onClick={clickNext}>
          다음
        </NextButton>
      </Buttons>
    </Form>
  );
};

const NumberInput = styled(InputDefault)`
  width: 60px;
  background-color: #fff;
  border: 1px solid var(--border-gray-100);
  text-align: right;
`;

const AddButton = styled.button`
  align-self: flex-end;
  font-size: 1.2rem;
  padding: 16px 32px;
  background-color: var(--sub-color);
  color: #fff;
`;

const Schedules = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100% - 132px);
  padding: 16px 0;

  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;

const Schecule = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const DataText = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
`;

export default FormContent;
