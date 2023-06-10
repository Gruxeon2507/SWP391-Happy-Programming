import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostServices from "../../services/PostServices";
import CreatePost from "../../Components/CreatePost/CreatePost";
import Comment from "../../Components/Comment/Comment";
import CommentServices from "../../services/CommentServices";

function PostDetail() {
  const myComments = [
    {
      commentId: 1,
      commentedAt: null,
      commentContent: "hello",
      post: {
        postId: 1,
        postedAt: null,
        postContent:
          '<ul>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n</ul>\n<p style="text-align: center;">&nbsp;</p>',
        attachments: [],
      },
      replies: [
        {
          commentId: 2,
          commentedAt: null,
          commentContent: "hi",
          post: {
            postId: 1,
            postedAt: null,
            postContent:
              '<ul>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n</ul>\n<p style="text-align: center;">&nbsp;</p>',
            attachments: [],
          },
          replies: [
            {
              commentId: 3,
              commentedAt: null,
              commentContent: "whatsup",
              post: {
                postId: 1,
                postedAt: null,
                postContent:
                  '<ul>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n</ul>\n<p style="text-align: center;">&nbsp;</p>',
                attachments: [],
              },
              replies: [],
            },
          ],
        },
      ],
    },
    {
      commentId: 2,
      commentedAt: null,
      commentContent: "hi",
      post: {
        postId: 1,
        postedAt: null,
        postContent:
          '<ul>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n</ul>\n<p style="text-align: center;">&nbsp;</p>',
        attachments: [],
      },
      replies: [
        {
          commentId: 3,
          commentedAt: null,
          commentContent: "whatsup",
          post: {
            postId: 1,
            postedAt: null,
            postContent:
              '<ul>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n</ul>\n<p style="text-align: center;">&nbsp;</p>',
            attachments: [],
          },
          replies: [],
        },
      ],
    },
    {
      commentId: 3,
      commentedAt: null,
      commentContent: "whatsup",
      post: {
        postId: 1,
        postedAt: null,
        postContent:
          '<ul>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n</ul>\n<p style="text-align: center;">&nbsp;</p>',
        attachments: [],
      },
      replies: [],
    },
    {
      commentId: 4,
      commentedAt: "2023-06-08",
      commentContent: null,
      post: {
        postId: 1,
        postedAt: null,
        postContent:
          '<ul>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n</ul>\n<p style="text-align: center;">&nbsp;</p>',
        attachments: [],
      },
      replies: [],
    },
    {
      commentId: 5,
      commentedAt: "2023-06-08",
      commentContent: "confirm btvn",
      post: {
        postId: 1,
        postedAt: null,
        postContent:
          '<ul>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n</ul>\n<p style="text-align: center;">&nbsp;</p>',
        attachments: [],
      },
      replies: [],
    },
    {
      commentId: 6,
      commentedAt: "2023-06-08",
      commentContent: "confirm btvn 1",
      post: {
        postId: 1,
        postedAt: null,
        postContent:
          '<ul>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n<li style="text-align: center;"><a href="https://www.facebook.com/">BTVN</a></li>\n</ul>\n<p style="text-align: center;">&nbsp;</p>',
        attachments: [],
      },
      replies: [],
    },
  ];
  const { postId } = useParams("postId");
  const [post, setPost] = useState({});
  // const [isChecked, setIsChecked] = useState(false);
  const [comments, setComments] = useState(myComments);
  const [input, setInput] = useState("");

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };

  useEffect(() => {
    PostServices.getPostById(postId)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => {
        console.log("error fetching post " + error);
      });
  }, []);

  useEffect(() => {
    CommentServices.getTopLevelCommentsByPost(postId)
      .then((res) => setComments(res.data))
      .catch((error) => {
        console.log("error fetching comments by postId: " + error);
      });
  }, []);

  const addComment = () => {
    console.log("add comment ...");
    const comment = {
      commentContent: input,
      post: {
        postId: postId,
      },
    };
    CommentServices.addComment(comment);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="post-card-wrap" key={post.postId}>
        <div>{post.postedAt}</div>
        <div dangerouslySetInnerHTML={{ __html: post.postContent }} />
      </div>

      <hr></hr>
      <div id={"comment-section"} style={{ paddingLeft: "50px" }}>
        <input
          type="text"
          style={{ width: "25vw" }}
          // autoFocus
          value={input}
          placeholder="type..."
          onChange={(e) => setInput(e.target.value)}
        />
        <div>{input}</div>
        <button onClick={addComment}>Comment</button>
        {comments.map((comment) => (
          <>
            <Comment
              comment={comment}
              key={comment.commentId}
            ></Comment>

          </>
        ))}
      </div>
    </>
  );
}

export default PostDetail;
