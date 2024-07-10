import styled from "styled-components";

export const Form = styled.div`
  height: 100%;

  button {
    padding: 16px 32px;
    border-radius: var(--button-radius);
    font: inherit;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const Settings = styled.div`
  height: calc(100% - 66px);
`;

export const Label = styled.label``;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const CreateButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
`;

export const NextButton = styled.button`
  background-color: var(--bg-light-gray);
`;
