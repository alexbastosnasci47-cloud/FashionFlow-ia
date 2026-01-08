// src/components/ImageUploader.jsx
import React from "react";

function ImageUploader({ onUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onUpload(imageUrl);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
    />
  );
}

export default ImageUploader;
