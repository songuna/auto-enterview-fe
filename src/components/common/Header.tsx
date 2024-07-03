import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { IoPersonCircleOutline, IoSettings } from "react-icons/io5";
import { useState } from "react";
import { FaKey } from "react-icons/fa6";
import axios from "axios";

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const logOut = async () => {
    const ok = confirm("로그아웃 하시겠어요?");
    if (ok) {
      try {
        await axios.post("/common/signout");
        navigate("/main");
      } catch (error) {
        alert("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <Wrapper>
      <HdInner className="inner-1200">
        <Logo>
          <Link to="/">
            <Img src="/logo.svg" />
          </Link>
        </Logo>
        <Buttons>
          {isLogin ? (
            <>
              <Logout className="log-out" onClick={logOut}>
                <HiArrowLeftOnRectangle />
                <Text>로그 아웃</Text>
              </Logout>
              {/* <Button to={isCompany ? "/company-mypage" : "/user-mypage"}> */}
              <Button to="/">
                <IoPersonCircleOutline />
                <Text>마이 페이지</Text>
              </Button>
              <Button className="account" to={"/account"}>
                <IoSettings />
                <Text>계정 정보</Text>
              </Button>
            </>
          ) : (
            <Button className="login" to={"/sign-up"}>
              <FaKey />
              <Text>로그인/회원가입</Text>
            </Button>
          )}
        </Buttons>
      </HdInner>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  padding: 0.5rem 1.5rem;
  border-bottom: 1px solid var(--border-gray-100);
  backdrop-filter: blur(10px);
`;

const HdInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1``;

const Img = styled.img`
  width: 90px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logout = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 1rem 1.2rem;
  font-size: 1.5rem;
  color: var(--color-red);
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 1rem 1.2rem;
  font-size: 1.5rem;

  svg {
    color: var(--primary-color);
  }
  &.account,
  &.login {
    /* border: 1px solid var(--primary-color); */
    border-radius: var(--button-radius);
    box-shadow: inset 0 0 8px rgba(132, 132, 132, 0.5);
  }
`;

const Text = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

export default Header;
