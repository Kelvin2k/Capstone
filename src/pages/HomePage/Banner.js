import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { manageFilmService } from "../../services/manageFilmService";
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} after:hidden`}
      style={{
        ...style,
        display: "block",
        insetInlineEnd: "0px",
        fontSize: 20,
        color: "white",
      }}
      onClick={onClick}
    >
      <i class="fa-solid fa-arrow-right"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} after:hidden`}
      style={{
        ...style,
        display: "block",
        insetInlineStart: "0px",
        fontSize: 20,
        color: "white",
      }}
      onClick={onClick}
    >
      <i class="fa-solid fa-arrow-left"></i>
    </div>
  );
}

const Banner = () => {
  const setting = {
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
  };
  const [listBanners, setListBanners] = useState([]);

  useEffect(() => {
    manageFilmService
      .getAllBanner()
      .then((response) => {
        console.log(response);
        const banner = response.data.results.slice(0, 5);
        setListBanners(banner);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <Carousel
      // afterChange={onchange}
      {...setting}
    >
      {listBanners.map((item, index) => {
        return (
          <div key={index}>
            <img
              className="w-full h-[1000px] object-cover"
              src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
              alt={"Banner image" || item.title}
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default Banner;
