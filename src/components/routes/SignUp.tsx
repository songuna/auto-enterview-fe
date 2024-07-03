import { useState, ChangeEvent, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// 회원가입
const SignUp: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    companyEmail: '',
    companyEmailNumber: '',
    companyPassword: '',
    companyName: '',
    companyPhoneNumber: '',
    userName: '',
    userEmail: '',
    userEmailNumber: '',
    userPassword: '',
    userPhoneNumber: ''
  });


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCompanySignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleUserSignUpClick = () => {
    setIsRightPanelActive(false);
  };

    const handleEmailVerification = (email: string) => {
    // 이메일 인증 로직 구현 (예: 이메일로 인증 링크 전송)
    console.log(`이메일 ${email}을(를) 인증합니다.`);
    alert(`이메일 ${email}로 인증번호가 발송되었습니다.`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fields = isRightPanelActive
      ? ['companyEmail', 'companyEmailNumber', 'companyPassword', 'companyName', 'companyPhoneNumber']
      : ['userName', 'userEmail', 'userEmailNumber', 'userPassword', 'userPhoneNumber'];

    for (let field of fields) {
      if (!formData[field]) {
        alert('정보를 입력해주세요');
        return;
      }
    }

    // 입력된 정보 처리 로직
    console.log('Form submitted', formData);

};

const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

// 회원가입 JSX
  return (
    <Wrapper>
    <Container id="container" className={isRightPanelActive ? 'right-panel-active' : ''}>
      <FormContainer className="form-container company-sign-up">
        <Form onSubmit={handleSubmit}>
          <H1>회사 회원가입</H1>
          <Span>정보를 입력해주세요.</Span>
          <EmailCheck>
          <Input type="email" name="companyEmail" placeholder="이메일" value={formData.companyEmail} onChange={handleInputChange} />
          <Button className='emailCheckBtn' type="button" onClick={() => handleEmailVerification(formData.companyEmail || '')}>인증</Button>
          </EmailCheck>
          <Input type="text" name="companyEmailNumber" placeholder="이메일 인증번호" value={formData.companyEmailNumber} onChange={handleInputChange} />
          <PassWordCheck>
          <Input type={isPasswordVisible ? "text" : "password"}  name="companyPassword" placeholder="비밀번호" value={formData.companyPassword} onChange={handleInputChange} />
          <Icon onClick={togglePasswordVisibility}>{isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}</Icon>
          </PassWordCheck>
          <Input type="text" name="companyName" placeholder="회사명" value={formData.companyName} onChange={handleInputChange} />
          <Input type="text" name="companyPhoneNumber" placeholder="회사 전화번호" value={formData.companyPhoneNumber} onChange={handleInputChange} />
          <Button type="submit">회사 등록하기</Button>
        </Form>
      </FormContainer>
      <FormContainer className="form-container user-sign-up">
        <Form onSubmit={handleSubmit}>
          <H1>개인 회원가입</H1>
          <Span>정보를 입력해주세요.</Span>
          <Input type="text" name="userName" placeholder="이름" value={formData.userName} onChange={handleInputChange} />
          <EmailCheck>
          <Input type="email" name="userEmail" placeholder="이메일" value={formData.userEmail} onChange={handleInputChange}></Input>
          <Button className='emailCheckBtn' type="button" onClick={() => handleEmailVerification(formData.companyEmail || '')}>인증</Button>
          </EmailCheck>
          <Input type="text" name="userEmailNumber" placeholder="이메일 인증번호" value={formData.userEmailNumber} onChange={handleInputChange} />
          <PassWordCheck>
          <Input type={isPasswordVisible ? "text" : "password"}  name="userPassword" placeholder="비밀번호" value={formData.userPassword} onChange={handleInputChange} />
          <Icon onClick={togglePasswordVisibility}>{isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}</Icon>
          </PassWordCheck>
          <Input type="text" name="userPhoneNumber" placeholder="핸드폰 번호" value={formData.userPhoneNumber} onChange={handleInputChange} />
          <Button type="submit">회원가입</Button>
        </Form>
      </FormContainer>
      <OverlayContainer className="overlay-container">
        <Overlay className="overlay">
          <OverlayPanel className="overlay-panel overlay-left">
            <H1>개인 회원가입</H1>
            <P>개인이라면 여기에서 회원가입해주세요.</P>
            <Button className="ghost" id="user-signUp" onClick={handleUserSignUpClick}>개인 가입하기</Button>
          </OverlayPanel>
          <OverlayPanel className="overlay-panel overlay-right">
            <H1>회사 회원가입</H1>
            <P>회사라면 여기에서 회원가입해주세요.</P>
            <Button className="ghost" id="company-signUp" onClick={handleCompanySignUpClick}>회사 가입하기</Button>
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
`

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
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
  background: linear-gradient(to right, #000694, #5690FB);
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
  &.overlay-left{
  transform: translateX(-20%);
  }
  &.overlay-right{
  right: 0;
  transform: translateX(0);
  }
`;

const Button = styled.button`
  border-radius: 20px;
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
  &.emailCheckBtn{
    width: 50px;
    height: 45px;
    padding: 0px;
    border-radius: 0px;
    font-size: 10px;
    margin-top: 5px;
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
  margin: 5px 0;
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
`

const PassWordCheck = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Icon = styled.div`
  cursor: pointer;
  margin-left: -30px;
  display: flex;
  align-items: center;
`;

export default SignUp;
