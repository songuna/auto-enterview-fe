import Select, { GroupBase } from "react-select";

interface Props {
  placeholder: string;
  options: (string | GroupBase<string>)[];
  value: string;
  onChange: (value: string) => void;
}

const SelectInput = ({ placeholder, options, value, onChange }: Props) => {
  return (
    <Select
      options={options}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? "#000694" : "#B7B7B7",
          borderRadius: "8px",
          padding: "6px 5px",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused ? "#000694" : "",
          color: state.isFocused ? "#ffffff" : "#000000",
          padding: "8px 13px",
        }),
      }}
      placeholder={placeholder}
      value={value}
      onChange={value => onChange(value || "")}
    />
  );
};

export default SelectInput;
