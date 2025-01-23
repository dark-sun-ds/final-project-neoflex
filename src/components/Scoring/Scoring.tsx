import { useForm } from "react-hook-form";
import { InputScoring, TInputScoring } from "../Input/Input";
import Label from "../Label/Label";
import { SelectScoring, TSelectScoring } from "../Select/Select";
import "./Scoring.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import Loader from "../Loader/Loader";
import { Button } from "../Button/Button";
import { setIsSubmitted, submitScoring } from "./ScoringSlice";

export type TScoring = {
  gender: "MALE" | "FEMALE";
  maritalStatus: "MARRIED" | "DIVORCED" | "SINGLE" | "WIDOW_WIDOWER";
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employment: {
    employmentStatus:
      | "UNEMPLOYED"
      | "SELF_EMPLOYED"
      | "EMPLOYED"
      | "BUSINESS_OWNER";
    employerINN: "number";
    salary: number;
    position: "WORKER" | "MID_MANAGER" | "TOP_MANAGER" | "OWNER";
    workExperienceTotal: number;
    workExperienceCurrent: number;
  };
  account: string;
};
const step2 = [
  {
    labelTitle: "What's your gender",
    htmlFor: "gender",
    componentType: "select",
    inputProps: {
      id: "gender" as keyof TScoring,
      options: [
        { label: "Male", value: "MALE" },
        { label: "Female", value: "FEMALE" },
      ],
      rules: {},
      isRequired: true,
    },
  },
  {
    labelTitle: "Your marital status",
    htmlFor: "maritalStatus",
    componentType: "select",
    inputProps: {
      id: "maritalStatus" as keyof TScoring,
      options: [
        { label: "Married", value: "MARRIED" },
        { label: "Divorced", value: "DIVORCED" },
        { label: "Single", value: "SINGLE" },
        { label: "Widow/Widower", value: "WIDOW_WIDOWER" },
      ],
      rules: {
        required: "Can`t be empty",
      },
      isRequired: true,
    },
  },
  {
    labelTitle: "Your number of dependents",
    htmlFor: "dependentAmount",
    componentType: "input",
    inputProps: {
      id: "dependentAmount" as keyof TScoring,
      type: "number",
      placeholder: "For example 2",
      rules: {
        required: "Can`t be empty",
        min: { value: 0, message: "Number of dependents should be at least 0" },
      },
      isRequired: true,
    },
  },
  {
    labelTitle: "Date of issue of the passport",
    htmlFor: "passportIssueDate",
    componentType: "input",
    inputProps: {
      id: "passportIssueDate" as keyof TScoring,
      type: "date",
      placeholder: "Select Date and Time",
      isRequired: true,
      rules: {
        required: "Can`t be empty",
        validate: (value: string) => {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selectedDate <= today || "The date cannot be in the future";
        },
      },
    },
  },
  {
    labelTitle: "Division code",
    htmlFor: "passportIssueBranch",
    componentType: "input",
    inputProps: {
      id: "passportIssueBranch" as keyof TScoring,
      type: "text",
      placeholder: "000000",
      isRequired: true,
      rules: {
        required: "The series must be 6 digits",
        maxLength: { value: 6, message: "The series must be 6 digits" },
        minLength: { value: 6, message: "The series must be 6 digits" },
      },
    },
  },
  {
    labelTitle: "Your employment status",
    htmlFor: "employmentStatus",
    componentType: "select",
    inputProps: {
      id: "employment.employmentStatus" as keyof TScoring,
      options: [
        { label: "Unemployed", value: "UNEMPLOYED" },
        { label: "Self employed", value: "SELF_EMPLOYED" },
        { label: "Employed", value: "EMPLOYED" },
        { label: "Business owner", value: "BUSINESS_OWNER" },
      ],
      isRequired: true,
      rules: {
        required: "Can`t be empty",
      },
    },
  },
  {
    labelTitle: "Your employer INN",
    htmlFor: "employerINN",
    componentType: "input",
    inputProps: {
      id: "employment.employerINN" as keyof TScoring,
      type: "number",
      placeholder: "000000000000",
      isRequired: true,
      rules: {
        required: "The INN must be 12 digits",
        maxLength: { value: 12, message: "The INN must be 12 digits" },
        minLength: { value: 12, message: "The INN must be 12 digits" },
      },
    },
  },
  {
    labelTitle: "Your salary",
    htmlFor: "salary",
    componentType: "input",
    inputProps: {
      id: "employment.salary" as keyof TScoring,
      type: "number",
      placeholder: "For example 100 000",
      isRequired: true,
      rules: {
        required: "The salary must be a number",
        min: { value: 0, message: "The salary must be at least 0" },
      },
    },
  },
  {
    labelTitle: "Your position",
    htmlFor: "position",
    componentType: "select",
    inputProps: {
      id: "employment.position" as keyof TScoring,
      options: [
        { label: "Worker", value: "WORKER" },
        { label: "Mid manager", value: "MID_MANAGER" },
        { label: "Top manager", value: "TOP_MANAGER" },
        { label: "Owner", value: "OWNER" },
      ],
      isRequired: true,
      rules: {
        required: "Can`t be empty",
      },
    },
  },
  {
    labelTitle: "Your work experience total",
    htmlFor: "workExperienceTotal",
    componentType: "input",
    inputProps: {
      id: "employment.workExperienceTotal" as keyof TScoring,
      type: "number",
      placeholder: "For example 10",
      isRequired: true,
      rules: {
        min: { value: 0, message: "The work experience must be at least 0" },
        maxLength: {
          value: 2,
          message:
            "The work experience must consist of a maximum of two digits ",
        },
      },
    },
  },
  {
    labelTitle: "Your work experience current",
    htmlFor: "workExperienceCurrent",
    componentType: "input",
    inputProps: {
      id: "employment.workExperienceCurrent" as keyof TScoring,
      type: "number",
      placeholder: "For example 2",
      isRequired: true,
      rules: {
        min: { value: 0, message: "The work experience must be at least 0" },
        maxLength: {
          value: 2,
          message:
            "The work experience must consist of a maximum of two digits ",
        },
      },
    },
  },
];

