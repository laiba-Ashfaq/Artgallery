import React from 'react';
import './ArtistProfile.css';

const ArtistProfile = () => {
  return (
    <div className="artist-profile">
      <h1>Artist Name</h1>
      <p>Detailed biography of the artist goes here.</p>
      <div className="artwork-gallery">
        <h2>Gallery of Artworks</h2>
        {/* Add artworks in a grid layout */}
      </div>
      <div className="contact-form">
        <h2>Contact for Commissions</h2>
        <form>
          <label>Name</label>
          <input type="text" />
          <label>Email</label>
          <input type="email" />
          <label>Message</label>
          <textarea />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ArtistProfile;
