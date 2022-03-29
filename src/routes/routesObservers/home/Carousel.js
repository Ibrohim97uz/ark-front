import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

import video from "../../../assets/images/video.mp4";

import slideTwo from "../../../assets/images/ark-client/images/slide-two.jpg";
import slideThree from "../../../assets/images/ark-client/images/slide-three.jpg";
import slideFour from "../../../assets/images/ark-client/images/slide-four.jpg";
import IntlMessages, { intlMessages } from "../../../util/IntlMessages";
import "./style.css";

function CarouselComponent() {
  return (
    <div className="carousel-wrapper">
      <div className="Carousel">
        <Carousel fade indicators={false} controls={true}>
          <Carousel.Item interval={90000}>
            <video muted={true} autoPlay={true} loop={true}>
              <source src={video} type="video/mp4" />
            </video>
            {/* <div className="carousel-item-text-wrapper">
              <h2 className="carousel-title ">{t("gallery-1-title")}</h2>
              <p>{t("gallery-1-desc")}</p>
              <Link to="#" className="carousel-button">
                {t("gallery-1-button")}
              </Link>
            </div> */}
            <div className="carousel-item-text-wrapper">
              <span className="text-red">
                <h2 className="carousel-title ">
                  <IntlMessages id={"ark"} /> <IntlMessages id={"logistics"} />
                </h2>
              </span>
              <Link className="carousel-button" to={"/services"}>
                <IntlMessages id={"ourService"} />
              </Link>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={slideTwo} alt="Second slide" />
            <div className="carousel-item-text-wrapper">
              <h2 className="carousel-title ">
                <IntlMessages id={"logistics"} />{" "}
                <IntlMessages id={"sidebar.services"} />
              </h2>
              <p>
                <IntlMessages id={"partners"} />
              </p>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={slideThree} alt="Third slide" />

            <div className="carousel-item-text-wrapper">
              <h2 className="carousel-title ">
                <IntlMessages id={"contract"} />{" "}
                <IntlMessages id={"management"} />
              </h2>
              <p>
                <IntlMessages id={"carouselTitle3"} />{" "}
                <IntlMessages id={"carouselTitle2"} />
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={slideFour} alt="Third slide" />
            <div className="carousel-item-text-wrapper">
              <h2 className="carousel-title warehouse-management-title ">
                <IntlMessages id={"warehouse"} />{" "}
                <IntlMessages id={"management"} />
              </h2>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselComponent;
