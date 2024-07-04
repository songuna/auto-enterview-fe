import styled, { keyframes } from 'styled-components';
import React, { useState } from 'react';

const FindEmail: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone) {
      alert('정보를 입력해주세요');

  return (
  <Wrapper>
    <Container id="container">
      <Form onSubmit={handleSubmit}>
        <H1>이메일 찾기</H1>
        <Span>이름과 휴대폰 번호를 입력해주세요.</Span>
        <Input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="text" placeholder="휴대폰 번호" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        <Button>이메일 찾기</Button>
      </Form>
    </Container>
  </Wrapper>

  );
};




 //이메일 찾기 style
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
  width: 500px;
  max-width: 100%;
  min-height: 480px;
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

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 15px 40px;
  margin: 10px 0;
  width: 100%;
`

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

const Span = styled.span`
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
`
export default FindEmail;
