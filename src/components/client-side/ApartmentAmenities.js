import React, { useState } from 'react';
import Form from './Form';
import Review from './Review';

const ApartmentAmenities = () => {
  const [showForm, setShowForm] = useState(false);

  // Function to handle the "Add Review" button click
  const handleAddReviewClick = () => {
    setShowForm(true);
  };

  // Function to handle form submission
  const handleFormSubmit = () => {
    setShowForm(false); // Hide the form after submission
  };

  return (
    <div className="no-scroll">
      <section>
        <div
          className="mt-4"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '10px 30px 10px 10px',
          }}
        >
          {/* Conditionally render the "Add Review" button */}
          {!showForm && (
            <button
              onClick={handleAddReviewClick}
              style={{
                cursor: 'pointer',
                color: '#ffffff',
                padding: '10px 16px',
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '16px',
                border: '1px solid #00c194',
                backgroundColor: '#00c194',
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#00c194';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#00c194';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              Add Review
            </button>
          )}
        </div>
      </section>

      {/* Show the form when the button is clicked */}
      {showForm && <Form onSubmit={handleFormSubmit} />}

      <Review />
    </div>
  );
};

export default ApartmentAmenities;
