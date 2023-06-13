import React from "react";
import PropTypes from "prop-types";

MessageTo.propTypes = { message: PropTypes.string.isRequired };

function MessageTo(props) {
  return (
    <div className="msg-text-c">
      <span>{props.message}</span>
    </div>
  );
}

export default MessageTo;
