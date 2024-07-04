import styled, { keyframes } from 'styled-components';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';

const Account = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };



  return(
  <Wrapper>
    <Container id="container">
      <Form>
        <H1>비밀번호 변경</H1>
        <Span>비밀번호를 변경해주세요.</Span>
        <PassWordCheck>
          <Input type={isPasswordVisible ? "text" : "password"} placeholder="기존 비밀번호"/>
          <Icon onClick={togglePasswordVisibility}>{isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}</Icon>
          </PassWordCheck>
          <PassWordCheck>
          <Input type={isPasswordVisible ? "text" : "password"} placeholder="새로운 비밀번호"/>
          <Icon onClick={togglePasswordVisibility}>{isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}</Icon>
          </PassWordCheck>
          <PassWordCheck>
          <Input type={isPasswordVisible ? "text" : "password"} placeholder="새로운 비밀번호 한번 더"/>
          <Icon onClick={togglePasswordVisibility}>{isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}</Icon>
          </PassWordCheck>
          <Input type="text" name="companyName" placeholder="회사명"/>
          <Button type="submit">비밀번호 변경</Button>
          <Button type="submit">회원 탈퇴</Button>
      </Form>
    </Container>
  </Wrapper>
  );
};



// 비밀번호 변경 style
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
  margin-top: 55px;
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
  width: 600px;
  max-width: 100%;
  min-height: 550px;
`

const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`

const H1 = styled.h1`
  font-weight: bold;
  margin-bottom: 12px;
`

const Span = styled.span`
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
`

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 15px 55px;
  margin: 10px 0;
  width: 100%;
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

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #000694;
  background-color: #000694;
  margin-top: 20px;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  width: 100%;
  `




export default Account;
