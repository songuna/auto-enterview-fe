import { Link } from "react-router-dom";
import styled from "styled-components";

export const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(48%, 1fr));
  row-gap: 40px;
  column-gap: 4%;
  padding: 40px;
  background-color: var(--bg-light-blue);
`;

export const Info = styled.div`
  display: flex;
  gap: 1rem;
`;

export const InfoTitle = styled.p`
  width: 150px;
  font-weight: 700;
`;

export const InfoDesc = styled.p`
  width: calc(100% - 150px);
`;

export const RecruitLists = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
  border: 1px solid var(--border-gray-100);
  border-radius: var(--box-radius);
`;

export const RecruitList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 1rem 0;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid var(--border-gray-100);
  }
`;

export const LabelWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Label = styled.span<{ dday: number }>`
  display: inline-block;
  width: 0.5rem;
  height: 2rem;
  ${props =>
    props.dday > 0
      ? "background-color: #EEEEEE"
      : props.dday >= -3
        ? "background-color: #F00000"
        : "background-color: #5690FB"};
`;

export const Dday = styled.p`
  width: 6rem;
`;

export const ListTitle = styled(Link)`
  width: 100%;
  max-width: 350px;
  overflow: hidden;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ListCareer = styled.p`
  width: 6rem;
  font-weight: 500;
  text-align: center;
`;

export const ListStep = styled.p`
  flex-shrink: 0;
  font-weight: 700;
`;
