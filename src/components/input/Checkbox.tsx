import { InputCheckbox } from "../css/input";

interface Props {
  id: string;
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Checkbox = ({ id, text, onChange, disabled }: Props) => {
  return (
    <>
      <InputCheckbox type="checkbox" id={id} onChange={onChange} disabled={disabled} />
      <label htmlFor={id}>{text}</label>
    </>
  );
};

export default Checkbox;
