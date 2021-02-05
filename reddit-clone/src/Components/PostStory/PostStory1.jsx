import React from "react";
import styles from "./PostStory1.module.css";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { ImgVidForm } from "./ImgVidForm";
import MessageIcon from "@material-ui/icons/Message";
import ImageIcon from "@material-ui/icons/Image";
import LinkIcon from "@material-ui/icons/Link";
import PollIcon from "@material-ui/icons/Poll";

import { PostStory2 } from "./PostStory2";

const PostStory1 = () => {
  const communityList = [
    "music",
    "sports",
    "movies",
    "wallstreetbets",
    "dogcoins",
    "askScience",
    "whatisthisthing",
  ];

  const [currSelectType, setCurrSelectType] = React.useState("post");

  let postStyle, imgVidStyle;
  let postStyle2, imgVidStyle2;

  if (currSelectType === "post") {
    postStyle = `${styles.inputBoxStyle2} ${styles.inputBoxStyle}`;
    imgVidStyle = `${styles.inputBoxStyle1} ${styles.inputBoxStyle}`;
    postStyle2 = `${styles.buttonColor1}`;
    imgVidStyle2 = `${styles.buttonColor2}`;
  }

  if (currSelectType === "imgVid") {
    imgVidStyle = `${styles.inputBoxStyle2} ${styles.inputBoxStyle}`;
    postStyle = `${styles.inputBoxStyle1} ${styles.inputBoxStyle}`;
    imgVidStyle2 = `${styles.buttonColor1}`;
    postStyle2 = `${styles.buttonColor2}`;
  }

  const [title1, setTitle1] = React.useState("");
  const [desc1, setDesc1] = React.useState("");

  const [subreddit, setSubreddit] = React.useState("");

  const handleDesc1 = (value) => {
    setDesc1(value);
  };

  const handlePostSubmit1 = () => {
    var post_id = uuid();

    var subredditName = "sports";

    if (subreddit !== "") {
      subredditName = subreddit.split("/")[1];
    }

    var payload1 = {
      id: post_id,
      title: title1,
      upvotes: 0,
      img_src: null,
      upvote_status: null,
      description: desc1,
      background_image:
        "https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      subreddit: subredditName,
      username: "udit22022000",
      comment_count: 0,
      comments: [],
    };

    var payload2 = {
      id: uuid(),
      subreddit: subredditName,
      post_id: post_id,
    };

    var post_arr = [
      axios.post(
        `https://reddit-mock-server.herokuapp.com/${subredditName}`,
        payload1
      ),
      axios.post("https://reddit-mock-server.herokuapp.com/hot", payload2),
    ];

    Promise.all(post_arr).then((res) => console.log("posted successfully"));
  };

  const [title2, seTitle2] = React.useState("");
  const [imgLink, setImgLink] = React.useState("");

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer1}>
        <div>Create a Post</div>
        <div>
          <select
            className={styles.selectSubReddit}
            onChange={(e) => setSubreddit(e.target.value)}
          >
            <option>Choose a community :</option>
            {communityList.map((item) => (
              <option
                value={`r/${item}`}
                key={`r/${item}`}
              >{`r/${item}`}</option>
            ))}
          </select>
        </div>
        <div className={styles.selectPost}>
          <div>
            <div
              onClick={() => setCurrSelectType("post")}
              className={postStyle2}
            >
              <MessageIcon />
              &nbsp;&nbsp; Post
            </div>
            <div
              onClick={() => setCurrSelectType("imgVid")}
              className={imgVidStyle2}
            >
              <ImageIcon />
              &nbsp;&nbsp; Images & Video
            </div>
          </div>
          <div>
            <div className={`${postStyle} ${styles.inputArea1}`}>
              <input
                placeholder="Enter Title"
                value={title1}
                onChange={(e) => setTitle1(e.target.value)}
              />
              <div>
                <span>Enter Description</span>
                <PostStory2 handleDesc1={handleDesc1} />
              </div>
              <button onClick={handlePostSubmit1}>POST</button>
            </div>
            <div className={imgVidStyle}>
              <ImgVidForm />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainContainer2}>
        <img src="https://i.imgur.com/ItICaX5.png" alt="facts" />
      </div>
    </div>
  );
};

export { PostStory1 };
