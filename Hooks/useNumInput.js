import React, { useState } from "react";

const useNumInput = (intialValue) => {
  const [value, setValue] = useState(intialValue);
  const onChange = text => {
    if (!isNaN(parseInt(text)) ||  text === ""){
        setValue(text);
    }
  };
  return { value, onChange };
};

export default useNumInput;