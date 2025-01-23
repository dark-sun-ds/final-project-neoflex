import "./Modal.css";
import React, { FC, useState } from "react";
import close from "/src/assets/close.svg";
import { Button } from "../Button/Button";
import axios from "axios";
import Loader from "../Loader/Loader";

const Modal: FC<{
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const handleSetShowModal = () => {
    showModal(false);
  };

  async function sendRejection() {
    setIsLoading(true);
    try {
      const id = localStorage.getItem("id");

      if (!id) {
        return "No such id";
      }
      await axios.post(`http://localhost:8080/application/${Number(id)}/deny`);
      setIsLoading(false);
      setIsDenied(true);
    } catch {
      console.error("rejection error");
    }
  }

  return (
    <div className="modal-back">
      <div className="modal">
        {!isLoading ? (
          <>
            <p className="modal__title">Deny application</p>
            <button className="modal_button-close" onClick={handleSetShowModal}>
              <img src={close} alt="close button" />
            </button>
            {!isDenied ? (
              <>
                <p className="modal__subtitle">
                  You exactly sure, you want to cancel this application?
                </p>
                <div className="modal__buttons">
                  <Button
                    title="Deny"
                    type="button"
                    padding="11px 27px"
                    isDisabled={false}
                    color="red"
                    onClick={sendRejection}
                  ></Button>
                  <Button
                    title="Cancel"
                    type="button"
                    padding="11px 21px"
                    isDisabled={false}
                    color="blue"
                    onClick={handleSetShowModal}
                  ></Button>
                </div>
              </>
            ) : (
              <>
                <p className="modal__subtitle">
                  Your application has been deny!
                </p>
                <div className="modal__buttons">
                  <Button
                    title="Go home"
                    type="button"
                    padding="11px 29px"
                    isDisabled={false}
                    color="blue"
                    onClick={handleSetShowModal}
                  ></Button>
                </div>
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Modal;
