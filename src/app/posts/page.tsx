import React from 'react';

import { getPosts } from '@/lib/posts';
import { Redis } from '@upstash/redis';

import Posts from './posts';

const redis = Redis.fromEnv();
export const revalidate = 0;

export const metadata = {
  title: 'Posts',
  description: 'Read my thoughts.',
};

export default async function PostsPage() {
  let allPosts = getPosts();
  const views = (
    await redis.mget<number[]>(
      ...allPosts.map((p) => ['pageviews', 'posts', p.slug].join(':')),
    )
  ).reduce(
    (acc, v, i) => {
      acc[allPosts[i].slug] = v ?? 0;
      return acc;
    },
    {} as Record<string, number>,
  );
  return <Posts allPosts={allPosts} views={views} />;
}
