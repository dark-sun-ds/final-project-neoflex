import "./LoanSign.css";
import React, { useState } from "react";
import fileIcon from "/src/assets/file-icon.svg";
import Label from "../../components/Label/Label";
import { Button } from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import axios, { AxiosResponse } from "axios";

const LoanSign = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);

  async function signDocument() {
    setIsLoading(true);
    try {
      const id = localStorage.getItem("id");

      if (!id) {
        return "No such id";
      }
      const response: AxiosResponse = await axios.post(
        `http://localhost:8080/document/${Number(id)}/sign`
      );
      setIsLoading(false);
      setIsSend(true);
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  return !isSend ? (
    !isLoading ? (
      <div className="sign">
        <div className="sign__heading">
          <h1 className="sign__title">Signing of documents</h1>
          <p className="sign__subtitle">Step 4 of 5</p>
        </div>
        <p className="sign__description">
          Information on interest rates under bank deposit agreements with
          individuals. Center for Corporate Information Disclosure. Information
          of a professional participant in the securities market. Information
          about persons under whose control or significant influence the Partner
          Banks are. By leaving an application, you agree to the processing of
          personal data, obtaining information, obtaining access to a credit
          history, using an analogue of a handwritten signature, an offer, a
          policy regarding the processing of personal data, a form of consent to
          the processing of personal data.
        </p>
        <a
          href="/src/assets/credit-card-offer.pdf"
          target="_blank"
          className="sign__file"
        >
          <img src={fileIcon} alt="file icon" />
          Information on your card
        </a>
        <div className="sign-agreement">
          <div className="sign__checkbox">
            <input
              type="checkbox"
              id="sign-agreement"
              value={isAgree.toString()}
              onClick={() => setIsAgree((prev) => !prev)}
            />
            <Label
              labelTitle="I agree"
              htmlFor="sign-agreement"
              isRequired={false}
            />
          </div>
          <div className="sign__button">
            <Button
              title="Send"
              type="button"
              padding="11px 60px"
              isDisabled={!isAgree}
              onClick={signDocument}
            />
          </div>
        </div>
      </div>
    ) : (
      <Loader />
    )
  ) : (
    <div className="sign-done">
      <h1 className="sign-done__title">
        Documents have been successfully signed and sent for approval
      </h1>
      <p className="sign-done__subtitle">
        Within 10 minutes you will be sent a PIN code to your email for
        confirmation
      </p>
    </div>
  );
};

export default LoanSign;
