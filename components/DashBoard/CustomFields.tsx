import AppSelect from "@/components/Common/AppSelect";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
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

export function InputField({
  label,
  name,
  register,
  errors,
  type = "text",
  className = "",
  placeholder = "",
}: InputFieldProps) {
  return (
    <div className={`form_boxes ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, { required: "Required" })}
        type={type}
        id={name}
        placeholder={placeholder}
      />
      {errors[name] && <p className="text-danger">{errors[name]?.message}</p>}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: keyof IFormInput;
  select?: string;
  control: Control<IFormInput>;
  errors: FieldErrors<IFormInput>;
  options: { id: string | number; name: string }[];
}

export function SelectField({
  label,
  select = "Select",
  name,
  control,
  errors,
  options,
}: SelectFieldProps) {
  return (
    <div className="form_boxes">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: "Required" }}
        render={({ field }) => (
          <AppSelect
            id={String(name)}
            variant="ghostBorder"
            value={field.value ? String(field.value) : ""}
            onChange={field.onChange}
            placeholder={select}
            options={(options || []).map((option, index) => ({
              value: String(option?.id ?? index),
              label: option?.name,
            }))}
          />
        )}
      />
      {errors[name] && <p className="text-danger">{errors[name]?.message}</p>}
    </div>
  );
}
