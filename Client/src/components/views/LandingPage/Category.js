import React from "react";
import house from "./images/house.svg";
import cars from "./images/car.svg";
import computer from "./images/computer.svg";
import bed from "./images/bed.svg";
import job from "./images/job.svg";
import mobile from "./images/mobile.svg";
import bikes from "./images/bikes.svg";
import books from "./images/book.svg";
import fastions from "./images/fashion.svg";
import pet from "./images/pet.svg";
import services from "./images/services.svg";
import handicrafts from './images/handicrafts.png';
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Category.css";
import '../NavBar/Sections/LeftMenu';
import {useTranslation} from 'react-i18next';
import '../../../i18next';

const tiers = [

  {
    buttonText: "Properties",
    buttonImag: house,
    buttonLink: "/Properties",
    buttonVariant: "outlined",
  },
  {
    buttonText: "Cars",
    buttonImag: cars,
    buttonLink: "/Cars",
    buttonVariant: "outlined",
  },
  {
    buttonText: "Electronics",
    buttonImag: computer,
    buttonLink: "/Electronics",
    buttonVariant: "outlined",
  },
  {
    buttonText: "Furniture",
    buttonImag: bed,
    buttonLink: "/Furniture",
    buttonVariant: "outlined",
  },
  {
    buttonText: "Jobs",
    buttonImag: job,
    buttonLink: "/Jobs",
    buttonVariant: "outlined",
  },
  {
    buttonText: "Mobiles",
    buttonImag: mobile,
    buttonLink: "/Mobiles",
    buttonVariant: "outlined",
  },
  {
    buttonText: "Bikes",
    buttonImag: bikes,
    buttonLink: "/Bikes",
    buttonVariant: "outlined",
  },
  {
    buttonText: "Education",
    buttonImag: books,
    buttonLink: "/Education",
    buttonVariant: "outlined",
  },
  {
    buttonText: "Fashion",
    buttonImag: fastions,
    buttonLink: "/Fashion",
    buttonVariant: "outlined",
  },
  {
    buttonText: "Pets",
    buttonImag: pet,
    buttonLink: "/Pets",
    buttonVariant: "outlined",
  },
  {
    buttonText: "Services",
    buttonImag: services,
    buttonLink: "/Services",
    buttonVariant: "outlined",
  },
  {
    buttonText: "Handicrafts",
    buttonImag: handicrafts,
    buttonLink: "/Handicrafts",
    buttonVariant: "outlined",
  },
];

const Category = () => {
  const {t} = useTranslation();

  var Checker = states => {
   
    return t(`${states}.1`);
  };
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}

      <Grid container spacing={4} alignItems="flex-end">
        {tiers.map((tier) => (
          // Enterprise card is full width at sm breakpoint
          <Grid item xs={4} sm={3} md={2}>
            <Card>
              <Link to={`/category${tier.buttonLink}`}>
                <CardContent
                  align="center"
                  style={{ padding: "2px" }}
                  className="CardContent"
                >
                  <img
                    src={tier.buttonImag}
                    style={{ width: "45px", padding: "2px" }}
                  />
                  <Typography color="textPrimary" gutterBottom>
                  {Checker(tier.buttonText)}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default Category;
