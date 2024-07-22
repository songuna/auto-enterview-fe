import styled from "styled-components";
import { Container, SubTitle } from "../assets/style/Common";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateButton, Field, Form, Label, Text } from "../assets/style/ScheduleFormStyle";
import { IoMdClose } from "react-icons/io";
import { postInterviewParticipants, postInterviewSchedule } from "../axios/http/interview";
import { ModalProps } from "../type/modal";
import DatePickerOne from "../components/input/DatePickerOne";
import TimePicker from "../components/input/TimePicker";

const Modal = ({ type, key, step, onClose }: ModalProps) => {
  console.log(key);
  const [emailText, setEmailText] = useState("");
  const [typeEmail, setTypeEmail] = useState(false);
  const [emailData, setEmailData] = useState({
    endDate: new Date(),
    endHour: new Date(2024, 7, 13, 18, 0),
  });
  const navigate = useNavigate();

  useEffect(() => {
    type === "email" && setTypeEmail(true);
  }, [navigate, type]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailText(e.target.value);
  };

  // 일정 저장하기 API
  const sendSchedule = async () => {
    const props = { jobPostingKey: key, stepId: step };
    try {
      // 일정에 따른 지원자 분류
      await postInterviewParticipants(props);
      // 면접 일정 생성
      await postInterviewSchedule(props);
      alert("일정이 성공적으로 저장되었습니다.");
    } catch (error) {
      alert("일정 생성에 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 일정 생성 후, '다음' 클릭
  const clickNext = () => {
    const response = confirm("예약 메일로 넘어갑니다. 일정 생성을 완료하셨나요?");
    if (response) {
      setTypeEmail(true);
    }
  };

  // 메일 예약하기
  const sendEmail = async () => {
    // try {
    //   await
    // } catch (error) {
    // }
  };

  return (
    <Background>
      <Wrapper>
        <ModalBox $type={typeEmail}>
          <ModalContainer>
            <SubTitle>일정 생성하기</SubTitle>
            <Tabs>
              <Tab
                to={`/recruit-board/${key}/assignment`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                과제
              </Tab>
              <Tab
                to={`/recruit-board/${key}/interview`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                면접
              </Tab>
            </Tabs>
            <FormArea>
              <Outlet context={{ sendSchedule, clickNext }} />
            </FormArea>
          </ModalContainer>
          <ModalContainer>
            <SubTitle>예약 메일 발송하기</SubTitle>
            <Field>
              <Form>
                <TextArea
                  name="email"
                  id="email"
                  onChange={e => handleOnChange(e)}
                  placeholder="일정은 자동으로 포함됩니다. 일정 외에 추가 전달사항이 있으시면 작성해주세요."
                  value={emailText}
                ></TextArea>
                <Field>
                  <Label>
                    <Text>과제 마감 날짜</Text>
                    <DatePickerOne
                      value={emailData.endDate}
                      onChange={date => setEmailData({ ...emailData, endDate: date })}
                    />
                  </Label>
                  <Label>
                    <Text>시간</Text>
                    <TimePicker
                      value={emailData.endHour}
                      onChange={date => setEmailData({ ...emailData, endHour: date })}
                    />
                  </Label>
                </Field>
                <CreateButton className="btn" type="button" onClick={sendEmail}>
                  메일 예약하기
                </CreateButton>
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

const ModalBox = styled.div<{ $type: boolean }>`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  transform: ${props => (props.$type ? "translateX(-100%)" : "translateX(0)")};
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
  }
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: var(--box-radius);
  background-color: #fff;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 15rem;
  padding: 16px;
  border: 1px solid var(--border-gray-100);
  border-radius: var(--button-radius);
  resize: none;
  font: inherit;
`;

export default Modal;
