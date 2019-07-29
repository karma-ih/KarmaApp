import React, { useState, useEffect } from "react";

const CloudinaryWidget = props => {
  const [imageUrl, setImageUrl] = useState("");

  let myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dxzzpf0xm",
      uploadPreset: "up2UserImages"
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info.url);
        const imageUrl = result.info.url;
        setImageUrl(imageUrl);
      }
    }
  );

  useEffect(() => {
    props.handleCloudinary(imageUrl);
  }, [imageUrl]);

  //   useEffect(() => {
  //     const imageUrl = result.info.url;

  //     setImageUrl(imageUrl);
  //     console.log("HOOK URL", imageUrl);
  //   });

  return (
    <div id="photo-form-container">
      <button onClick={myWidget.open}>Upload Photo</button>
    </div>
  );
};

export default CloudinaryWidget;
