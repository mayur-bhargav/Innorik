import React from "react";
import "../App.css";
const Interests = ({ selectedInterests, onInterestChange }) => {
  const allInterests = ["technology", "sports", "politics", "health"];

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      onInterestChange(selectedInterests.filter((item) => item !== interest));
    } else {
      onInterestChange([...selectedInterests, interest]);
    }
  };

  return (
    <div className="intrest-articles-container">
      <div className="interests-container">
        {allInterests.map((interest) => (
          <button
            key={interest}
            className={`interest-button ${
              selectedInterests.includes(interest) ? "selected" : ""
            }`}
            onClick={() => handleInterestToggle(interest)}
          >
            {interest.charAt(0).toUpperCase() + interest.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Interests;
