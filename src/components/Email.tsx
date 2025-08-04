import { useState } from "react";
import { Field } from "../FormFactory";

type EmailProps = {
  field: Field;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Email = (props: EmailProps) => {
  const { label, required } = props.field;
  const [error, setError] = useState<string | null>(null);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!EMAIL_REGEX.test(e.target.value)) {
      setError("Invalid email address");
      return;
    }
    setError(null);
    return;
  };
  return (
    <>
      <label htmlFor="email">{label || "Email"} </label>
      <input
        type="email"
        id="email"
        name="email"
        required={required}
        onChange={handleOnchange}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
};
