import React, { Fragment } from 'react';
import HeroSection from '../components/Hero-Section/HeroSection';
import Company from '../components/Company-section/Company';
import Offer from '../components/Offer/Offer';
import Courses from '../components/Courses-section/Courses';
import AboutUs from '../components/About-us/AboutUs';
import Updates from '../components/GetUpdates/Updates';

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <Company />
      <Offer />
      <Courses />
      <AboutUs />
      <Updates />
    </Fragment>
  );
};

export default Home;
