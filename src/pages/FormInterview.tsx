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
import { getDateFormat, getTimeFormat } from "../utils/Format";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconButton } from "../assets/style/ReactIconButton";
import { useOutletContext } from "react-router-dom";
import { IInterviewData, SendScheduleConText } from "../type/interview";

const FormInterview = () => {
  const [formData, setFormData] = useState<IInterviewData>({
    date: new Date(),
    startTime: new Date(2024, 7, 13, 18, 0),
    term: 0,
    times: 0,
  });
  const [dataList, setDataList] = useState<IInterviewData[]>([]);
  const { sendSchedule, clickNext } = useOutletContext<SendScheduleConText>();

  // 면접일정 추가
  const handleAdd = () => {
    setDataList([...dataList, formData]);
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
          <Label>
            <Text>면접 날짜</Text>
            <DatePickerOne
              value={formData.date}
              onChange={date => setFormData({ ...formData, date: date })}
            />
          </Label>
          <Label>
            <Text>시작 시간</Text>
            <TimePicker
              value={formData.startTime}
              onChange={date => setFormData({ ...formData, startTime: date })}
            />
          </Label>
          <Label>
            <Text>간격(분)</Text>
            <NumberInput
              type="number"
              placeholder="공고 제목을 입력하세요"
              value={formData.term}
              onChange={e => setFormData({ ...formData, term: +e.target.value })}
            />
          </Label>
          <Label>
            <Text>횟수</Text>
            <NumberInput
              type="number"
              placeholder="공고 제목을 입력하세요"
              value={formData.times}
              onChange={e => setFormData({ ...formData, times: +e.target.value })}
            />
          </Label>
          <AddButton onClick={handleAdd} type="button" className="btn">
            일정 추가
          </AddButton>
        </Field>
        <Schedules>
          {dataList.map((data, idx) => (
            <Schecule key={`schedule${idx}`}>
              <DataText>{getDateFormat(data.date)}</DataText>
              <DataText>{getTimeFormat(data.startTime)}</DataText>
              <DataText>{data.term}분 간격</DataText>
              <DataText>{data.times}회 반복</DataText>
              <IconButton type="button" className="delete" onClick={() => handleDelete(idx)}>
                <RiDeleteBin6Line />
              </IconButton>
            </Schecule>
          ))}
        </Schedules>
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

export default FormInterview;
