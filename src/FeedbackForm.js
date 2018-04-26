import React from "react";
import styled from "styled-components";

// form de feedback

const FeedBackField = styled.textarea`
  width: 100%;
  height: 60px;
  font-size: 0.9em;
  margin-top: 10px;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid #ddd;
`;

const FeedbackSubmitButton = styled.button`
  width: 100%;
  border: 1px solid #ddd;
  background: #eee;
  padding: 10px;
`;

const FeedbackForm = () => (
  <div>
    <FeedBackField placeholder="Vos commentaires constructifs nous permettront d'améliorer notre service" />
    <FeedbackSubmitButton>Envoyer</FeedbackSubmitButton>
  </div>
);

export default FeedbackForm;
