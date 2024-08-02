import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/font/Pretendard-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/font/Pretendard-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/font/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  :root {
    --primary-color: #000694;
    --sub-color: #5690FB;
    --color-red: #E00000;
    --bg-light-blue: #EFF5FF;
    --bg-light-gray: #eee;
    --border-gray-200: #4F4F4F;
    --border-gray-100: #B7B7B7;
    --text-black: #131313;
    --button-radius: 8px;
    --box-radius: 16px;
    --box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: inherit;
  }
  body {
    font-family: "Pretendard", sans-serif;
    line-height: 1;
    color: var(--text-black);

    .inner-1200 {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .title {
      font-size: 1.5rem;
      font-weight: 700;
    }
    .sub-title {
      font-size: 1.3rem;
      font-weight: 700;
    }
    .text {
      font-size: 1.125rem;
    }
    .text-sm {
      font-size: 0.8rem;
    }
  }
  ol, ul {
	list-style: none;
  }
  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  button {
    border: none;
    background-color: transparent;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
  }
  input, select, textarea {
    &:focus,
    &:active {
      outline: none;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
