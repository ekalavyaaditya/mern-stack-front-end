import React from "react";
import propTypes from "prop-types";
import { Input as InputAnt } from "antd";

const Input = ({ type, name, placeholder, value, onChange,style }) => {
  return (
    <div className="from-group">
      <InputAnt
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        style={style}
      />
    </div>
  );
};

Input.propTypes = {
  name: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Input;