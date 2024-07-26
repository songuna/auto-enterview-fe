import Select, { GroupBase, OptionsOrGroups } from "react-select";

interface Props {
  placeholder: string;
  options: OptionsOrGroups<any, GroupBase<any>> | undefined;
  value: string;
  onChange: (value: string) => void;
}

/**
 * options 형태:
  [
    { value: "backend", label: "서버/백엔드 개발" },
    { value: "frontend", label: "프론트엔드 개발" }
  ]

 * value와 바뀌었을 때 값을 바꾸어주는 함수 onChange를 넘겨야합니다.
 */

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
      value={options?.filter(option => option.value === value)}
      onChange={value => onChange(value.value)}
    />
  );
};

export default SelectInput;
