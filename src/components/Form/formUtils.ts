import { TOfferProps } from "../LoanOffers/LoanOffers";

export type FormData = {
  amount: number;
  term: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  birthdate: string | Date;
  passportSeries: string;
  passportNumber: string;
};

export type FormState = {
  formData: FormData | object;
  amount: number | null;
  isLoading: boolean;
  isSubmitted: boolean;
  loanOffers: TOfferProps[];
  error: string | undefined;
}

export const step1 = [
  {
    labelTitle: "Inter amount",
    htmlFor: "amount",
    componentType: "input",
    inputProps: {
      id: "amount" as keyof FormData,
      type: "number",
      placeholder: "10 000",
      isRequired: true,
      rules: {
        required: "Can't be empty",
        min: { value: 10000, message: "Must be at least 10 000" },
        max: { value: 1000000, message: "Must be no more than 1 000 000" },
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
      rules: {
        required: "Enter your last name",
        pattern: {
          value: /^[A-Za-z-]{2,30}$/,
          message: "Last name can only contain letters and dashes",
        },
      },
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
      rules: {
        required: "Enter your first name",
        pattern: {
          value: /^[A-Za-z-]{2,30}$/,
          message: "First name can only contain letters and dashes",
        },
      },
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
      rules: {
        pattern: {
          value: /^[A-Za-z]{2,30}$/,
          message: "Patronymic can only contain letters",
        },
      },
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

    const [year, month, day] = value.split("-").map(Number);
    console.log(year, month, day);

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