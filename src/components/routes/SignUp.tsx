import { useState } from 'react';
import styled, { keyframes } from 'styled-components';



const SignUp = () => {
   const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };



  return (
    <Container  className={isRightPanelActive ? 'right-panel-active' : ''}>
      <SignUpContainer>
        <Form action="#">
          <H1>회사 계정을 만드시겠어요?</H1>
          <Span>or use your email for registration</Span>
          <Input type="company-email" placeholder="이메일" />
          <Input type="company-email-number" placeholder="이메일 인증번호" />
          <Input type="company-password" placeholder="비밀번호" />
          <Input type="company-name" placeholder="회사명" />
          <Input type="company-phone-number" placeholder="회사 전화번호" />
          <Button>회사 등록하기</Button>
        </Form>
      </SignUpContainer>
      <SignInContainer>
        <Form action="#">
          <H1>개인 회원가입</H1>
          <Span>정보를 입력해주세요.</Span>
          <Input type="user-name" placeholder="이름" />
          <Input type="user-email" placeholder="이메일" />
          <Input type="user-email-number" placeholder="이메일 인증번호" />
          <Input type="user-password" placeholder="비밀번호" />
          <Input type="user-phone-number" placeholder="핸드폰 번호" />
          <Button>회원가입</Button>
        </Form>
      </SignInContainer>
      <OverlayContainer>
        <Overlay>
          <OverlayPanel>
            <H1>개인이라면 여기에서 회원가입해주세요.</H1>
            <P>To keep connected with us please login with your personal info</P>
            <Button className="ghost" id="signIn" onClick={handleSignInClick}>개인 가입하기</Button>
          </OverlayPanel>
          <OverlayPanel>
            <H1>회사 회원가입</H1>
            <P>Enter your personal details and start journey with us</P>
            <Button className="ghost" id="signUp" onClick={handleSignUpClick}>회원가입</Button>
          </OverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};



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

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  &.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }
  &.right-panel-active .sign-up-container {
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

const SignInContainer = styled.div`
  left: 0;
  width: 50%;
  z-index: 2;
  &.form-container{
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  }
`;

const SignUpContainer = styled.div`
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  &.form-container{
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
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
  background: linear-gradient(to right, #ff4b2b, #ff416c);
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
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
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
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const H1 = styled.h1`
  font-weight: bold;
  margin: 0;
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

const Footer = styled.footer`
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
  &.p {
    margin: 10px 0;
  }
  &.i {
    color: red;
  }
  &.a {
    color: #3c97bf;
    text-decoration: none;
  }
`;

export default SignUp;
