import { useState } from "react";
import { Email } from "./components/Email";
import { Input } from "./components/Input";

export interface Validation {
  test: Function;
}

export interface Field {
  type: "email" | "password" | "text" | "tel";
  label: string;
  name: string;
  required?: boolean;
  validations?: Validation[];
}

interface FormFactoryProps {
  fields: Field[];
  onSubmit: (formData: any) => void;
}

export const FormFactory = ({ fields, onSubmit }: FormFactoryProps) => {
  const [errors, setErrors] = useState<string[] | []>([]);

  const handleOnSubmit = async (formData: any) => {
    formData.preventDefault();
    setErrors([]); // Reset errors on new submission
    const fieldResults = formData.target;

    // go through each field and validate
    for (let i = 0; i < fieldResults.length; i++) {
      if (fieldResults[i].type !== "submit") {
        const fieldErrors: string[] = [];
        // go through each field's validations
        fields?.[i]?.validations?.forEach((validation) => {
          const error = validation.test(fieldResults[i].value);
          if (error) fieldErrors.push(error);
        });
        if (fieldErrors?.length > 0) {
          setErrors((prevErrors) => [
            ...prevErrors,
            `${fieldResults[i].name}: ${fieldErrors.join(". ")}`,
          ]);
        }
      }
    }
    if (errors.length === 0) {
      await onSubmit(formData);
    }
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case "email":
        return <Email field={field} />;
      default:
        return <Input field={field} />;
    }
  };
  return (
    <>
      {errors.length > 0 && (
        <>
          <div>Failed to submit due to errors:</div>
          <div style={{ color: "red" }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </div>
          <br />
        </>
      )}
      <form onSubmit={handleOnSubmit}>
        {fields.map((field, index) => {
          return <div key={index}>{renderField(field)}</div>;
        })}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
