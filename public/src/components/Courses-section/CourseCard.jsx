import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ item }) => {
  const { title, emoji, count } = item;
  const navigate = useNavigate();

  return (
    <div className="single_course_item">
      <div>
        <span className="course_emoji">{emoji}</span>
        <h3 className="course_title">{title}</h3>
        <p className="course_count">{count} questions</p>
      </div>
      <button
        className="see_more"
        onClick={() => navigate(`/questions?subject=${encodeURIComponent(title)}`)}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        Browse questions →
      </button>
    </div>
  );
};

export default CourseCard;
