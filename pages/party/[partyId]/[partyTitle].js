import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  FacebookShareButton,
  LinkedinShareButton,
  FacebookIcon,
  PinterestShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestIcon,
} from 'react-share';
import { notification } from 'antd';
import Navbar from '../../../Components/Layouts/Navbar';
import Footer from '../../../Components/Layouts/Footer';
import axios from '../../../services/axios';
import SeoLayout from '../../../Components/Layouts/SeoLayout';

export default function Discover({ party, error }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const joinParty = () => {
    setLoading(true);
    const data = {
      partyId: router.query.partyId,
    };
    axios.defaults.headers['x-access-token'] = window.localStorage.accessToken;
    axios
      .post('/join-party', data)
      .then(data => {
        notification.success({
          description: 'Joined Party',
          duration: 4000,
        });
        setLoading(false);
        setDone(true);
        router.push(`/chat?partyId=${party?._id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (error) {
      notification.error({ message: error, duration: 10000 });
    }
  }, [error]);

  return !error ? (
    <SeoLayout
      title={party?.partyTitle}
      quote={party?.overview.substring(0, 70)}
      description={`${party?.movieName} | ${party?.overview.substring(0, 60)}`}
      image={party?.image}
      hashtag={party?.genre.join(', ')}
    >
      <div
        style={{
          backgroundColor: '#040308',
          minHeight: '100vh',
        }}
        className='flex flex-col'
      >
        <Navbar />
        <div
          className={
            'pt-28 px-5 flex-1 flex flex-col justify-center text-white pb-10'
          }
        >
          <div className={'container mx-auto'}>
            <div
              className={
                'w-full grid grid-cols-1 md:grid-cols-2 gap-10 pt-14 items-center'
              }
            >
              <div
                style={{ height: '30rem' }}
                className='rounded-lg bg-gray-300 relative discover__card'
              >
                <img
                  src={party?.movieImg}
                  alt={party?.partyTitle}
                  className='h-full w-full object-cover'
                  layout='fill'
                />
              </div>
              <div>
                <div className='flex flex-col mb-8 h-full'>
                  <div>
                    <div className='mb-2'>
                      <h1 className='text-2xl md:text-3xl capitalize font-sans font-semibold'>
                        {party?.partyTitle}
                      </h1>
                    </div>
                    <h4 className='text-primary text-xl font-bold font-mono mb-2'>
                      {party?.movieName}
                    </h4>
                    <div className={'text-base text-gray-300'}>
                      <p>{party?.overview}</p>
                    </div>
                    <div className='my-4'>
                      {!done &&
                        (loading ? (
                          <i className='fa fa-spin fa-spinner text-gray-200 text-xl block max-w-max mx-auto'></i>
                        ) : (
                          <button
                            onClick={() => joinParty()}
                            className='bg-primary duration-200 hover:bg-opacity-70 block w-full max-w-max px-10 rounded-full mx-auto shadow-md py-3 text-gray-900 text-base font-bold'
                          >
                            Join Party
                          </button>
                        ))}
                      {done && (
                        <h4 className='text-center text-gray-300 text-lg'>
                          Redirecting...
                        </h4>
                      )}
                    </div>
                    <div className={'mt-5'}>
                      <div className={'flex flex-row mb-3'}>
                        {party?.genre.map((e, i) => (
                          <Link key={i} href='#' passHref>
                            <div
                              className={
                                'cursor-pointer text-gray-900 bg-blue-300 text-xs px-3 font-semibold mr-2'
                              }
                            >
                              {e}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='mt-10 relative border-t max-w-xs border-gray-300 pt-5'>
                    <h4
                      style={{ top: '-.8rem', backgroundColor: '#000' }}
                      className='absolute text-center px-5 max-w-max mx-auto right-0 left-0'
                    >
                      Invite Guest to your Party
                    </h4>
                    <div className='py-2 flex items-center justify-evenly'>
                      <FacebookShareButton
                        style={{ outline: 'none' }}
                        quote={party?.overview}
                        title={party?.partyTitle}
                        className='outline-none '
                        url={`https://viewingparty.net/party/${party._id}`}
                      >
                        <FacebookIcon className='rounded-full h-10 w-10 outline-none' />
                      </FacebookShareButton>
                      <LinkedinShareButton
                        url={`https://viewingparty.net/party/${party._id}`}
                        title={party?.partyTitle}
                        className='ml-2'
                        source='Viewing Party'
                        summary={party?.overview}
                      >
                        <LinkedinIcon className='rounded-full h-10 w-10 outline-none' />
                      </LinkedinShareButton>
                      <TwitterShareButton
                        url={`https://viewingparty.net/party/${party._id}`}
                        title={party?.partyTitle}
                        className='ml-2'
                      >
                        <TwitterIcon className='rounded-full h-10 w-10 outline-none' />
                      </TwitterShareButton>
                      <PinterestShareButton
                        media={party?.movieImg}
                        url={`https://viewingparty.net/party/${party._id}`}
                        description={party?.partyTitle}
                        title={party?.partyTitle}
                        className='ml-2'
                      >
                        <PinterestIcon className='rounded-full h-10 w-10 outline-none' />
                      </PinterestShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SeoLayout>
  ) : (
    ''
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await axios.get(`/get-schedule/${context.query.partyId}`);
    return {
      props: {
        party: res.data.data,
      },
    };
  } catch (error) {
    console.log('errrr__________________', error);
    return {
      props: {
        error: error.response
          ? error.response.data.message.message
          : 'Something went ',
      },
    };
  }
}
