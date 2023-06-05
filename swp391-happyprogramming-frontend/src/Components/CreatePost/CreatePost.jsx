import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PostServices from "../../services/PostServices.js";
import { waitFor } from "@testing-library/react";

function CreatePost(props) {
  const editorRef = useRef(null);
  const { courseId, postId } = props;
  const [prevContent, setPrevContent] = useState("");
  const [content, setContent] = useState("");
  const string = `nhap cai gi do vao day di`;
  const log = () => {
    if (postId) {
      setContent(editorRef.current.getContent());
    } else {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
        setContent(editorRef.current.getContent());
      }
    }
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
        } catch (error) {
          console.log("error creating post: " + error);
        }
      }
    }
  }, [content]);

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
      <div>
        {content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : null}
      </div>
    </>
  );
}

export default CreatePost;
