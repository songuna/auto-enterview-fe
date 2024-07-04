import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 100px 0;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const SubTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
`;

export const FullBtn = styled.button`
  z-index: 2;
  position: relative;
  width: 100%;
  padding: 8px 0;
  border-radius: var(--button-radius);
  background-color: var(--primary-color);
  font: inherit;
  color: #fff;
`;
