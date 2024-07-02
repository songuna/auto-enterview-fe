const SignUp = () => {
  return <></>;
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

export default SignUp;
