import styled from "styled-components";
import { Container, SubTitle } from "../css/Common";
import { ModalType } from "./RecruitBoard";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { NavLink, Outlet, Params, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateButton, Form, Label } from "../css/ScheduleFormStyle";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  type: ModalType;
  id?: Params;
  step: string;
  onClose: () => void;
}

const Modal = ({ type, id, step, onClose }: ModalProps) => {
  const [emailText, setEmailText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/recruit-board/assignment");
  }, [navigate]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailText(e.target.value);
  };

  return (
    <Background>
      <Wrapper>
        <ModalBox>
          <ModalContainer>
            <SubTitle>일정 생성하기</SubTitle>
            <Tabs>
              <Tab
                to="/recruit-board/assignment"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                과제
              </Tab>
              <Tab
                to="/recruit-board/interview"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                면접
              </Tab>
            </Tabs>
            <Field>
              <Outlet />
            </Field>
          </ModalContainer>
          <ModalContainer>
            <SubTitle>예약 메일 발송하기</SubTitle>
            <Field>
              <Form>
                <TextArea name="email" id="email" onChange={e => handleOnChange(e)}>
                  {emailText}
                </TextArea>
                <Label htmlFor="date">날짜</Label>
                <Label htmlFor="time">시간</Label>
                {/* <Controller
                  control={control}
                  name="time"
                  rules={{ required: "근무시간을 선택해주세요." }}
                  defaultValue={new Date(2024, 7, 13, 9, 0)}
                  render={({ field: { onChange, value } }) => (
                    <TimePickerContainer>
                      <DatePicker
                        selected={value}
                        onChange={date => onChange(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                        timeCaption=""
                        customInput={<TimeInput />}
                        disabled={freeHour}
                      />
                    </TimePickerContainer>
                  )}
                /> */}
                <CreateButton className="btn">메일 예약하기</CreateButton>
              </Form>
            </Field>
          </ModalContainer>
        </ModalBox>
        <CloseButton onClick={onClose}>
          <IoMdClose />
        </CloseButton>
      </Wrapper>
    </Background>
  );
};

const Background = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 24px;
  backdrop-filter: blur(3px);
`;

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  max-width: 750px;
  height: 600px;
  margin: 0 auto;
  border-radius: var(--box-radius);
  background-color: var(--primary-color);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 16px;
  width: 60px;
  height: 60px;
  font-size: 2.5rem;
  color: #fff;
`;

const ModalBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  h3 {
    color: #fff;
  }
`;

const ModalContainer = styled(Container)`
  flex-shrink: 0;
  gap: 16px;
  width: 100%;
  height: 100%;
  padding: 32px 24px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Tab = styled(NavLink)`
  padding: 16px 32px;
  border-radius: var(--button-radius);
  background-color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  transition: all 0.3s;

  &:hover,
  &.active {
    background-color: var(--sub-color);
    color: #fff;
    /* color: var(--primary-color); */
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: var(--box-radius);
  background-color: #fff;
`;

const TextArea = styled.textarea``;

const TimePickerContainer = styled.div`
  position: relative;
  z-index: 2;

  .react-datepicker-popper {
    background-color: #ffffff;
    border: 1px solid #b7b7b7;
    border-radius: var(--button-radius);
    transform: translate(0px, -250px) !important;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__time-list {
    height: 250px;
    overflow-y: scroll;
  }

  .react-datepicker__time-list-item {
    list-style: none;
    width: 100px;
    padding: 8px;
    text-align: center;
    cursor: pointer;

    &:hover {
      color: #ffffff;
      background-color: var(--primary-color);
    }

    &[aria-selected="true"] {
      color: #ffffff;
      background-color: var(--primary-color);
    }
  }

  .react-datepicker__aria-live {
    display: none;
  }
`;

const TimeInput = styled.input`
  display: inline-block;
  width: 100px;
  text-align: center;
  padding: 16px;
  border: 1px solid #b7b7b7;
  border-radius: 8px;
  cursor: pointer;
  word-break: keep-all;
  font-size: 1rem;

  &:disabled {
    border: 1px solid var(--bg-light-gray);
    color: var(--bg-light-gray);
    background-color: #f8f8f8;
  }
`;

export default Modal;
