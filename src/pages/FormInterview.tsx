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
import DatePickerOne from "../components/input/DatePickerOne";
import TimePicker from "../components/input/TimePicker";
import { InputDefault } from "../assets/style/input";
import styled from "styled-components";

interface IInterviewData {
  startDate: Date;
  startHour: Date;
  term: number;
  count: number;
}

const FormInterview = () => {
  const [formData, setFormData] = useState<IInterviewData>({
    startDate: new Date(),
    startHour: new Date(2024, 7, 13, 18, 0),
    term: 0,
    count: 0,
  });
  const [dataList, setDataList] = useState<IInterviewData[]>([]);

  return (
    <Form>
      <Settings>
        <Field>
          <Label>
            <Text>면접 날짜</Text>
            <DatePickerOne
              value={formData.startDate}
              onChange={date => setFormData({ ...formData, startDate: date })}
            />
          </Label>
          <Label>
            <Text>시작 시간</Text>
            <TimePicker
              value={formData.startHour}
              onChange={date => setFormData({ ...formData, startHour: date })}
            />
          </Label>
          <Label>
            <Text>간격(분)</Text>
            <NumberInput
              type="number"
              placeholder="공고 제목을 입력하세요"
              value={formData.term}
              onChange={e => setFormData({ ...formData, term: e.target.value })}
            />
          </Label>
          <Label>
            <Text>횟수</Text>
            <NumberInput
              type="number"
              placeholder="공고 제목을 입력하세요"
              value={formData.count}
              onChange={e => setFormData({ ...formData, count: e.target.value })}
            />
          </Label>
          <AddButton>일정 추가</AddButton>
        </Field>
      </Settings>
      <Buttons>
        <CreateButton className="btn">일정 저장하기</CreateButton>
        <NextButton className="btn">다음</NextButton>
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

export default FormInterview;
