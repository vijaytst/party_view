import React from 'react';
import Head from 'next/head';

const defaultDescription =
  'Watch movies, shows, sports and other events together with friends or viewers all around the world';

const SeoLayout = ({
  children,
  title = 'ViewParty | Watch movies with loveed ones and close friends',
  description = defaultDescription,
  image = 'https://viewingparty.net/_next/image?url=%2Fimages%2Fheader2.jpg&w=750&q=75',
  quote = defaultDescription,
  hashtag = 'Movies, Loves One, Party, Watch Party, Watch Movies, New Movies, Netflix, Twitch, Friends and Families',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta property='type' content='website' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <meta name='theme-color' content='#66fcf1' />
        <meta property='title' content={title} />
        <meta property='quote' content={quote} />
        <meta name='description' content={description} />
        <meta property='image' content={image} />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:quote' content={quote} />
        <meta property='og:hashtag' content={hashtag} />
        <meta property='og:image' content={image} />
        <meta content='image/*' property='og:image:type' />
        <meta property='og:site_name' content='Viewing Party' />
        <meta property='og:description' content={description} />
      </Head>
      {children}
    </>
  );
};

export default SeoLayout;
