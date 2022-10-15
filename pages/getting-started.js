import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../Components/Layouts/Navbar';
import Footer from '../Components/Layouts/Footer';

/** Images Import */
import Signup from '../assets/img/how-it-works/signup.jpg';
import Find from '../assets/img/how-it-works/find.jpg';
import Extension from '../assets/img/how-it-works/extension.jpg';
import Schedule from '../assets/img/how-it-works/schedule1.jpg';
import Enjoy from '../assets/img/how-it-works/enjoy.jpg';

const on = ['Netflix', 'YouTube', 'Online'];
const genre = ['Adventure', 'Action', 'Anime'];

export default function HowItWorks() {
  const [onGoing, setOnGoing] = useState(true);

  const toggleParty = () => setOnGoing(!onGoing);

  return (
    <div style={{ backgroundColor: '#040308' }}>
      <Head>
        <title>ViewingParty - Getting Started</title>
        <meta
          name='description'
          content='The best way to watch shows and movies with others'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />
      <div className={'pt-28 px-5 text-white'}>
        <div className={'container mx-auto'}>
          <div className={'my-5 text-center text-primary mt-5'}>
            <h1
              style={{ color: 'skyblue' }}
              className={'text-3xl font-bold md:text-4xl mb-2 md:mb-5'}
            >
              Getting Started
            </h1>
            <p style={{ color: 'white' }}>
              Get easily started with ViewingParty
            </p>
          </div>
          <div className={'my-16'}>
            <div
              className={
                'grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 md:mb-24'
              }
            >
              <div className={'grid place-items-center text-center'}>
                <div>
                  <h2
                    style={{ color: 'skyblue' }}
                    className={'text-3xl font-bold md:text-4xl mb-2 md:mb-5'}
                  >
                    Create account
                  </h2>
                  <p style={{ color: 'white' }}>
                    Create a free account to host or join watch parties
                  </p>
                </div>
              </div>
              <div className=''>
                <Image
                  className={'w-full bg-cover'}
                  src={Signup}
                  alt={'how-it-works'}
                />
              </div>
            </div>
            <div
              className={
                'grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 md:mb-24'
              }
            >
              <div className='md:col-start-1 md:row-start-1'>
                <Image
                  className={'w-full bg-cover'}
                  src={Extension}
                  alt={'how-it-works'}
                />
              </div>
              <div
                className={'row-start-1 grid place-items-center text-center'}
              >
                <div>
                  <Link href={'/download'} passHref>
                    <h2
                      style={{ color: 'skyblue' }}
                      className={'text-3xl font-bold md:text-4xl mb-2 md:mb-5'}
                    >
                      Download Extension
                    </h2>
                  </Link>
                  <p style={{ color: 'white' }}>
                    Visit our download page for instructions on how to download
                    and install the ViewingParty extension on your browser{' '}
                    extension on your browser
                  </p>
                  <Link href={'/download'} passHref>
                    <h4
                      style={{
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'skyblue',
                        width: '200px',
                        textAlign: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingLeft: 'auto',
                        paddingRight: 'auto',
                        marginTop: '20px',
                      }}
                      className={
                        'text-3xl font-bold md:text-2xl mb-2 md:mb-5 rounded bg-red cursor-pointer'
                      }
                    >
                     <button
                 
                 className='mr-5 text-sm sm:border sm:bg-primary hover:bg-transparent hover:border-primary hover:border sm:px-5 duration-200 font-semibold sm:py-1 rounded-full text-gray-300 sm:text-gray-900 hover:text-white'
               >
                          Get Extension
               </button>
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={
                'grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 md:mb-24'
              }
            >
              <div
                className={'row-start-1 grid place-items-center text-center'}
              >
                <div>
                  <Link href={'/discover'} passHref>
                    <h2
                      style={{ color: 'skyblue' }}
                      className={'text-3xl font-bold md:text-4xl mb-2 md:mb-5'}
                    >
                      Browse and join watch party
                    </h2>
                  </Link>
                  <p style={{ color: 'white' }}>
                    Find a party to join on our schedules page. Filter your
                    tastes by different genres, content providers and dates
                  </p>
                </div>
              </div>
              <div className=''>
                <Image
                  className={'w-full bg-cover'}
                  src={Find}
                  alt={'how-it-works'}
                />
              </div>
            </div>
            <div
              className={
                'grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 md:mb-24'
              }
            >
              <div className='row-start-2 md:row-start-1'>
                <Image
                  className={'w-full bg-cover'}
                  src={Schedule}
                  alt={'how-it-works'}
                />
              </div>
              <div className={'grid place-items-center text-center'}>
                <div>
                  <h2
                    style={{ color: 'skyblue' }}
                    className={'text-3xl font-bold md:text-4xl mb-2 md:mb-5'}
                  >
                    Schedule and invite a friend
                  </h2>
                  <p style={{ color: 'white' }}>
                    You can also host your own watch party and list it on the
                    schedule page. Be sure to announce your watch party on
                    social media and tell all your friends
                  </p>
                </div>
              </div>
            </div>
            <div
              className={
                'grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 md:mb-24'
              }
            >
              <div
                className={'row-start-1 grid place-items-center text-center'}
              >
                <div>
                  <h2
                    style={{ color: 'skyblue' }}
                    className={'text-3xl font-bold md:text-4xl mb-2 md:mb-5'}
                  >
                    Enjoy ViewingParty
                  </h2>
                  <p>
                    <span style={{ color: 'white' }} className={'text-primary'}>
                      Be part of a community watch party, enjoying your favorite
                      movies and/or shows. React with fellow fans and have a
                      discussion, or save the serious thoughts for the end.
                      Content is meant to be enjoyed, now you can do it
                      simultaneously with others on ViewingParty
                    </span>

                  </p>
                </div>
              </div>
              <div className=''>
                <Image
                  className={'w-full bg-cover'}
                  src={Enjoy}
                  alt={'how-it-works'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
