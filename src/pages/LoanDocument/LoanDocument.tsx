import axios, { AxiosResponse } from "axios";
import { Button } from "../../components/Button/Button";
import Label from "../../components/Label/Label";
import Table from "../../components/Table/Table";
import "./LoanDocument.css";
import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";

const LoanDocument = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSetShowModal = () => {
    setShowModal(true);
  };

  async function sendAgreement() {
    setIsLoading(true);
    try {
      const id = localStorage.getItem("id");

      if (!id) {
        return "No such id";
      }
      const response: AxiosResponse = await axios.post(
        `http://localhost:8080/document/${Number(id)}`
      );
      setIsLoading(false);
      setIsSubmit(true);
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {!isSubmit ? (
        !isLoading ? (
          <div className="loan-document">
            <div className="loan-document-wrapper">
              <div className="loan-document__heading">
                <h2 className="heading__title">Payment Schedule</h2>
                <p className="heading__subtitle">Step 3 of 5</p>
              </div>
              <Table />
              <div className="loan-buttons">
                <Button
                  title="Deny"
                  type="button"
                  padding="11px 27px"
                  color="red"
                  isDisabled={false}
                  onClick={handleSetShowModal}
                ></Button>
                <div className="loan-agreement">
                  <input
                    id="agree"
                    type="checkbox"
                    value={isAgree.toString()}
                    onClick={() => setIsAgree((prev) => !prev)}
                  />
                  <Label
                    labelTitle="I agree with the payment schedule"
                    htmlFor="agree"
                    isRequired={false}
                  ></Label>
                </div>
                <div className="button-send">
                  <Button
                    title="Send"
                    type="submit"
                    padding="11px 28px"
                    isDisabled={!isAgree}
                    onClick={sendAgreement}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )
      ) : (
        <div className="document-formed">
          <h1 className="document-formed__title">Documents are formed</h1>
          <p className="document-formed__subtitle">
            Documents for signing will be sent to your email
          </p>
        </div>
      )}
      {showModal ? <Modal showModal={setShowModal} /> : <></>}
    </>
  );
};

export default LoanDocument;