const Scoring = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    //reset,
  } = useForm<TScoring>();

  const dispatch: AppDispatch = useDispatch();
  const { isLoading, isSubmitted } = useSelector(
    (state: RootState) => state.scoring
  );

  function onSubmit(data: TScoring) {
    const preparedData = {...data, account: "11223344556677890000"}
    console.log({ preparedData });
    dispatch(submitScoring(preparedData));
  }

  useEffect(() => {
    const submitLS = localStorage.getItem("isSubmitScoring");
    if (submitLS) {
      dispatch(setIsSubmitted(JSON.parse(submitLS) as boolean));
      
    } else {
      localStorage.setItem("isSubmitScoring", "false");
      dispatch(setIsSubmitted(false));
    }
  }, [dispatch]);

  return !isSubmitted ? (
    !isLoading ? (
      <form className="scoring" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="scoring__title personal-title">
          Continuation of the application
        </h1>
        <p className="scoring__description">Step 2 of 5</p>
        <div className="scoring__personal-info scoring-info">
          {step2.slice(0, 6).map((item) => (
            <div key={item.htmlFor} className="scoring-label-wrapper">
              <Label
                labelTitle={item.labelTitle}
                htmlFor={item.htmlFor}
                isRequired={item.inputProps.isRequired}
              />
              {item.componentType === "input" ? (
                <InputScoring
                  data={item.inputProps as TInputScoring}
                  register={register}
                  errors={errors}
                  isSubmitted={isSubmitted}
                />
              ) : (
                <SelectScoring
                  data={item.inputProps as TSelectScoring}
                  register={register}
                />
              )}
            </div>
          ))}
        </div>
        <h1 className="scoring__title employment-title">Employment</h1>
        <div className="scoring__employment-info scoring-info">
          {step2.slice(6).map((item) => (
            <div key={item.htmlFor} className="scoring-label-wrapper">
              <Label
                labelTitle={item.labelTitle}
                htmlFor={item.htmlFor}
                isRequired={item.inputProps.isRequired}
              />
              {item.componentType === "input" ? (
                <InputScoring
                  data={item.inputProps as TInputScoring}
                  register={register}
                  errors={errors}
                  isSubmitted={isSubmitted}
                />
              ) : (
                <SelectScoring
                  data={item.inputProps as TSelectScoring}
                  register={register}
                />
              )}
            </div>
          ))}
        </div>
        <Button title="Continue" type="submit" padding="16px 38px" isDisabled={false} />
      </form>
    ) : (
      <Loader />
    )
  ) : (
    <div className="scoring-end">
      <h1 className="scoring-end__title">
        Wait for a decision on the application
      </h1>
      <p className="scoring-end__subtitle">
        The answer will come to your mail within 10 minutes
      </p>
    </div>
  );
};

export default Scoring;
