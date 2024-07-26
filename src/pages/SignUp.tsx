import { useState, ChangeEvent, FormEvent } from "react";
import styled, { keyframes } from "styled-components";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { postSignup, postCompanySignup } from "../axios/http/user";
import { postSendVerificationCode } from "../axios/http/user";
import { http } from "../axios/instances";
import { useNavigate } from "react-router-dom";

// 회원가입
const SignUp: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [userData, setUserData] = useState({
    companyEmail: "",
    companyEmailNumber: "",
    companyPassword: "",
    companyName: "",
    companyPhoneNumber: "",
    userName: "",
    userEmail: "",
    userEmailNumber: "",
    userPassword: "",
    userPhoneNumber: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCompanySignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleUserSignUpClick = () => {
    setIsRightPanelActive(false);
  };

  // 이메일 중복
  const checkEmailDuplication = async (email: string) => {
    return await http.post("/common/duplicate-email", { email });
  };

  // 이메일 인증 코드 전송
  const handleEmailVerification = async (email: string) => {
    if (!email) {
      alert("이메일을 입력해 주세요.");
      return;
    }
    try {
      await checkEmailDuplication(email);
      try {
        await postSendVerificationCode(email);
        alert("인증번호가 발송되었습니다");
      } catch (error) {
        alert(`인증번호 발송 중 오류가 발생했습니다`);
      }
    } catch (error) {
      alert(`이미 가입된 이메일입니다.`);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fields: (keyof typeof userData)[] = isRightPanelActive
      ? [
          "companyEmail",
          "companyEmailNumber",
          "companyPassword",
          "companyName",
          "companyPhoneNumber",
        ]
      : ["userName", "userEmail", "userEmailNumber", "userPassword", "userPhoneNumber"];

    for (const field of fields) {
      if (!userData[field]) {
        alert("정보를 입력해주세요");
        return;
      }
    }

    try {
      if (isRightPanelActive) {
        // 회사 회원가입 처리
        const companyUserData = {
          email: userData.companyEmail,
          verificationCode: userData.companyEmailNumber,
          password: userData.companyPassword,
          companyName: userData.companyName,
          companyNumber: userData.companyPhoneNumber,
        };
        await postCompanySignup(companyUserData);
      } else {
        // 개인 회원가입 처리
        const userFormData = {
          name: userData.userName,
          email: userData.userEmail,
          verificationCode: userData.userEmailNumber,
          password: userData.userPassword,
          phoneNumber: userData.userPhoneNumber,
        };
        await postSignup(userFormData);
      }

      // 회원가입 성공 처리 로직 추가
      alert("회원가입이 완료되었습니다.");
      console.log("Form submitted", userData);
      navigate("/login");
    } catch (error) {
      alert("회원가입에 실패했습니다.");
      console.error("Signup error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // 비밀번호 유효성 검사 로직 추가
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (validatePassword(value)) {
      setPasswordError("");
    } else {
      setPasswordError("8-16자리 영문 대 소문자, 숫자, 특수문자를 포함해야 합니다");
    }
    setUserData({ ...userData, [e.target.name]: value });
  };

  // 회원가입 JSX
  return (
    <Wrapper>
      <Container id="container" className={isRightPanelActive ? "right-panel-active" : ""}>
        <FormContainer className="form-container company-sign-up">
          <Form onSubmit={handleSubmit}>
            <H1>회사 회원가입</H1>
            <Span>정보를 입력해주세요.</Span>
            <EmailCheck>
              <Input
                type="email"
                name="companyEmail"
                placeholder="이메일"
                value={userData.companyEmail}
                onChange={handleInputChange}
              />
              <Button
                className="emailCheckBtn"
                type="button"
                onClick={() => handleEmailVerification(userData.companyEmail || "")}
              >
                인증
              </Button>
            </EmailCheck>
            <Input
              type="text"
              name="companyEmailNumber"
              placeholder="이메일 인증번호"
              value={userData.companyEmailNumber}
              onChange={handleInputChange}
            />
            <PassWordCheck>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                name="companyPassword"
                placeholder="비밀번호"
                value={userData.companyPassword}
                onChange={handlePasswordChange}
              />
              <Icon onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
              </Icon>
            </PassWordCheck>
            <ErrorSpan>{passwordError}</ErrorSpan>
            <Input
              type="text"
              name="companyName"
              placeholder="회사명"
              value={userData.companyName}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="companyPhoneNumber"
              placeholder="회사 전화번호 ( - 사용)"
              value={userData.companyPhoneNumber}
              onChange={handleInputChange}
            />
            <Button type="submit">회사 등록하기</Button>
          </Form>
        </FormContainer>
        <FormContainer className="form-container user-sign-up">
          <Form onSubmit={handleSubmit}>
            <H1>개인 회원가입</H1>
            <Span>정보를 입력해주세요.</Span>
            <Input
              type="text"
              name="userName"
              placeholder="이름"
              value={userData.userName}
              onChange={handleInputChange}
            />
            <EmailCheck>
              <Input
                type="email"
                name="userEmail"
                placeholder="이메일"
                value={userData.userEmail}
                onChange={handleInputChange}
              ></Input>
              <Button
                className="emailCheckBtn"
                type="button"
                onClick={() => handleEmailVerification(userData.userEmail || "")}
              >
                인증
              </Button>
            </EmailCheck>
            <Input
              type="text"
              name="userEmailNumber"
              placeholder="이메일 인증번호"
              value={userData.userEmailNumber}
              onChange={handleInputChange}
            />
            <PassWordCheck>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                name="userPassword"
                placeholder="비밀번호"
                value={userData.userPassword}
                onChange={handlePasswordChange}
              />
              <Icon onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
              </Icon>
            </PassWordCheck>
            <ErrorSpan>{passwordError}</ErrorSpan>
            <Input
              type="text"
              name="userPhoneNumber"
              placeholder="핸드폰 번호 ( - 사용)"
              value={userData.userPhoneNumber}
              onChange={handleInputChange}
            />
            <Button type="submit">회원가입</Button>
          </Form>
        </FormContainer>
        <OverlayContainer className="overlay-container">
          <Overlay className="overlay">
            <OverlayPanel className="overlay-panel overlay-left">
              <H1>개인 회원가입</H1>
              <P>개인이라면 여기에서 회원가입해주세요.</P>
              <Button className="ghost" id="user-signUp" onClick={handleUserSignUpClick}>
                개인 가입하기
              </Button>
            </OverlayPanel>
            <OverlayPanel className="overlay-panel overlay-right">
              <H1>회사 회원가입</H1>
              <P>회사라면 여기에서 회원가입해주세요.</P>
              <Button className="ghost" id="company-signUp" onClick={handleCompanySignUpClick}>
                회사 가입하기
              </Button>
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </Wrapper>
  );
};

// 회원가입 style
const show = keyframes`
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 800px;
  max-width: 100%;
  min-height: 530px;
  &.right-panel-active .user-sign-up {
    transform: translateX(100%);
  }
  &.right-panel-active .company-sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: ${show} 0.6s;
  }
  &.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }
  &.right-panel-active .overlay {
    transform: translateX(50%);
  }
  &.right-panel-active .overlay-left {
    transform: translateX(0);
  }
  &.right-panel-active .overlay-right {
    transform: translateX(20%);
  }
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  &.company-sign-up {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }
  &.user-sign-up {
    left: 0;
    width: 50%;
    z-index: 2;
  }
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
`;

const Overlay = styled.div`
  background: linear-gradient(to right, #000694, #5690fb);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  &.overlay-left {
    transform: translateX(-20%);
  }
  &.overlay-right {
    right: 0;
    transform: translateX(0);
  }
`;

const Button = styled.button`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #000694;
  background-color: #000694;
  margin-top: 10px;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &.emailCheckBtn {
    width: 50px;
    height: 45px;
    padding: 0px;
    border-radius: 0px;
    font-size: 10px;
    margin-top: 7px;
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
`;

const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 15px 15px;
  margin: 7px 0;
  width: 100%;
`;

const H1 = styled.h1`
  font-weight: bold;
  margin-bottom: 12px;
`;

const Span = styled.span`
  font-size: 12px;
`;

const P = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const EmailCheck = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const PassWordCheck = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Icon = styled.div`
  cursor: pointer;
  margin-left: -30px;
  display: flex;
  align-items: center;
`;

const ErrorSpan = styled.span`
  color: red;
  margin-top: 5px;
  font-size: 12px;
`;

export default SignUp;
