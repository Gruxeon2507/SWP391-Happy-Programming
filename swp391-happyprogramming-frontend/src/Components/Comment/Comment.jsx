import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import ActionButton from "../ActionButton/ActionButton";
import CommentServices from "../../services/CommentServices";
import UserServices from "../../services/UserServices";

const Comment = ({ comment, layer }) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  // const [nestCount, setNestCount] = useState(0);
  const inputRef = useRef(null);
  const [replies, setReplies] = useState([]);

  useEffect(() => {}, [replies]);

  useEffect(() => {
    UserServices.getLoginUsername()
      .then((res) => setLoginUsername(res.data))
      .catch((error) => {
        console.log("ERROR GET LOGIN USERNAME" + error);
      });
    setReplies(comment.replies);
  }, []);

  console.log("USER LOGIN: " + loginUsername);

  const deleteComment = () => {
    console.log("DELETE COMMENT CALLED: " + comment.commentId);
    CommentServices.deleteComment(comment.commentId);
  };

  const onEditComment = () => {
    if (editMode) {
      const newContent = inputRef.current.innerHTML;
      console.log("NEW CONTENT: " + newContent);
      console.log("COMMENTID: " + comment.commentId);
      CommentServices.updateComment(newContent, comment.commentId);
    }
    if (editMode) {
      setEditMode(false);
    }
  };

  const addReply = (comment) => {
    const reply = {
      commentContent: input,
      post: {
        postId: comment.post.postId,
      },
      replies: [],
    };
    try {
      CommentServices.addComment(reply, comment.commentId).then((res) => {
        setReplies([...replies, res.data]);
      });
    } catch (e) {
      console.log("error adding reply: " + e);
    }
  };

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  return (
    <>
      <div style={{ marginBottom: "-10px" }}>Input: {input}</div>
      <h1 style={{ marginBottom: "0px" }}>
        {`${
          comment.user && comment.user.displayName
            ? comment.user.displayName
            : "Username failed to load"
        } (ID: ${comment.commentId})`}
      </h1>
      {/* <div className="pcw-content" dangerouslySetInnerHTML={{ __html: post.postContent }} */}

      <h1
        contentEditable={editMode}
        suppressContentEditableWarning={editMode}
        style={{ marginTop: "0" }}
        ref={inputRef}
        dangerouslySetInnerHTML={{ __html: comment.commentContent }}
      >
        {/* {comment.commentContent} */}
      </h1>
      <div style={{ display: "flex" }}>
        {editMode ? (
          <>
            <ActionButton
              className="reply comment"
              type="SAVE"
              handleClick={() => onEditComment()}
            ></ActionButton>
            <ActionButton
              className="reply comment"
              type="CANCEL"
              handleClick={() => setEditMode(false)}
            ></ActionButton>
          </>
        ) : (
          <>
            {layer < 3 && (
              <ActionButton
                className="reply comment"
                type={
                  <>
                    {expand ? (
                      <AiOutlineCaretUp
                        width="10px"
                        height="10px"
                      ></AiOutlineCaretUp>
                    ) : (
                      <AiOutlineCaretDown
                        width="10px"
                        height="10px"
                      ></AiOutlineCaretDown>
                    )}{" "}
                    REPLY
                  </>
                }
                handleClick={() => handleNewComment()}
              ></ActionButton>
            )}
            {comment.user.username == loginUsername ? (
              <>
                <ActionButton
                  className="comment"
                  type="EDIT"
                  handleClick={() => setEditMode(true)}
                ></ActionButton>
                <ActionButton
                  className="reply comment"
                  type="DELETE"
                  handleClick={() => deleteComment()}
                ></ActionButton>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>

      {/* --------------------SHOW REPLIES-------------------- */}
      <div style={{ display: expand ? "block" : "none", paddingLeft: "100px" }}>
        {showInput && (
          <div className="inputContainer" style={{ display: "flex" }}>
            <input
              type="text"
              className="inputContainter_input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <ActionButton
              className="reply"
              type="REPLY"
              handleClick={() => addReply(comment)}
            ></ActionButton>
            <ActionButton
              className="reply"
              type="CANCEL"
              handleClick={() => setShowInput(false)}
            ></ActionButton>
          </div>
        )}
        {replies.map((reply) => (
          <>
            <Comment
              comment={reply}
              key={reply.commentId}
              layer={layer + 1}
            ></Comment>
          </>
        ))}
      </div>
    </>
  );
};

export default Comment;
