import { Box, Grid } from "@mui/material";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import sidebaner from "assets/images/banner/side-banner.jpg";

const bannerList = [
  "https://firebasestorage.googleapis.com/v0/b/booksonlineupload.appspot.com/o/banners%2Fbanner1.jpg?alt=media&token=01a73eb0-1a2c-4ade-bca9-31ec57048c9a&_gl=1*1pd16th*_ga*MTQyNTc1NjA1My4xNjg1NDk5MTQx*_ga_CW55HF8NVT*MTY4NTQ5OTE0MS4xLjEuMTY4NTQ5OTI1NC4wLjAuMA..",
  "https://firebasestorage.googleapis.com/v0/b/booksonlineupload.appspot.com/o/banners%2Fbanner2.jpg?alt=media&token=a8e639e1-e206-4a02-8c1f-d958c794661e&_gl=1*1ryhrzi*_ga*MTQyNTc1NjA1My4xNjg1NDk5MTQx*_ga_CW55HF8NVT*MTY4NTQ5OTE0MS4xLjEuMTY4NTQ5OTM0OC4wLjAuMA..",
  "https://firebasestorage.googleapis.com/v0/b/booksonlineupload.appspot.com/o/banners%2Fbanner3.jpg?alt=media&token=1cd9b716-1e80-4c2c-8947-bb668e94740b&_gl=1*1m9br61*_ga*MTQyNTc1NjA1My4xNjg1NDk5MTQx*_ga_CW55HF8NVT*MTY4NTQ5OTE0MS4xLjEuMTY4NTQ5OTM3My4wLjAuMA..",
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow: (
    <button type="button" style={{ right: 0 }}>
      Previous
    </button>
  ),
  nextArrow: <button type="button">Next</button>,
};

const HomeBanner = () => {
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <Slider {...settings}>
            {bannerList.map((banner, index) => {
              return <img key={index} src={banner} alt={`Banner ${index}`} />;
            })}
          </Slider>
        </Grid>
        <Grid item container spacing={1} xs={3} alignItems="stretch">
          <Grid item xs={12}>
            <img
              style={{ width: "100%", height: "calc(100% - 4px)" }}
              src={sidebaner}
              alt=""
            />
          </Grid>
          <Grid item xs={12}>
            <img
              style={{ width: "100%", height: "calc(100% - 4px)" }}
              src={sidebaner}
              alt=""
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default HomeBanner;
