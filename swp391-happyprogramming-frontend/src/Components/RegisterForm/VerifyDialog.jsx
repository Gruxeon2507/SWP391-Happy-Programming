import React from "react";
import PropTypes from "prop-types";

VerifyDialog.propTypes = {
  email: PropTypes.string.isRequired,
};

function VerifyDialog(props) {
  return (
    <div className="verifyDia">
      <div className="verifyDia-email">
        <h1>Verify Your Email Address</h1>
        <p>To continue, please verify your email: </p>
        <h3>{props.email}</h3>
      </div>
    </div>
  );
}

export default VerifyDialog;
