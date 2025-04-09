import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:7777"); // Adjust backend URL
        setImages(res.data); // assuming res.data is an array of { key, url }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch images", error);
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) return <p>Loading Images...</p>;

  return (
    <div className="image-gallery" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {images.length === 0 ? (
        <p>No images found</p>
      ) : (
        images.map((img) => (
          <div key={img.key} style={{ textAlign: "center" }}>
            <img
              src={img.url}
              alt={img.key}
              style={{ width: "200px", height: "auto", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            />
            <p style={{ fontSize: "0.8rem" }}>{img.key}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGallery;
