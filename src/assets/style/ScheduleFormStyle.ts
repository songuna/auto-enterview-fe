import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  height: 100%;
  max-height: 432px;

  .btn {
    padding: 16px 32px;
    border-radius: var(--button-radius);
    font: inherit;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const Settings = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: calc(100% - 80px);
`;

export const Field = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 24px 0;
  background-color: var(--bg-light-blue);
  border-radius: var(--box-radius);
  text-align: center;
`;

export const Label = styled.label``;

export const Text = styled.p`
  margin-bottom: 16px;
  font-weight: 500;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

export const CreateButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
`;

export const NextButton = styled.button`
  background-color: var(--bg-light-gray);
`;
