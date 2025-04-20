import { Button } from "../uiComponent/Button";
// Components/auth/AuthForm.jsx
import React from 'react';

export const AuthForm = ({ fields, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type || 'text'}
            name={field.name}
            required={field.required}
            onChange={onChange} // Appelle la fonction onChange
          />
        </div>
      ))}
    </form>
  );
};