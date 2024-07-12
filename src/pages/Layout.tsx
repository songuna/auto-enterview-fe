import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  padding: 0 32px;
`;

export default Layout;
