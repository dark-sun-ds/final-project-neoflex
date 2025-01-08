import { Button } from "../Button/Button";
import Divider from "../Divider/Divider";
import Label from "../Label/Label";
import "./Form.css";
import Input, { TInput } from "../Input/Input";
import Select, { TSelect } from "../Select/Select";
import { useForm } from "react-hook-form"; //RegisterOptions
import { FormData } from "./typesForm";
import { useRef, useState } from "react";

const Form = () => {
  const step1 = [
    {
      labelTitle: "Inter amount",
      htmlFor: "amount",
      componentType: "input",
      inputProps: {
        id: "amount" as keyof FormData,
        type: "number",
        placeholder: "15 000",
        isRequired: true,
        rules: {
          required: "Can't be empty",
          min: { value: 15000, message: "Must be at least 15 000" },
          max: { value: 600000, message: "Must be no more than 600 000" },
        },
      },
    },
    {
      labelTitle: "Your last name",
      htmlFor: "lastName",
      componentType: "input",
      inputProps: {
        id: "lastName" as keyof FormData,
        type: "text",
        placeholder: "For Example Doe",
        isRequired: true,
        rules: { required: "Enter your last name" },
      },
    },
    {
      labelTitle: "Your first name",
      htmlFor: "firstName",
      componentType: "input",
      inputProps: {
        id: "firstName" as keyof FormData,
        type: "text",
        placeholder: "For Example Jhon",
        isRequired: true,
        rules: { required: "Enter your first name" },
      },
    },
    {
      labelTitle: "Your patronymic",
      htmlFor: "middleName",
      componentType: "input",
      inputProps: {
        id: "middleName" as keyof FormData,
        type: "text",
        placeholder: "For Example Victorovich",
        isRequired: false,
        rules: {},
      },
    },
    {
      labelTitle: "Select term",
      htmlFor: "term",
      componentType: "select",
      inputProps: {
        id: "term" as keyof FormData,
        options: [
          { label: "6 month", value: "6" },
          { label: "12 month", value: "12" },
          { label: "18 month", value: "18" },
          { label: "24 month", value: "24" },
        ],
        rules: { required: "Can`t be empty" },
        isRequired: true,
      },
    },
    {
      labelTitle: "Your email",
      htmlFor: "email",
      componentType: "input",
      inputProps: {
        id: "email" as keyof FormData,
        type: "email",
        placeholder: "test@gmail.com",
        isRequired: true,
        rules: {
          required: "Can`t be empty",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Регулярное выражение для email
            message: "Incorrect email address",
          },
        },
      },
    },
    {
      labelTitle: "Your date of birth",
      htmlFor: "birthdate",
      componentType: "input",
      inputProps: {
        id: "birthdate" as keyof FormData,
        type: "date",
        placeholder: "Select Date and Time",
        isRequired: true,
        rules: {
          required: "Incorrect date of birth",
          validate: validateDateAndAge,
        },
      },
    },
    {
      labelTitle: "Your passport series",
      htmlFor: "passportSeries",
      componentType: "input",
      inputProps: {
        id: "passportSeries" as keyof FormData,
        type: "number",
        placeholder: "0000",
        isRequired: true,
        rules: {
          required: "The series must be 4 digits",
          maxLength: { value: 4, message: "The series must be 4 digits" },
          minLength: { value: 4, message: "The series must be 4 digits" },
        },
      },
    },
    {
      labelTitle: "Your passport number",
      htmlFor: "passportNumber",
      componentType: "input",
      inputProps: {
        id: "passportNumber" as keyof FormData,
        type: "number",
        placeholder: "000000",
        isRequired: true,
        rules: {
          required: "The series must be 6 digits",
          maxLength: { value: 6, message: "The series must be 6 digits" },
          minLength: { value: 6, message: "The series must be 6 digits" },
        },
      },
    },
  ];

  function validateDateAndAge(value: string): string | null {
    if (!value) {
      return "Can`t be empty";
    }

    const [year, day, month] = value.split("-").map(Number);
    console.log(year, day, month);

    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(day) ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return "Incorrect date format";
    }

    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      return "Incorrect date";
    }

    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      return "The age must be over 18 years old";
    }

    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormData>();
  const amountRef = useRef<HTMLInputElement>(null);
  const [amount, setAmount] = useState<number>();

  const onSubmit = async (e: FormData) => {
    console.log(e);

    // const test = { ...data };
    // console.log(test.target[0].value);

    //     e.preventDefault();
    //     try {
    // console.log("");

    //     }
    //     catch {
    //       console.error("Error during form submission");
    //     }
  };
  // const handleSubmit = async () => {
  //   try {
  //     const emailData: EmailData = { email };
  //     const response: AxiosResponse = await axios.post<
  //       void,
  //       AxiosResponse<EmailData>
  //     >("http://localhost:8080/email", emailData);
  //     console.log({ response: response.status });

  //     setIsSubscribed(true);
  //     localStorage.setItem("isSubscribed", "true");
  //     setEmail("");
  //   } catch (err: unknown) {
  //     if (axios.isAxiosError(err)) {
  //       const axiosError: AxiosError<AxiosResponse> = err;
  //       console.error("Ошибка Axios: ", axiosError);
  //     } else if (err instanceof Error) {
  //       console.error("Общая ошибка: ", err);
  //     } else {
  //       console.error("Неизвестная ошибка: ", err);
  //     }
  //   }
  // };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="customize">
        <div className="customize__heading">
          <h2 className="customize__title">Customize your card</h2>
          <p className="customize__step">Step 1 of 5</p>
        </div>
        <div className="customize__label">
          <div className="label-wrapper" ref={amountRef}>
            <Label
              labelTitle={step1[0].labelTitle}
              htmlFor={step1[0].htmlFor}
              isRequired={step1[0].inputProps.isRequired}
            />
            <Input
              data={step1[0].inputProps as TInput}
              register={register}
              errors={errors}
              isSubmitted={isSubmitted}
              setAmount={setAmount}
            />
          </div>
        </div>

        <div className="customize-amount">
          <div className="div"></div>
          <div className="customize-amount__wrapper">
            <p className="customize__amount-title">
              You have chosen the amount
            </p>
            <p className="customize__amount-value">{amount ? amount : 0} ₽</p>
            <Divider isActive={null} parent="formParent" />
          </div>
        </div>
      </div>
      <div className="contact-info">
        <p className="contact-info__title">Contact Information</p>
        <div className="contact-info__inputs">
          {step1.slice(1).map((item) => (
            <div className="label-wrapper">
              <Label
                labelTitle={item.labelTitle}
                htmlFor={item.htmlFor}
                isRequired={item.inputProps.isRequired}
              />
              {item.componentType === "input" ? (
                <Input
                  data={item.inputProps as TInput}
                  register={register}
                  errors={errors}
                  isSubmitted={isSubmitted}
                />
              ) : (
                <Select data={item.inputProps as TSelect} register={register} />
              )}
            </div>
          ))}
        </div>
      </div>
      <Button title="Continue" type="submit" />
    </form>
  );
};

export default Form;
