import { Button } from "../Button/Button";
import Divider from "../Divider/Divider";
import Label from "../Label/Label";
import "./Prescoring.css";
import Input, { TInput } from "../Input/Input";
import Select, { TSelect } from "../Select/Select";
import { useForm } from "react-hook-form"; //RegisterOptions
import { FormData } from "./formUtils";
import { useEffect, useRef } from "react";
import Loader from "../Loader/Loader";
import LoanOffers, { TOfferProps } from "../LoanOffers/LoanOffers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { step1 } from "./formUtils";
import {
  setFormData,
  setIsSubmitted,
  setLoanOffers,
  submitPrescoring,
} from "./PrescoringFormSlice";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    //reset,
  } = useForm<FormData>();

  const dispatch: AppDispatch = useDispatch();
  const amountRef = useRef<HTMLInputElement>(null);
  const { amount, isLoading, isSubmitted, loanOffers } = useSelector(
    (state: RootState) => state.prescoring
  );

  useEffect(() => {
    const submitLS = localStorage.getItem("isSubmit");
    const offersLS = localStorage.getItem("offers");
    if (submitLS) {
      dispatch(setIsSubmitted(JSON.parse(submitLS) as boolean));
      if (offersLS && offersLS.length > 0) {
        dispatch(setLoanOffers(JSON.parse(offersLS) as TOfferProps[]));
      }
    } else {
      localStorage.setItem("isSubmit", "false");
      dispatch(setIsSubmitted(false));
    }
  }, [dispatch]);

  const prepareData = (data: FormData) => {
    const newData = { ...data };
    if (newData.middleName === "") {
      newData.middleName = null;
    }
    console.log({ newData });

    return newData;
  };

  const onSubmit = (data: FormData) => {
    console.log("submit");
    dispatch(setFormData(prepareData(data)));
    dispatch(submitPrescoring(prepareData(data)));
    //reset();
  };

  return !isSubmitted ? (
    !isLoading ? (
      <form id="form" className="form" onSubmit={handleSubmit(onSubmit)}>
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
                dispatch={dispatch}
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
            {step1.slice(1).map((item, index) => (
              <div key={index} className="label-wrapper">
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
                  <Select
                    data={item.inputProps as TSelect}
                    register={register}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <Button title="Continue" type="submit" padding="16px 38px" />
      </form>
    ) : (
      <Loader />
    )
  ) : (
    <LoanOffers offers={loanOffers} />

  );
};

export default Form;
