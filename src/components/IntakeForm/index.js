import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./IntakeForm.css";

const IntakeForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [image, setImage] = useState(null);

  const send_to_IPFS = async (e) => {
    e.preventDefault();

    console.log("name:", name);
    console.log("twitter:", twitter);
    console.log("file:", image);
  };

  return (
    <form onSubmit={send_to_IPFS}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="twitter">Twitter</label>
        <input
          name="twitter"
          type="text"
          placeholder="Your twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="file">Image File</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
          }}
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default IntakeForm;
