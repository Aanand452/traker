import React from "react";

import { Input } from "@salesforce/design-system-react";

const BudgetInput = (props) => {
  const { onChange, hideCurrencySign = false, ...childProps } = props;
  
  const onChangeInput = (event, data) => {
    const cleanRegex = /[^.\d]/g;
    const revoveInvalidChars = (tx) =>
      tx.replace(cleanRegex, "")
      .replace(/(\..*)\./g, "$1");
    event.target.value = revoveInvalidChars(event.target.value);
    data.value = revoveInvalidChars(data.value);
    onChange(event, data);
  };

  const onBlurFormat = (value) => {
    if(value==="")
       return
    value = Math.ceil(value)
    onChange({ target: { value } }, { value });
  };

  return (
    <Input
      placeholder="Enter budget"
      label="Budget"
      onChange={onChangeInput}
      fixedTextLeft={!hideCurrencySign && "$"}
      onBlur={() => onBlurFormat(props.value)}
      {...childProps}
    />
  );
};
export default BudgetInput;
