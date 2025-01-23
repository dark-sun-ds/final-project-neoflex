import axios, { AxiosResponse } from "axios";
import "./LoanCode.css";
import React, { useEffect, useRef, useState } from "react";
import inputPlaceholder from "/src/assets/input-placeholder.svg";
import Loader from "../../components/Loader/Loader";
import surprise from "/src/assets/SurpriseImage.svg";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";

const LoanCode = () => {
  const length = 4;
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [isLoading, setIsLoading] = useState(false);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [isSend, setIsSend] = useState(true);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // автофокус на первом инпуте
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isLoading]);

  const handleFocus = (e: HTMLInputElement) => {
    e.style.backgroundImage = "none";
  };
  const handleBlur = (e: HTMLInputElement | null) => {
    if (e?.value === "") {
      e.style.backgroundImage = `url('${inputPlaceholder}')`;
    }
  };

  async function onComplete(value: string) {
    setIsLoading(true);
    try {
      const id = localStorage.getItem("id");

      if (!id) {
        return "No such id";
      }
      const response: AxiosResponse = await axios.post(
        `http://localhost:8080/document/${Number(id)}/sign/code`,
        Number(value),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      setIsSend(true);
      return response;
    } catch {
      setIsLoading(false);
      setIsError(true);
      setCode(Array(length).fill(""));
    }
  }

  const handleChange = (index: number, value: HTMLInputElement) => {
    if (!/^\d*$/.test(value.value)) {
      return;
    }

    setIsError(false);

    const newCode = [...code];
    newCode[index] = value.value;
    setCode(newCode);

    if (value.value && index < length - 1 && inputRefs.current[index + 1]) {
      //переключение фокуса
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every(Boolean)) {
      onComplete(newCode.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // переход к предыдущему инпуту
    if (
      event.key === "Backspace" &&
      !code[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return !isSend ? (
    !isLoading ? (
      <div className="code">
        <p className="code__title">Please enter confirmation code</p>
        <div className="code__inputs">
          {code.map((digit, index) => (
            <input
              type="number"
              className="code__input"
              maxLength={1}
              value={digit}
              onBlur={(e) => handleBlur(e.target)}
              onFocus={(e) => handleFocus(e.target)}
              onChange={(e) => handleChange(index, e.target)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>

        {isError ? (
          <p className="code-error">Invalid confirmation code</p>
        ) : (
          <></>
        )}
      </div>
    ) : (
      <Loader />
    )
  ) : (
    <div className="code-success">
      <img className="code-succes__img" src={surprise} alt="" />
      <h1 className="code-success__title">
        Congratulations! You have completed your new credit card.
      </h1>
      <p className="code-succes__subtitle">
        Your credit card will arrive soon. Thank you for choosing us!
      </p>
      <Link to={{pathname: "/"}}>
        <Button
          title="View other offers of our bank"
          type="button"
          padding="16px"
          isDisabled={false}
        ></Button>
      </Link>
    </div>
  );
};

export default LoanCode;
