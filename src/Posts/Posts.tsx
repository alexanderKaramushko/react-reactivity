/* eslint-disable @typescript-eslint/camelcase */
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import React, { FC, ReactElement, Suspense, useState, unstable_useTransition } from 'react';

import { fetchPostComments, fetchPost } from '../api';
import { wrapPromise } from '../utils';

import Post from './Post';

let postId = 1;
const initialPost = wrapPromise(fetchPost(postId));
const initialComments = wrapPromise(fetchPostComments(postId));

const Posts: FC = (): ReactElement => {
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);

  const [isPending, startTransition] = unstable_useTransition({
    timeoutMs: 3000,
  });

  function fetchNextPostWithComments(): void {
    startTransition(() => {
      postId += 1;

      setPost(wrapPromise(fetchPost(postId)));
      setComments(wrapPromise(fetchPostComments(postId)));
    });
  }

  return (
    <Suspense fallback={<h2>Загрузка поста...</h2>}>
      <Post
        comments={comments}
        post={post}
      />
      <button
        disabled={isPending}
        onClick={fetchNextPostWithComments}
        type="button"
      >
        {isPending ? 'Загрузка поста...' : 'Далее'}
      </button>
    </Suspense>
  );
};

export default Posts;
