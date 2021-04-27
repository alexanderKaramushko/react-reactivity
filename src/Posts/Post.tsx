/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactElement } from 'react';

const Post: FC<any> = (props): ReactElement => {
  const { comments, post } = props;

  const { body, title } = post.read();
  const postComments = comments.read() as any[];

  return (
    <div style={{ maxWidth: 600 }}>
      <h1>{title}</h1>
      <p>{body}</p>

      <h2>Комментарии:</h2>

      <div style={{ paddingLeft: 14 }}>
        {postComments.map((postComment) => (
          <div key={postComment.id}>
            <h3>{postComment.name}</h3>
            <p>{postComment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
