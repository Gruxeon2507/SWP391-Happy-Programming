import React from "react";
import PropTypes from "prop-types";

MessageFrom.propTypes = { message: PropTypes.string.isRequired };

function MessageFrom(props) {
  return (
    <div className="message-to">
      <span>{props.message}</span>
    </div>
  );
}

export default MessageFrom;
