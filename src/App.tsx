import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { useEffect, useState } from "react";
import Loading from "./components/common/Loading";

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <RecoilRoot>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        {isLoading ? <Loading /> : <RouterProvider router={router} />}
      </QueryClientProvider>
    </RecoilRoot>
  );
};

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/font/Pretendard-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/font/Pretendard-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/font/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  :root {
    --primary-color: #000694;
    --sub-color: #5690FB;
    --bg-light-blue: #EFF5FF;
    --bg-light-gray: #eee;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Pretendard", sans-serif;
    line-height: 1;

    .title {
      font-size: 2rem;
    }
    .sub-title {
      font-size: 1.5rem;
    }
    .text {
      font-size: 1rem;
    }
    .text-sm {
      font-size: 0.8rem;
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  input, select, textarea {
    &:focus,
    &:active {
      outline: none;
    }
  }
`;

export default App;
