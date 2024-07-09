import axios from "axios";
import { useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GiSaveArrow } from "react-icons/gi";
import { HiOutlinePlus } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Inner, SubTitle, UserName, Wrapper } from "../css/Common";
import { IconButton } from "../css/ReactIconButton";

const infoTitles = ["대표자", "설립년도", "주소", "사원수", "회사 홈페이지 URL"];

const infoTypes = ["text", "date", "text", "number", "text"];

interface ICompanyInfo {
  boss: string;
  company_age: number;
  address: string;
  employees: number;
  company_url: string;
  created_at: number;
  updated_at: number;
}

const CompanyMypage = () => {
  /* todo: api 회사정보(info) 받아오기, 채용공고 목록 받아오기 */
  const [info, setInfo] = useState<ICompanyInfo>();
  const [editMode, setEditMode] = useState(false);
  const [bossValue, setBossValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [employeesValue, setEmployeesValue] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  const companyKey = "";
  const infoURL = `/companies/${companyKey}/information`;
  const values = [bossValue, ageValue, addressValue, employeesValue, urlValue];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "대표자") {
      setBossValue(value);
    } else if (name === "설립년도") {
      setAgeValue(value);
    } else if (name === "주소") {
      setAddressValue(value);
    } else if (name === "사원수") {
      setEmployeesValue(value);
    } else if (name === "회사 홈페이지 URL") {
      setUrlValue(value);
    }
  };

  const cancelEdit = () => {
    setEditMode(edit => !edit);
  };

  const saveInfo = async () => {
    const body = {
      employees: employeesValue,
      company_age: ageValue,
      company_url: urlValue,
      boss: bossValue,
      address: addressValue,
    };
    const bodyFill = Object.values(body).every(v => v.trim());

    if (bodyFill) {
      try {
        if (info) {
          await axios.put(`${infoURL}`, body);
        } else {
          await axios.post(`${infoURL}`, body);
        }
        setEditMode(edit => !edit);
      } catch (error) {
        alert("회원 정보를 저장하는데 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("회사 정보를 모두 입력해주세요.");
    }
  };

  const editInfo = () => {
    setEditMode(edit => !edit);
    firstInputRef.current?.focus();
  };

  return (
    <Wrapper>
      <Inner className="inner-1200">
        <UserName>{"(주)회사 이름"}</UserName>
        <Container>
          <Top>
            <SubTitle>회사 정보</SubTitle>
            <Buttons>
              {editMode ? (
                <>
                  <IconButton className="cancel" onClick={cancelEdit}>
                    <IoMdClose />
                  </IconButton>
                  <IconButton className="save" onClick={saveInfo}>
                    <GiSaveArrow />
                  </IconButton>
                </>
              ) : (
                <IconButton className="edit" onClick={editInfo}>
                  <CiEdit />
                </IconButton>
              )}
            </Buttons>
          </Top>
          <UserInfo>
            {editMode
              ? infoTitles.map((info, idx) => (
                  <Info className="text" key={info}>
                    <InfoTitle>{info}</InfoTitle>
                    {idx === 0 ? (
                      <InfoInput
                        type={infoTypes[idx]}
                        name={info}
                        value={values[idx]}
                        onChange={onChange}
                        ref={firstInputRef}
                      />
                    ) : infoTypes[idx] === "number" ? (
                      <InfoInput
                        type={infoTypes[idx]}
                        name={info}
                        value={values[idx]}
                        min={0}
                        onChange={onChange}
                      />
                    ) : infoTypes[idx] === "date" ? (
                      <InfoInput
                        type={infoTypes[idx]}
                        name={info}
                        value={values[idx]}
                        onChange={onChange}
                      />
                    ) : (
                      <InfoInput
                        type={infoTypes[idx]}
                        name={info}
                        value={values[idx]}
                        onChange={onChange}
                      />
                    )}
                  </Info>
                ))
              : infoTitles.map(info => (
                  <Info className="text" key={info}>
                    <InfoTitle>{info}</InfoTitle>
                    <InfoDesc>{info}</InfoDesc>
                  </Info>
                ))}
          </UserInfo>
        </Container>
        <Container>
          <Top>
            <SubTitle className="sub-title">등록한 채용 공고 목록</SubTitle>
            <CreatePost to="/create-jobpost">
              <HiOutlinePlus />
            </CreatePost>
          </Top>
          <RecruitLists>
            <RecruitList>
              <LabelWrap>
                <Label />
                <Dday>{"D-3"}</Dday>
              </LabelWrap>
              <ListTitle>
                {"제목입니다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ"}
              </ListTitle>
              <ListCareer>{"경력"}</ListCareer>
              <ListStep>{"서류 접수중"}</ListStep>
            </RecruitList>
            <RecruitList>
              <LabelWrap>
                <Label />
                <Dday>{"D-3"}</Dday>
              </LabelWrap>
              <ListTitle>
                {"제목입니다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ"}
              </ListTitle>
              <ListCareer>{"경력"}</ListCareer>
              <ListStep>{"서류 접수중"}</ListStep>
            </RecruitList>
          </RecruitLists>
        </Container>
      </Inner>
    </Wrapper>
  );
};

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(48%, 1fr));
  row-gap: 40px;
  column-gap: 4%;
  padding: 40px;
  background-color: var(--bg-light-blue);
`;

const Info = styled.div`
  display: flex;
  gap: 1rem;
`;

const InfoTitle = styled.p`
  width: 150px;
  font-weight: 700;
`;

const InfoInput = styled.input`
  position: relative;
  width: calc(100% - 150px);
  padding: 2px 0;
  border: none;
  border-bottom: 1px dashed var(--border-gray-100);
  background-color: transparent;

  // 캘린더 클릭 영역을 input 전체 영역으로 설정
  &[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-position: 100% -3px;
    cursor: pointer;
  }
`;

const InfoDesc = styled.p`
  width: calc(100% - 150px);
`;

const CreatePost = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--button-radius);
  background-color: var(--primary-color);
  font-size: 1.5rem;
  color: #fff;
`;

const RecruitLists = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  border: 1px solid var(--border-gray-100);
  border-radius: var(--box-radius);
`;

const RecruitList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  &:not(:last-child) {
    border-bottom: 1px solid var(--border-gray-100);
  }
`;

const LabelWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.span`
  display: inline-block;
  width: 0.5rem;
  height: 2rem;
  background-color: #00cc21;
`;

const Dday = styled.p``;

const ListTitle = styled.h4`
  width: 450px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ListCareer = styled.p``;

const ListStep = styled.p`
  font-weight: 700;
`;

export default CompanyMypage;
