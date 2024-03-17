import { cache, Suspense } from 'react';

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { CustomMDX } from '@/components/mdx';
import { getPosts } from '@/lib/posts';
import { reformatDate } from '@/lib/utils';
import { Redis } from '@upstash/redis';

import { ReportView } from './view';

const redis = Redis.fromEnv();
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata | undefined> {
  const post = getPosts().find((post) => post.slug === params.slug);

  if (!post) {
    return;
  }

  let { metadata, slug, content } = post;
  let ogImage = metadata.image
    ? `https://tarekhammami.me${metadata.image}`
    : `https://tarekhammami.me/og?title=${metadata.title}`;

  return {
    title: metadata.title,
    description: metadata.summary,
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
      type: 'article',
      url: `https://tarekhammami.me/posts/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.summary,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: { params: any }) {
  const post = getPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }
  const views =
    (await redis.get<number>(['pageviews', 'posts', params.slug].join(':'))) ??
    0;

  return (
    <MaxWidthWrapper>
      <ReportView slug={post.slug} />
      
      <div className="flex flex-row space-x-4 mb-6 text-sm text-secondaryDarker">
        <Link
          href="/"
          className="hover:text-secondaryDark duration-200 hover:underline"
        >
          Home
        </Link>
        <Link
          href="/posts"
          className="hover:text-secondaryDark duration-200 hover:underline"
        >
          More Posts
        </Link>
      </div>

      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <div className="flex flex-row space-x-2 items-center text-secondaryDarker">
          <span>{reformatDate(post.metadata.publishedAt)}</span>
          {/* TODO: UNCOMMENT */}
          {/* <span className="h-1 w-1 bg-secondaryDarker rounded-full" />
          <span>
            <span>
              {Intl.NumberFormat('en-US', { notation: 'compact' }).format(
                views,
              )}{' '}
              {' views'}
            </span>
          </span> */}
        </div>
      </div>

      <article className="prose prose-invert pb-10">
        <CustomMDX source={post.content} />
      </article>
    </MaxWidthWrapper>
  );
}
