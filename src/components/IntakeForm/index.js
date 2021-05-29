import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import fleekStorage from "@fleekhq/fleek-storage-js";

import "./IntakeForm.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const IntakeForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [image, setImage] = useState(null);

  const apiSecret = process.env.REACT_APP_FLEEK_API_SECRET;
  const apiKey = process.env.REACT_APP_FLEEK_API_KEY;

  const testFleekUpload = async (data) => {
    const date = new Date();
    const timestamp = date.getTime();

    const input = {
      apiKey,
      apiSecret,
      key: `file-${timestamp}`,
      data,
    };
    try {
      const result = await fleekStorage.upload(input);
      console.log(result);
    } catch (e) {
      console.log("error", e);
    }
  };

  //JSON version
  const send_as_JSON = async (e) => {
    e.preventDefault();
    let ret_JSON = { name: name, twitter: twitter, image: image };
    console.log(ret_JSON);
    testFleekUpload(image);
  };

  // const send_to_IPFS = async (e) => {
  //   e.preventDefault();

  //   console.log("name:", name);
  //   console.log("twitter:", twitter);
  //   console.log("file:", image);
  // };

  return (
    <Form className="intakeForm" onSubmit={send_as_JSON}>
      <h2>Data Intake</h2>
      <div className="input-div">
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-div">
        <label htmlFor="twitter">Twitter</label>
        <input
          name="twitter"
          type="text"
          placeholder="Your twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>
      <div className="input-div">
        <label htmlFor="file">Image File</label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
          }}
        />
      </div>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <Button className="upload-btn" variant="secondary" type="submit">
        Upload
      </Button>
    </Form>
  );
};

export default IntakeForm;
