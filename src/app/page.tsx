import Image from 'next/image';
import Link from 'next/link';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { CONFIG } from '@/config';
import { getPosts } from '@/lib/posts';
import { reformatDate } from '@/lib/utils';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
export const revalidate = 0;

const socialBorder = `border group hover:border-secondaryDarker duration-200 rounded px-1.5 py-1 border-neutral-800 items-center justify-center flex w-[36px] h-[32px]`;

export default async function Home() {
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
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col space-y-6 md:space-y-10">
        <div className="flex flex-col space-y-6 md:space-y-10 md:px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-row items-center space-x-3">
              <Image
                src={CONFIG.headshot}
                alt=""
                width={100}
                height={100}
                className="rounded-full h-[48px] w-[48px] pointer-events-none"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{CONFIG.name}</span>
                <span className="text-secondaryDarker">{CONFIG.title}</span>
              </div>
            </div>
            <div className="flex flex-row space-x-1">
              {/* USED ICON PACK: https://iconmonstr.com */}
              { CONFIG.socials.github && (
                <a
                  href={`https://github.com/${CONFIG.socials.github}`}
                  target="_blank"
                  className={`${socialBorder}`}
                  title='GitHub'
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    className="text-secondaryDarker group-hover:text-secondaryDark duration-200"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                    ></path>
                  </svg>
                </a>
              )}
              { CONFIG.socials.linkedin && (
              <a
                href={`https://www.linkedin.com/in/${CONFIG.socials.linkedin}`}
                target="_blank"
                className={`${socialBorder}`}
                title='LinkedIn'
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="text-secondaryDarker group-hover:text-secondaryDark duration-200"
                >
                  <path
                    fill="currentColor"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
                  ></path>
                </svg>
              </a>
              )}
              {/* { CONFIG.socials.x && (
              <a
                href={`https://x.com/${CONFIG.socials.x}`}
                target="_blank"
                className={`${socialBorder}`}
                title='X'
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="text-secondaryDarker group-hover:text-secondaryDark duration-200"
                >
                  <path
                    fill="currentColor"
                    d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231l5.45-6.231Zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77Z"
                  ></path>
                </svg>
              </a>
              )} */}
              { CONFIG.socials.stackoverflow && (
                <a
                href={`https://stackoverflow.com/users/${CONFIG.socials.stackoverflow}`}
                target="_blank"
                className={`${socialBorder}`}
                title='Stack Overflow'
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className="text-secondaryDarker group-hover:text-secondaryDark duration-200"
                  width="18" height="18" viewBox="0 0 24 24">
                    <path 
                      fill="currentColor"
                      d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.993.346 1.62 9.335 1.994-.346zm-5.964 6.937l-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587l-9.276-2.608-.526 1.954 9.306 2.5.496-1.846zm1.204-2.413l-8.297-4.864-1.029 1.743 8.298 4.865 1.028-1.744zm1.866-1.467l-5.339-7.829-1.672 1.14 5.339 7.829 1.672-1.14zm-2.644 4.195v8h-12v-8h-2v10h16v-10h-2z"/>
                </svg>
              </a>
              )}
              { CONFIG.socials.dev && (
                <a
                href={`https://dev.to/${CONFIG.socials.dev}`}
                target="_blank"
                className={`${socialBorder}`}
                title='DEV.to'
              >
                <svg 
                  width="26" height="26"
                  xmlns="http://www.w3.org/2000/svg" aria-label="dev.to"
                  viewBox="0 0 512 512"
                  className="text-secondaryDarker group-hover:text-secondaryDark duration-200 scale-125"
                  >
                    <path 
                      fill="currentColor"
                      d="M140.47 203.94h-17.44v104.47h17.45c10.155-.545 17.358-8.669 17.47-17.41v-69.65c-.696-10.364-7.796-17.272-17.48-17.41zm45.73 87.25c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H233.6v38.42h32.57v29.57H233.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z"></path>
                </svg>
              </a>
              )}
              
              {/* { CONFIG.socials.youtube && (
              <a
                href={`https://www.youtube.com/@${CONFIG.socials.youtube}`}
                target="_blank"
                className={`${socialBorder}`}
                title='YouTube'
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="text-secondaryDarker group-hover:text-secondaryDark duration-200"
                >
                  <path
                    fill="currentColor"
                    d="m10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73Z"
                  ></path>
                </svg>
              </a>
              )} */}
              {/* { CONFIG.socials.discord && (
              <a
                href={`https://discordapp.com/users/${CONFIG.socials.discord}`}
                target="_blank"
                className={`${socialBorder}`}
                title='Discord'
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="text-secondaryDarker group-hover:text-secondaryDark duration-200"
                >
                  <path
                    fill="currentColor"
                    d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"
                  ></path>
                </svg>
              </a>
              )} */}
              { CONFIG.socials.telegram && (
              <a
                href={`https://t.me/${CONFIG.socials.telegram}`}
                target="_blank"
                className={`${socialBorder}`}
                title='Telegram'
              >
                <svg
                  width="18"
                  height="18"
                  className="text-secondaryDarker group-hover:text-secondaryDark duration-200"
                  viewBox="0 0 24 24"
                  version="1.1" xmlns="http://www.w3.org/2000/svg" style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1.41421'}}
                >
                  <path 
                    fill="currentColor"
                    d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"
                  />
                </svg>
              </a>
              )}
              </div>
          </div>

          <span className="text-secondaryDark leading-6">
            {CONFIG.description}
          </span>
        </div>

        <div className="flex flex-col space-y-10">
          {/* Projects */}
          <div className="flex flex-col space-y-4">
            <span className="font-semibold md:px-6">Featured Projects</span>
            <div className="flex flex-col space-y-8 md:space-y-1 md:px-2">
              {CONFIG.projects.map((project, idx) => {
                if (project.featured) {
                  return (
                    <Link
                      key={idx}
                      href={project.link}
                      // TODO: USE SIMILAR LINKS FOR PROJECT CASE STUDIES
                      // href={'/posts/understanding-convex-functions'}
                      target="_blank"
                      className="flex flex-row justify-between items-center duration-300 md:hover:bg-hoverBackground md:p-4 rounded-lg cursor-pointer"
                    >
                      <div className="flex flex-row space-x-4 items-center">
                        <Image
                          src={project.image}
                          alt=""
                          width={40}
                          height={40}
                          className="w-[40px] h-[40px]"
                        />
                        <div className="flex flex-col">
                          <span className="text-secondaryDark">
                            {project.name}
                          </span>
                          <span className="text-secondaryDarker">
                            {project.description}
                          </span>
                        </div>
                      </div>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-secondaryDarker"
                      >
                        <path
                          d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  );
                }
              })}
            </div>
            <Link
              href="/projects"
              className="flex flex-row space-x-2 items-center md:px-6 group cursor-pointer justify-end"
            >
              <span className="text-secondary text-sm">All Projects</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="text-secondary group-hover:translate-x-1 duration-200"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1.25 8A.75.75 0 0 1 2 7.25h10.19L9.47 4.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H2A.75.75 0 0 1 1.25 8"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          {/* Posts */}
          <div className="flex flex-col space-y-4">
            <span className="font-semibold md:px-6">Recent Posts</span>
            <div className="flex flex-col space-y-8 md:space-y-1 md:px-2">
              {allPosts
                .filter((post) => post.metadata.featured === 'true')
                .sort((a, b) => {
                  if (
                    new Date(a.metadata.publishedAt) >
                    new Date(b.metadata.publishedAt)
                  ) {
                    return -1;
                  }
                  return 1;
                })
                .slice(0, 3)
                .map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="flex flex-row justify-between items-center duration-300 md:hover:bg-hoverBackground md:p-4 rounded-lg cursor-pointer"
                  >
                    <div className="flex flex-col space-y-2">
                      <span className="text-secondaryDark">
                        {post.metadata.title}
                      </span>
                      <div className="flex flex-row space-x-2 items-center text-secondaryDarker">
                        <span>{reformatDate(post.metadata.publishedAt)}</span>
                        {/* TODO: UNCOMMENT */}
                        {/* <span className="h-1 w-1 bg-secondaryDarker rounded-full" />
                        <span>
                          <span>
                            {Intl.NumberFormat('en-US', {
                              notation: 'compact',
                            }).format(views[post.slug])}{' '}
                            {' views'}
                          </span>
                        </span> */}
                      </div>
                    </div>

                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-secondaryDarker"
                    >
                      <path
                        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                ))}
            </div>
            <Link
              href="/posts"
              className="flex flex-row space-x-2 items-center md:px-6 group cursor-pointer  justify-end"
            >
              <span className="text-secondary text-sm">All Posts</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="text-secondary group-hover:translate-x-1 duration-200"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1.25 8A.75.75 0 0 1 2 7.25h10.19L9.47 4.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H2A.75.75 0 0 1 1.25 8"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          {/* Reads */}
          <div className="flex flex-col space-y-4">
            <span className="font-semibold md:px-6">Recent Reads</span>
            <div className="flex flex-col space-y-8 md:space-y-1 md:px-2">
              {CONFIG.reading
                .sort(
                  (a, b) =>
                    new Date(b.dateFinished).getTime() -
                    new Date(a.dateFinished).getTime(),
                )
                .slice(0, 2)
                .map((book, idx) => {
                  // const reformattedDate = reformatDate(book.dateFinished);
                  return (
                    <Link
                      key={idx}
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row justify-between items-center duration-300 md:hover:bg-hoverBackground md:p-4 rounded-lg cursor-pointer"
                    >
                      <div className="flex flex-row space-x-4">
                        <div className="flex flex-col">
                          <span className="text-secondaryDark">
                            {book.title}{/* {' '}
                            <span className="text-secondaryDarker">
                              by {book.author}
                            </span> */}
                          </span>
                          <span className="text-secondaryDarker">
                            by {book.author}
                          </span>
                          {/* <span className="text-secondaryDarker">
                            Finished: {reformatDate(book.dateFinished)}
                          </span> */}
                        </div>
                      </div>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-secondaryDarker"
                      >
                        <path
                          d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  );
                })}
            </div>
            <Link
              href="/reading"
              className="flex flex-row space-x-2 items-center md:px-6 group cursor-pointer justify-end"
            >
              <span className="text-secondary text-sm">
                Books I&apos;ve Read
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="text-secondary group-hover:translate-x-1 duration-200"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1.25 8A.75.75 0 0 1 2 7.25h10.19L9.47 4.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H2A.75.75 0 0 1 1.25 8"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className='md:px-2 flex flex-row items-center justify-between mt-6 mb-4'>
        <span className='flex-1'></span>
        
        <span className='text-secondaryDarker md:p-4'>Personal Website v3</span>
        
        <div className='flex-1'>
          <Link
            className="flex flex-row justify-end gap-2 w-fit ml-auto items-center duration-300 md:hover:bg-hoverBackground md:p-4 rounded-lg cursor-pointer"
            href={"https://v2.tarekhammami.me"}
            target='_blank'
            rel="noopener noreferrer"
          >
            <span className="text-secondaryDarker">v2</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="text-secondaryDarker"
            >
              <path
                d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
