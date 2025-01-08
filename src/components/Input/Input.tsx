import "./Input.css";
import { FC, useState } from "react";
import valid from "/src/assets/valid.svg";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormData } from "../Form/typesForm";
import invalid from "/src/assets/invalid.svg";

export type TInput = {
  id: keyof FormData;
  type: string;
  placeholder: string;
  isRequired: boolean;
  rules: RegisterOptions<FormData, keyof FormData>;
};

const Input: FC<{
  data: TInput;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isSubmitted: boolean;
  setAmount?: React.Dispatch<number>;
}> = ({ data, register, errors, isSubmitted, setAmount }) => {
  const hasError = errors[data.id]?.type;
  const [isTouched, setIsTouched] = useState(false);
  const inputClass = hasError ? "input invalid" : "input";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    if (setAmount) {
      setAmount(Number(e.target.value));
    }
  };

  return (
    <>
      <div className="input-wrapper">
        <input
          className={inputClass}
          id={data.id}
          type={data.type}
          placeholder={data.placeholder}
          {...(data.isRequired ? { required: true } : {})}
          {...register(data.id, data.rules)}
          onChange={handleChange}
        />
        {(isTouched || hasError) && isSubmitted && (
          <img className="input-img" src={hasError ? invalid : valid} alt="" />
        )}
      </div>
      {hasError && (
        <div className="input-error">{errors[data.id]?.message}</div>
      )}
    </>
  );
};

export default Input;
