import { Avatar, Comment, Tooltip } from "antd";
import moment from "moment";

export default function CommentItem({comment}) {

  return (
    <Comment
      author={comment.author}
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={
        <p>
          {comment.content}
        </p>
      }
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
}
