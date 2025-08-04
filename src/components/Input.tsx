import { useState } from "react";
import { Field } from "../FormFactory";

type InputProps = {
  field: Field;
};

export const Input = ({ field }: InputProps) => {
  const [error, setError] = useState<string | null>(null);
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    return;
  };
  return (
    <>
      <label htmlFor="email">{field.label || "Email"} </label>
      <input
        type={field.type}
        id={field.name}
        name={field.name}
        required={field.required || false}
        onChange={handleOnchange}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
};
