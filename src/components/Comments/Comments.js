import React, { useState, useRef } from "react";

import { Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";

import useStyles from "./styles";

const Comments = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const commentsRef = useRef();

  const handleComment = async () => {
    const sentComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(sentComment, post._id));

    setComments(newComments);
    setComment("");
    commentsRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments ? (
            comments.map((comment, index) => (
              <Typography gutterBottom variant="subtitle1" key={index}>
                <strong>{comment.split(": ")[0]}</strong>
                {comment.split(":")[1]}
              </Typography>
            ))
          ) : (
            <CircularProgress />
          )}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Say Something
            </Typography>

            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Reply"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleComment}
            >
              Say Something
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
