import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IFormInput } from "./AddListing";

interface InputFieldProps {
  label: string;
  name: keyof IFormInput;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  type?: string;
  className?: string;
  placeholder?: string;
}

export function InputField({ label, name, register, errors, type = "text", className = "", placeholder = "" }: InputFieldProps) {
  return (
    <div className={`form_boxes ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input {...register(name, { required: "Required" })} type={type} id={name} placeholder={placeholder} />
      {errors[name] && <p className="text-danger">{errors[name]?.message}</p>}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: keyof IFormInput;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  options: { id: string | number; name: string }[];
}

export function SelectField({ label, name, register, errors, options }: SelectFieldProps) {
  return (
    <div className="form_boxes">
      <label htmlFor={name}>{label}</label>
      <select className="form-select" {...register(name, { required: "Required" })} defaultValue={""} id={name}>
        <option value="" disabled>
          Select
        </option>
        {options.map((option, index) => (
          <option key={option.id ? option.id : index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-danger">{errors[name]?.message}</p>}
    </div>
  );
}
