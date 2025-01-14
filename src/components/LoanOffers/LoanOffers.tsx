import { FC, useEffect } from "react";
import "./LoanOffers.css";
import LoanOfferItem from "./LoanOfferItem";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { setIsOfferSubmitted } from "./LoanOffersSlice";

export interface TOfferProps {
  applicationId: number;
  requestedAmount: number;
  totalAmount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
}

const LoanOffers: FC<{ offers: TOfferProps[] }> = ({ offers }) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, isSubmitted, error } = useSelector(
    (state: RootState) => state.offer
  );

  useEffect(() => {
    const isOfferSubmitLS = localStorage.getItem("isOfferSubmit");
    if (isOfferSubmitLS) {
      dispatch(setIsOfferSubmitted(JSON.parse(isOfferSubmitLS) as boolean));
    }
    else {
      localStorage.setItem("isOfferSubmit", "false");
      dispatch(setIsOfferSubmitted(false));
    }
  }, [dispatch]);

  return !isSubmitted ? (
    !isLoading ? (
      error === "" ? (
        <div className="loan-offers">
          {offers.map((offer, index) => (
            <LoanOfferItem key={index} offer={offer} dispatch={dispatch} />
          ))}
        </div>
      ) : (
        <h2 className="offer-error">An error ocurred while submitting form</h2>
      )
    ) : (
      <Loader />
    )
  ) : (
    <div className="end-form">
      <h2 className="end-form__title">
        The preliminary decision has been sent to your email.
      </h2>
      <p className="end-form__description">
        In the letter you can get acquainted with the preliminary decision on
        the credit card.
      </p>
    </div>
  );
};

export default LoanOffers;
