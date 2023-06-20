import React, { useEffect } from "react";
import { useState, useRef } from "react";
import he from "he";
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
  const inputRef = useRef(null);
  const replyRef = useRef(null);
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

  // console.log("USER LOGIN: " + loginUsername);

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
    if (input.trim().length !== 0) {
      const reply = {
        commentContent: input,
        post: {
          postId: comment.post.postId,
        },
        replies: [],
      };
      CommentServices.addComment(reply, comment.commentId)
        .then((res) => {
          setReplies([...replies, res.data]);
        })
        .catch((error) => {
          console.log("error adding reply");
        });
    }
    replyRef.current.value = "";
    setInput("");
  };

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  return (
    <>
      {/* <div style={{ marginBottom: "-10px" }}>Input: {input}</div> */}
      <h1 style={{ marginBottom: "0px" }}>
        {`${
          comment.user && comment.user.displayName
            ? comment.user.displayName
            : "Username failed to load"
        } `}
      </h1>
      {/* <div className="pcw-content" dangerouslySetInnerHTML={{ __html: post.postContent }} */}

      <h1

        // disabled={!editMode}
        contentEditable={editMode}
        suppressContentEditableWarning={editMode}
        style={{ marginTop: "0", resize: "none" }}
        ref={inputRef}
        dangerouslySetInnerHTML={{ __html: comment.commentContent }}
        value={comment.commentContent}
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
              ref={replyRef}
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
