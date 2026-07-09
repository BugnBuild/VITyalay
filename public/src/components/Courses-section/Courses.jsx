import React from 'react';
import { Container } from 'reactstrap';
import './courses.css';
import CourseCard from './CourseCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const coursesData = [
  { id: '01', title: 'Calculus',            emoji: '∫', count: 42 },
  { id: '02', title: 'Python',              emoji: '🐍', count: 78 },
  { id: '03', title: 'DBMS',               emoji: '🗄️', count: 56 },
  { id: '04', title: 'C++',                emoji: '⚙️', count: 34 },
  { id: '05', title: 'JavaScript',         emoji: '🌐', count: 61 },
  { id: '06', title: 'Java',               emoji: '☕', count: 49 },
  { id: '07', title: 'Comp. Chemistry',    emoji: '⚗️', count: 18 },
  { id: '08', title: 'Operating Systems',  emoji: '🖥️', count: 37 },
  { id: '09', title: 'Kotlin',             emoji: '📱', count: 22 },
  { id: '10', title: 'Computer Networks',  emoji: '🔗', count: 31 },
  { id: '11', title: 'Data Structures',    emoji: '🌳', count: 55 },
  { id: '12', title: 'Machine Learning',   emoji: '🤖', count: 40 },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1200,
      settings: { slidesToShow: 3, slidesToScroll: 2 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2, slidesToScroll: 1 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

const Courses = () => {
  return (
    <section className="courses_section">
      <Container>
        <div className="courses_header">
          <div className="section-badge">Subjects</div>
          <h2>Frequently Asked Topics</h2>
          <p>Browse questions by subject — find what you're looking for fast.</p>
        </div>

        <Slider {...sliderSettings}>
          {coursesData.map((item) => (
            <CourseCard key={item.id} item={item} />
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Courses;
