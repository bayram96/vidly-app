import React from "react";

const Input = ({ type, value, name, error, label, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        className="form-control"
        id={name}
        aria-describedby="emailHelp"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
