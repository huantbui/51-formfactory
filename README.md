# Form Factory

Example: to use form factory:

```javascript
import { FormFactory } from "../FormFactory";
import { max } from "../validations/max";
import { min } from "../validations/min";

export const LoginForm = () => {
  async function handleOnSubmit(formData: any) {
    console.log("local: formData", formData);
    console.log("form submitted login form");
  }

  return (
    <FormFactory
      fields={[
        {
          type: "email",
          label: "Email",
          name: "email",
          required: true,
          validations: [
            {
              test: (data: string) => min(6, data),
            },
            {
              test: (data: string) => max(10, data),
            },
          ],
        },
        {
          type: "password",
          label: "Password",
          name: "password",
          required: true,
          validations: [
            {
              test: (data: string) => {
                return data?.length <= 3
                  ? `must be more than 3 characters`
                  : undefined;
              },
            },
            {
              test: (data: string) => {
                return data?.length > 7
                  ? `must be less than or equal to 7 characters`
                  : undefined;
              },
            },
          ],
        },
      ]}
      onSubmit={async (formData: any) => await handleOnSubmit(formData)}
    />
  );
};

```