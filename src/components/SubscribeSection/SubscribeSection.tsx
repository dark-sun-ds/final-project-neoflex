import "./SubscribeSection.css";
import emailImg from "../../assets/email.svg";
import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import React from 'react'

type EmailData = {
  email: string;
};
export const SubscribeSection = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const buttonState = `subscribe__button ${isSubscribed ? 'disabled' : ''}`

  useEffect(() => {
    const storedIsSubscribed = localStorage.getItem("isSubscribed");
    if (storedIsSubscribed === "true") {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const emailData: EmailData = { email };
      const response: AxiosResponse = await axios.post<void, AxiosResponse<EmailData>>(
        "http://localhost:8080/email",
        emailData
      );
      console.log({response: response.status});
      
      setIsSubscribed(true);
      localStorage.setItem("isSubscribed", "true");
      setEmail("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError: AxiosError<AxiosResponse> = err;
        console.error("Ошибка Axios: ", axiosError);
      } else if (err instanceof Error) {
        console.error("Общая ошибка: ", err);
      } else {
        console.error("Неизвестная ошибка: ", err);
      }
    }
  };

  return (
    <section className="subscribe" aria-label="Newsletter Subscription">
      <p className="subscribe__support">Support</p>
      <h2 className="subscribe__title">Subscribe Newsletter & get</h2>
      <p className="subscribe__subtitle">Bank News</p>
      <form
        className="subscribe__form"
        aria-label="Subscribe to Newsletter"
        onSubmit={handleSubmit}
      >
        <label className="subscribe__label" htmlFor="email">
          <img
            src={emailImg}
            alt="email icon"
            className="subscribe__input-img"
            aria-hidden="true"
          />
          <input
            className="subscribe__input"
            type="email"
            id="email"
            placeholder="Your email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            required
          />
        </label>
        <button className={buttonState} type="submit">
          <img src="/src/assets/subscribe_button_img.svg" alt="" />
          Subscribe
        </button>
      </form>
      {isSubscribed ? (
        <p className="subscribe__warning">
          You are already subscribed to the bank`&apos;`s newsletter.
        </p>
      ) : (
        <></>
      )}
    </section>
  );
};
