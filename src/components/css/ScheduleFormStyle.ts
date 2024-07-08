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

export const CreateButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
`;
