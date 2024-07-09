import { InputCheckbox } from "../css/input";

interface Props {
  id: string;
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ id, text, onChange }: Props) => {
  return (
    <>
      <InputCheckbox type="checkbox" id={id} onChange={onChange} />
      <label htmlFor={id}>{text}</label>
    </>
  );
};

export default Checkbox;
