import React from "react";
import PropTypes from "prop-types";
import "../Chat/Conversation.css";

Conversation.propTypes = {
  conversationName: PropTypes.string.isRequired,
  latestMessage: PropTypes.string.isRequired,
};

function Conversation(props) {
  const { latestMessage, conversationName } = props;

  return (
    <div className="Conversation">
      <div className="Conversation-Name">
        <span>{conversationName}</span>
      </div>
      <div className="latestMessage">
        <span>{latestMessage}</span>
      </div>
    </div>
  );
}

export default Conversation;
