import "./Input.css";
import { FC, useState } from "react";
import valid from "/src/assets/valid.svg";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormData } from "../Form/formUtils";
import invalid from "/src/assets/invalid.svg";
import { AppDispatch } from "../../store";
import { setAmount } from "../Form/PrescoringFormSlice";
import { TScoring } from "../Scoring/Scoring";

export type TInput = {
  id: keyof FormData;
  type: string;
  placeholder: string;
  isRequired: boolean;
  rules: RegisterOptions<FormData, keyof FormData>;
};

export type TInputScoring = {
  id: keyof TScoring;
  type: string;
  placeholder: string;
  isRequired: boolean;
  rules: RegisterOptions<TScoring, keyof TScoring>;
};

export const Input: FC<{
  data: TInput;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isSubmitted: boolean;
  dispatch?: AppDispatch;
}> = ({ data, register, errors, isSubmitted, dispatch }) => {
  const hasError = errors[data.id]?.type;
  const [isTouched, setIsTouched] = useState(false);
  const inputClass = hasError ? "input invalid" : "input";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    if (dispatch) {
      dispatch(setAmount(Number(e.target.value)));
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
        {(isTouched || hasError) && data.id !== "middleName" && isSubmitted && (
          <img className="input-img" src={hasError ? invalid : valid} alt="" />
        )}
      </div>
      {hasError && (
        <div className="input-error">{errors[data.id]?.message}</div>
      )}
    </>
  );
};

export const InputScoring: FC<{
  data: TInputScoring;
  register: UseFormRegister<TScoring>;
  errors: FieldErrors<TScoring>;
  isSubmitted: boolean;
  dispatch?: AppDispatch;
}> = ({ data, register, errors, isSubmitted }) => {
  const hasError = errors[data.id]?.type;
  const [isTouched, setIsTouched] = useState(false);
  const inputClass = hasError ? "input invalid" : "input";

  const handleChange = () => {
    setIsTouched(true);
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
