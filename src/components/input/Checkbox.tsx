import { InputCheckbox } from "../../assets/style/input";

interface Props {
  id: string;
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  checked?: boolean;
}

const Checkbox = ({ id, text, onChange, disabled, checked }: Props) => {
  return (
    <>
      <InputCheckbox
        type="checkbox"
        id={id}
        onChange={onChange}
        disabled={disabled}
        checked={checked}
      />
      <label htmlFor={id}>{text}</label>
    </>
  );
};

export default Checkbox;
