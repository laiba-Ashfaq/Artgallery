import React from 'react';
import './ArtworkDetail.css';

const ArtworkDetail = () => {
  return (
    <div className="artwork-detail">
      <div className="artwork-info">
        <img src="path_to_artwork_image.jpg" alt="Artwork" />
        <div className="details">
          <h1>Artwork Title</h1>
          <p>Description of the artwork.</p>
          <p>Price: $500</p>
          <button>Purchase</button>
        </div>
      </div>
      <div className="artist-bio">
        <h2>Artist Name</h2>
        <p>Artist biography goes here.</p>
        <h3>Other Works by the Artist</h3>
        {/* Display other artworks */}
      </div>
      <div className="reviews">
        <h3>Customer Reviews</h3>
        {/* List customer reviews */}
      </div>
    </div>
  );
};

export default ArtworkDetail;
