import React, { useState, useEffect, useContext } from 'react';
import { Tooltip, DatePicker, Space, notification } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BookOutlined, ShareAltOutlined } from '@ant-design/icons';
import Navbar from '../../Components/Layouts/Navbar';
import Footer from '../../Components/Layouts/Footer';
import axios from '../../services/axios';
import { API_KEY } from '../../services/Parties';
import { FormAuthContext } from '../_app';
import Axios from 'axios'

export default function Discover( ) {
  const context = useContext(FormAuthContext);
  const [authToken, setAuthToken] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);
  const [party, setParty] = useState({});
  const [date, setDate] = useState('');
  const [header, setHeader] = useState('');
  const [dateError, setDateError] = useState(false);
  const router = useRouter();
  const { partyId } = router?.query;

  useEffect(() => {
    let userToken = localStorage.getItem('accessToken');
    if (userToken) {
      setAuthToken(true);
      setHeader(userToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(async ()=>{

    const party = await axios.get(
      `get-single-api-series`,
      {
        params: {
          movieId: partyId,
        },
      }
    ).then((data)=>{
    setParty(data.data.data[0])


    }).catch((err)=>{
      console.log(err)
    });
    
  }, [])

  const onChange = (date, dateString) => setDate(dateString);

  const schedule = () => {
    setDateError(false);
    if (!date) {
      setDateError(true);
      return '';
    }
    axios.defaults.headers['x-access-token'] = header;
    axios
      .post('/create-schedule', {
        originalName: party.original_title,
        description: party.overview,
        movieId: partyId,
        movieImg: party.backdrop_path,
        overview: party.overview,
        attendees: [],
        scheduleDate: date,
      })
      .then(() => {
        notification.success({
          message: 'Schedule Successful',
          description: 'Your schedule was successful',
          duration: 5000,
        });
        router.push('/profile');
      })
      .catch(() => {
        notification.warn({
          message: 'Schedule Error',
          description: 'Unable to schedule, try again later',
          duration: 5000,
        });
      });
  };

  return (
    <div style={{ backgroundColor: '#040308' }}>
      <Head>
        <title>ViewingParty - {party?.original_title}</title>
        <meta
          name='description'
          content='The best way to watch shows and movies with others'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />
      <div className={'pt-28 px-5 text-white'}>
        <div className={'container mx-auto'}>
          <div
            className={'w-full grid grid-cols-1 md:grid-cols-2 gap-10 py-14'}
          >
            <div className={'rounded-lg relative discover__card'}>
              <div
                className={
                  'discover__display absolute hidden md:grid place-content-center h-full w-full'
                }
                style={{ backgroundColor: '#0b0c1099' }}
              >
                <div
                  className={
                    'flex items-center text-base sm:text-lg text-white opacity-100'
                  }
                >
                  {authToken ? (
                    <button
                      onClick={() => setIsSchedule(!isSchedule)}
                      className={
                        'bg-gray-900 px-8 py-4 flex items-center rounded-sm'
                      }
                    >
                      <p className={'mr-2'}>Schedule</p>
                      <BookOutlined
                        className={''}
                        style={{ fontSize: '20px', color: '#66fcf1' }}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => context.openForm(2)}
                      className={
                        'bg-gray-900 px-8 py-4 flex items-center rounded-sm'
                      }
                    >
                      <p className={'mr-2'}>Login to Schedule</p>
                      <BookOutlined
                        className={''}
                        style={{ fontSize: '20px', color: '#66fcf1' }}
                      />
                    </button>
                  )}
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={'w-full bg-cover'}
                 src={`https://image.tmdb.org/t/p/original${party?.backdropPath}`}
                alt='event'
              />
            </div>
            <div>
              <div className='flex flex-col mb-8 h-full'>
                <div>
                  <div className='mb-2'>
                    <Link href='#' passHref>
                      <h1
                        className={
                          'cursor-pointer text-2xl md:text-3xl capitalize font-sans font-semibold'
                        }
                      >
                        {party?.title}
                      </h1>
                    </Link>
                  </div>
                  <div className={'text-base text-gray-300'}>
                    <p>{party?.overview}</p>
                  </div>
                  <div className={'my-3'}>
                    <div className={'flex flex-row mb-3'}>
                      {/* {party.genres.map((e, i) => (
                        <Link key={i} href="#" passHref>
                          <div
                            className={
                              "cursor-pointer text-gray-900 bg-gray-300 text-xs px-3 mr-2"
                            }
                          >
                            {e.name}
                          </div>
                        </Link>
                      ))} */}
                    </div>
                    <div className={'flex items-center'}>
                      <p className={'font-mono mr-4'}>Adult:</p>
                      <div className={''}>
                        {party?.adult ? 'For adult' : 'For all'}
                      </div>
                    </div>
                    <div className={'flex items-center'}>
                      <p className={'font-mono mr-4'}>Episodes:</p>
                      <div
                        className={'text-gray-900 px-3 mr-2'}
                        style={{ backgroundColor: '#66fcf1' }}
                      >
                        {party?.episodes}
                      </div>
                    </div>
                    <div className={'flex items-start'}>
                      <p className={'font-mono mr-4'}>Imdb Rating:</p>
                      <div className={'px-3 mr-2'}>{party?.imdbRating}</div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center'>
                  <Tooltip title='Share'>
                    <div
                      className={
                        'bg-gray-900 w-min p-2 mr-3 rounded-full cursor-pointer'
                      }
                    >
                      <ShareAltOutlined
                        className={''}
                        style={{ fontSize: '25px' }}
                      />
                    </div>
                  </Tooltip>
                  {/* <Tooltip title="Schedule">
                    <div
                      className={
                        "bg-gray-900 w-min mr-3 p-2 rounded-full cursor-pointer"
                      }
                    >
                      <BookOutlined
                        className={""}
                        style={{ fontSize: "25px" }}
                      />
                    </div>
                  </Tooltip> */}
                  {authToken ? (
                    <Tooltip title='Schedule'>
                      <button
                        onClick={() => setIsSchedule(!isSchedule)}
                        className={
                          'bg-gray-900 w-min px-4 py-2 rounded-full cursor-pointer'
                        }
                      >
                        Schedule
                      </button>
                    </Tooltip>
                  ) : (
                    <Tooltip title='Login'>
                      <button
                        onClick={() => context.openForm(2)}
                        className={
                          'bg-gray-900 w-max px-4 py-2 rounded-full cursor-pointer'
                        }
                      >
                        Login to Schedule
                      </button>
                    </Tooltip>
                  )}
                </div>
                {isSchedule ? (
                  <div>
                    <div className={'mt-6 flex items-center'}>
                      <div className={'mr-5'}>
                        <Space
                          className={'text-white'}
                          direction='vertical'
                          size={12}
                          style={{
                            color: '#fff',
                            border: 'none',
                            outline: 'none',
                          }}
                        >
                          <DatePicker
                            placeholder={'Select date for party'}
                            style={{
                              color: '#fff',
                              border: 'none',
                              outline: 'none',
                            }}
                            onChange={onChange}
                            className={
                              'py-2 rounded-md text-lg bg-gray-900 text-white font-semibold outline-none focus:outline-none'
                            }
                            showTime
                          />
                        </Space>
                      </div>
                      <div>
                        <button
                          onClick={() => schedule()}
                          className={
                            'bg-gray-900 w-max px-4 py-2 rounded-full cursor-pointer'
                          }
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                    {dateError ? (
                      <p className={'text-blue-300'}>Party date is needed</p>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


export async function getServerSideProps(context) {
  try {
    const party = await axios.get(
      `get-single-api-series`,
      {
        params: {
          movieId: context.query.partyId,
        },
      }
    );


    return {
      props: {
        party: party.data,
      },
    };
  } catch (error) {
    console.log('error from single series page');
    return {
      props: {
        redirect: !context.query.movieId,
      },
    };
  }
}