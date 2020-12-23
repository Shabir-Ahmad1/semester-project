import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "./style.css";

function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images &&
        props.detail.images.map((item) => {
          images.push({
            original: `http://localhost:5000/${item}`,
          });
        });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <span>
      <ImageGallery
        items={Images}
        showThumbnails={false}
        showPlayButton={false}
      />
    </span>
  );
}

export default ProductImage;
