import styled from "styled-components";

export const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--button-radius);
  font-size: 1.5rem;

  &.cancel {
    background-color: var(--bg-light-gray);
    border: 1px solid var(--border-gray-100);
  }
  &.save {
    background-color: #00cc21;
  }
  &.edit {
    background-color: var(--primary-color);
    color: #fff;
  }
  &.delete {
    color: var(--color-red);
  }
`;
