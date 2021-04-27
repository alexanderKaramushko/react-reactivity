import React, { FC, ReactElement, Suspense, useState } from 'react';

import { fetchPostComments, fetchPost } from '../api';
import { wrapPromise } from '../utils';

import Post from './Post';

let postId = 1;
const initialPost = wrapPromise(fetchPost(postId));
const initialComments = wrapPromise(fetchPostComments(postId));

const Posts: FC = (): ReactElement => {
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);

  function fetchNextPostWithComments(): void {
    postId += 1;

    setPost(wrapPromise(fetchPost(postId)));
    setComments(wrapPromise(fetchPostComments(postId)));
  }

  return (
    <Suspense fallback={<h2>Загрузка поста...</h2>}>
      <Post
        comments={comments}
        post={post}
      />
      <button
        onClick={fetchNextPostWithComments}
        type="button"
      >
        Далее
      </button>
    </Suspense>
  );
};

export default Posts;
