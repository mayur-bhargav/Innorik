// Interests.js
import React, { useState } from 'react';

const Interests = ({ selectedInterests, onInterestChange }) => {
  const allInterests = ['all','technology', 'sports', 'politics', 'health'];

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      onInterestChange(selectedInterests.filter((item) => item !== interest));
    } else {
      onInterestChange([...selectedInterests, interest]);
    }
  };

  return (
    <div>
      <h2>Select Your Interests</h2>
      {allInterests.map((interest) => (
        <label key={interest}>
          <input
            type="checkbox"
            value={interest}
            onChange={() => handleInterestToggle(interest)}
            checked={selectedInterests.includes(interest)}
          />
          {interest.charAt(0).toUpperCase() + interest.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default Interests;
