import "./LoanOfferItem.css";
import React from 'react'
import { FC } from "react";
import { TOfferProps } from "./LoanOffers";
import loanImg from "/src/assets/loan-offer-item.svg";
import valid from '/src/assets/valid.svg'
import invalid from '/src/assets/invalid.svg'
import { Button } from "../Button/Button";
import { AppDispatch } from "../../store";
import { submitOffer } from "./LoanOffersSlice";

const LoanOfferItem: FC<{ offer: TOfferProps; dispatch: AppDispatch }> = ({
  offer, dispatch
}) => {

  const handleSelectOffer = () => {
    dispatch(submitOffer(offer));
  console.log(dispatch(submitOffer(offer)));
  };
  
  return (
    <div className="offer-item">
      <img src={loanImg} alt="" className="offer-item__img" />
      <p className="offer-item__text">
        Requested amount: <span>{offer.requestedAmount} ₽</span>
      </p>
      <p className="offer-item__text">
        Total amount: <span>{offer.totalAmount} ₽</span>
      </p>
      <p className="offer-item__text">For {offer.term} months</p>
      <p className="offer-item__text">
        Monthly payment: <span>{offer.monthlyPayment} ₽</span>
      </p>
      <p className="offer-item__text">Your rate: {offer.rate}%</p>
      <p className="offer-item__text align">
        Insurance included{" "}
        <img
          src={offer.isInsuranceEnabled ? valid : invalid}
          alt={offer.isInsuranceEnabled ? "valid" : "invalid"}
          className="offer-item__icon"
        />
      </p>
      <p className="offer-item__text align">
        Salary client{" "}
        <img
          src={offer.isSalaryClient ? valid : invalid}
          alt={offer.isSalaryClient ? "valid" : "invalid"}
          className="offer-item__icon"
        />
      </p>
      <Button
        title="Select"
        type="button"
        padding="15px 49px"
        onClick={handleSelectOffer}
        isDisabled={false}
      />
    </div>
  );
};

export default LoanOfferItem;

