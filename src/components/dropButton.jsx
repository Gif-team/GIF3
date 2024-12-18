import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall({
  svg,
  title,
  itemArray,
  onChange,
  selected,
}) {
  // 객체 표현식
  const selectStyles = {
    flex: 1,
    margin: "0 2px",
  };

  // item 상태를 제거하고 props로 받은 selected를 사용
  const handleChange = (event) => {
    // state에 받은 value값 저장
    onChange(event.target.value);
  };

  // 실제 보이는 값
  const renderValue = (selected) => {
    return (
      <div className="flex items-center">
        <img src={svg} alt="icon" className="w-5 h-5 mr-2" />
        {selected || title}
      </div>
    );
  };

  return (
    <div className="flex w-full">
      <FormControl sx={selectStyles}>
        <Select
          displayEmpty
          className="bg-white"
          value={selected}
          onChange={handleChange}
          renderValue={renderValue}
        >
          <MenuItem value="">{title}</MenuItem>
          {itemArray.map((itemValue) => (
            <MenuItem value={itemValue} key={itemValue}>
              {itemValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
