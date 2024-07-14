import React from "react";

export default function Input({ type, value, onChange, placeholder }) {
  return (
    <input
      className='border border-black p-2 m-2'
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
