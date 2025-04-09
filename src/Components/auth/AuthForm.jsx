import { Button } from "../ui/Button";


export const AuthForm = ({ fields, onSubmit, submitText }) => (
  <FormContainer>
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <FormGroup key={field.name}>
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder}
            required={field.required}
          />
        </FormGroup>
      ))}
      <Button type="submit">{submitText}</Button>
    </form>
  </FormContainer>
);