import axios, { AxiosResponse } from "axios";
import { Button } from "../../components/Button/Button";
import Label from "../../components/Label/Label";
import Table from "../../components/Table/Table";
import "./LoanDocument.css";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";

export interface RowData {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
}

interface ResponseData {
  data: {
    credit: {
      paymentSchedule: RowData[];
    };
  };
}

const LoanDocument = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<RowData[]>([])

useEffect(() => {
  getTableData();
}, [])

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

  async function getTableData() {
    setIsLoading(true);
    try {
      const id = localStorage.getItem("id");
      console.log(Number(id));
      const response: ResponseData = await axios
        .get(`http://localhost:8080/admin/application/${Number(id)}`)
      setIsLoading(false);
     
      setData(response.data.credit.paymentSchedule as RowData[]);
    } catch {
      setIsLoading(false);
      console.error("Failed to fetch table data");
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
              <Table data={data} />
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
