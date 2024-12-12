import React, { useEffect, useState, useRef } from "react";
import { init, NewsArticle } from "./Slider.ts";
import "./Slider.css";
import placeholder from "../../assets/man-reading-newspaper.jpg";
import left from "../../assets/Transfer_long_left_light.svg";
import right from "../../assets/Transfer_long_right_light.svg";

export const Slider = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  // const imagesRefs = useRef<HTMLDivElement[]>([]);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const [scrollCoord, setScrollCoord] = useState(0);
  const [firstImgWidth, setFirstImgWidth] = useState(0); // ширина прокрутки

  window.onload = () => {
    init(setArticles);
  };
  
  useEffect(() => {
    // setState работает асинхронно, поэтому showHideBtns() вызывается здесь, а не в scrollSlider, иначе значение scrollCoord не изменится и prevBtn останется неактивной
    activateBtns();
  }, [scrollCoord]);

  useEffect(() => {
    if (sliderRef.current) {
      setScrollCoord(sliderRef.current.clientWidth);
      const firstImg = sliderRef.current.querySelectorAll(".slider_link")[0];
      if (firstImg) {
        const sliderGapValue = parseFloat(
          getComputedStyle(sliderRef.current).gap.replace("px", "")
        );
        setFirstImgWidth(firstImg.clientWidth + sliderGapValue);
      }
    }
    activateBtns();
    console.log({ articles });
  }, [articles, firstImgWidth]);

  function scrollSlider(btnId: "prev" | "next") {
    sliderRef.current?.scrollBy({
      left: btnId === "next" ? firstImgWidth : -firstImgWidth,
      behavior: "smooth",
    });
    setScrollCoord(
      (prevScroll) =>
        prevScroll + (btnId === "next" ? firstImgWidth : -firstImgWidth)
    );
  }

  function activateBtns(): void {
    if (prevBtnRef.current && nextBtnRef.current && sliderRef.current) {
      if (scrollCoord <= sliderRef.current.clientWidth) {
        prevBtnRef.current.disabled = true;
        nextBtnRef.current.disabled = false;
      } else if (
        scrollCoord >= sliderRef.current?.scrollWidth ||
        !sliderRef.current
      ) {
        nextBtnRef.current.disabled = true;
        prevBtnRef.current.disabled = false;
      } else {
        prevBtnRef.current.disabled = false;
        nextBtnRef.current.disabled = false;
      }
    }
  }

  return (
    <section>
      <div className="slider" ref={sliderRef}>
        {articles.map(({ title, description, url, urlToImage }, ind) => (
          <a key={ind} href={url} className="slider_link">
            <article className="slider__item">
              <figure>
                <img
                  src={urlToImage ? urlToImage : placeholder}
                  alt=""
                  className="slider__item-img"
                  // ref={imagesRefs}
                />
                <figcaption className="slider__item-title">{title}</figcaption>
              </figure>
              <p className="slider__item-description">{description}</p>
            </article>
          </a>
        ))}
      </div>
      <div className="slider__controls">
        <button
          className="slider__btn"
          id="prev"
          ref={prevBtnRef}
          onClick={() => scrollSlider("prev")}
        >
          <img src={left} alt="left" />
        </button>
        <button
          className="slider__btn"
          id="next"
          ref={nextBtnRef}
          onClick={() => scrollSlider("next")}
        >
          <img src={right} alt="right" />
        </button>
      </div>
    </section>
  );
};
