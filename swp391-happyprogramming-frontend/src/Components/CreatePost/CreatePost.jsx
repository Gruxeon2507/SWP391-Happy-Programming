import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PostServices from "../../services/PostServices.js";
import { waitFor } from "@testing-library/react";
import UserServices from "../../services/UserServices";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import api from "../../services/BaseAuthenticationService";
var stompClient = null;
function CreatePost(props) {
  const editorRef = useRef(null);
  const { courseId, postId,courseName } = props;
  const [prevContent, setPrevContent] = useState("");
  const [content, setContent] = useState("");
  const string = `nhap cai gi do vao day di`;
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: true,
    message: "",
    conversationId: "",
  });
  const log = () => {
    closeEditor();
    if (postId) {
      setContent(editorRef.current.getContent());
    } else {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
        // setContent(editorRef.current.getContent());
        setContent(editorRef.current.getContent());
      }
    }
  };
  const closeEditor = () => {
    console.log("remove");
    const elements = document.querySelectorAll(".r-t-edit");
    elements.forEach((element) => {
      element.classList.remove("active");
      // element.classList.add('active');
    });
  };

  useEffect(() => {
    if (postId) {
      PostServices.getPostById(postId).then((res) => {
        setPrevContent(res.data);
      });
    }
  }, [postId]);
  useEffect(() => {
    if (content !== "") {
      if (postId) {
        console.log("updating " + postId);
        // update post
        try {
          PostServices.updatePost(postId, content);
        } catch (error) {
          console.log("error updating post: " + error);
        }
      } else {
        console.log("creating");
        // create post
        try {
          PostServices.createNewPost(content, courseId);
          api.get("/api/courses/mentee/"+courseId).then((result)=>{
            result.data.map((user)=>{
              sendPrivateValue(user.username,'You Have A New Post In "'+courseName+'"',"/courses/feed/"+courseId)
            })
          })
        } catch (error) {
          console.log("error creating post: " + error);
        }
      }
    }
  }, [content]);


  //notification
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:1111/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };
  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    // stompClient.subscribe(`/chatroom/${conversationId}`, onMessageReceived);
    stompClient.subscribe(
      `/user/${userData.username}/private`,
      onPrivateMessage
    );
    userJoin();
  };
  const onPrivateMessage = (payload) => {};

  const onError = (err) => {
    console.log(err);
  };
  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };
  useEffect(() => {
    if (userData.username !== "") {
      connect();
    }
  }, [userData.username]);

  const fetchUsername = async () => {
    const loginuser = await UserServices.getLoginUsername();
    const username = loginuser.data;
    setUserData((prevUserData) => ({ ...prevUserData, username: username }));
  };
  useEffect(() => {
    fetchUsername();
  }, []);

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendPrivateValue = (username, message, url) => {
    if (stompClient) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // months are zero-based
      const day = currentDate.getDate();

      var chatMessage = {
        senderName: userData.username,
        receiverName: username,
        message: message,
        status: "MESSAGE",
        sentAt: currentDate,
        url: url,
        date: year + "-" + month + "-" + day,
      };

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));

      //   const Notification = {
      //     notificationContent:message,
      //     notificationTime:currentDate,
      //     isViewed:0,
      //     notificationType:{
      //         notificationTypeId:1
      //     },
      //     user:{
      //         username:username
      //     }
      //   }
      const Notification = new FormData();      Notification.append("notificationContent", message);
      Notification.append("notificationTime", currentDate);
      Notification.append("notificationTypeId", 1);
      Notification.append("username", username);
      Notification.append("url", url);
      api.post("/api/notification/save", Notification);
      setUserData({ ...userData, message: "" });
    }
  };
  return (
    <>
      <script
        src="https://cdn.tiny.cloud/1/7gca6rd380t0u0ekt9tt29lep0rz455ogbjyu7j14tyu570b/tinymce/6/tinymce.min.js"
        referrerPolicy="origin"
      ></script>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={prevContent.postContent}
        init={{
          placeholder: "Write something..." + "",
          height: 450,
          menubar: false,
          plugins: [
            "a11ychecker",
            "advlist",
            "advcode",
            "advtable",
            "autolink",
            "checklist",
            "export",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "powerpaste",
            "fullscreen",
            "formatpainter",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | casechange blocks | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log} id="postConfirm">
        Public
      </button>
      {/* <div>
        {content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : null}
      </div> */}
    </>
  );
}

export default CreatePost;
