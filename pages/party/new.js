import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Space, DatePicker, notification } from 'antd';
import { userContext } from '../_app';
import InputField from '../../Components/Auth/InputField';
import TextArea from '../../Components/Auth/TextArea';
import axios from '../../services/axios';
import { API_KEY } from '../../services/Parties';
import { useRouter } from 'next/router';
import ShareParty from '../../Components/Parties/ShareParty';

const New = ({ party, redirect }) => {
  const { userInfo } = useContext(userContext);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(0);
  const [isSubmmitting, setSubmmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (redirect) {
      notification.warn({ message: 'Please pick a movie to schedule' });
      router.push('/discover');
    }
  }, []);

  const [newParty, setNewParty] = useState({
    partyTitle: '',
    originalName: party?.original_title,
    movieName: party?.original_title,
    movieId: party?.id,
    movieImg: `https://image.tmdb.org/t/p/original${party?.poster_path}`,
    overview: party?.overview,
    rating: party?.vote_average,
    genre: party?.genres ? party?.genres.map(genre => genre.name) : [],
    scheduleDate: '',
  });
  const validationSchema = Yup.object().shape({
    partyTitle: Yup.string().required('Please enter Party title'),
    originalName: Yup.string().required('Please enter Movie Name'),
    movieImg: Yup.string()
      .required('Please enter Movie ')
      .url('Please enter a valid link'),
    overview: Yup.string().required('Please give an overiew'),
  });

  const handleCreateParty = async () => {
    if (newParty.scheduleDate) {
      setSubmmitting(true);
      try {
        const res = await axios.post('/create-schedule', newParty, {
          headers: {
            'x-access-token': localStorage.accessToken,
          },
        });
        setSubmmitting(false);
        setStep(3);
        notification.success({
          message: 'Party created!',
          description: 'Invite people to watch with you',
        });
        setNewParty(res.data.data);
  
      } catch (error) {
        setSubmmitting(false);
        console.log('error', error);
      }
    }
  };

  // useEffect(() => {
  //   if (!userInfo.loading && !userInfo.isAuthenticated) {
  //     router.push({ pathname: '/', query: { auth: 'login' } });
  //     notification.error({ message: 'Please login first!' });
  //   }
  // }, [userInfo]);

  return userInfo.loading ? (
    <div className='grid place-content-center h-screen'>
      <i className='fa fa-spin fa-spinner text-2xl'></i>
    </div>
  ) : (
    <div>
      {!redirect && (
        <div className='min-h-screen pb-10 bg-gray-900'>
          <div
            className='px-10 py-5 flex items-center justify-between'
            style={{ backgroundColor: '#36404a' }}
          >
            <div className='flex items-center'>
              <figure className='m-0 p-0 mr-5 min-w-max'>
                <img
                  className='w-16 h-16 object-contain rounded-full'
                  src={
                    userInfo.data?.profileImage === 'default.png'
                      ? '/images/header2.jpg'
                      : userInfo.data?.profileImage
                  }
                  className='w-14 h-14 rounded-full'
                  alt={userInfo.data?.userName}
                />
              </figure>
              <div>
                <h4 className='text-xl mb-1 text-primary'>
                  {userInfo.data?.userName}
                </h4>
                <h6 className='font-mono text-gray-50 font-semibold opacity-90'>
                  Create a Party
                </h6>
              </div>
            </div>
            <button className='w-8 h-8 rounded-full grid place-content-center text-base bg-gray-500 text-gray-100'>
              <i className='fa fa-ellipsis-h'></i>
            </button>
          </div>
          {step === 1 && (
            <>
              <div className='max-w-sm px-5 mx-auto mt-10'>
                <h4 className='text-center text-xl font-semibold'>
                  <span className='text-primary'>ViewParty</span> Info
                </h4>
                <div className='mt-5'>
                  <figure className='m-0 p-0 max-w-xs h-56'>
                    <img
                      src={newParty?.movieImg}
                      className='w-full object-cover h-full'
                      alt={newParty.originalName}
                    />
                  </figure>
                  <h3 className='mt-2 font-semibold text-lg text-center text-gray-300'>
                    {newParty.originalName}
                  </h3>
                </div>
                <Formik
                  initialValues={newParty}
                  validationSchema={validationSchema}
                  onSubmit={values => {
                    setNewParty(values);
                    setStep(2);
                  }}
                >
                  <Form id='new-party-form' className='mt-10'>
                    <InputField
                      noMargin
                      id='partyTitle'
                      label='Party Title'
                      name='partyTitle'
                    />
                    <button
                      type='submit'
                      className='mt-5 border bg-primary hover:bg-transparent hover:border-primary hover:border px-5 hover:text-white duration-200 font-semibold sm:py-1 rounded-full text-gray-900'
                    >
                      Next
                    </button>
                  </Form>
                </Formik>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className='max-w-xl px-5 mx-auto mt-10'>
                <button
                  onClick={() => setStep(1)}
                  className='w-11 h-11 rounded-full grid place-content-center text-base border border-opacity-80 border-primary duration-200 hover:bg-gray-800 text-gray-100'
                >
                  <i className='fa fa-arrow-left'></i>
                </button>
              </div>
              <div className='max-w-sm mt-5 mx-auto px-5'>
                <h4 className='text-center text-xl mb-7 font-semibold'>
                  Choose Time
                </h4>
                <button
                  onClick={() => {
                    setSelected(1);
                    setNewParty({
                      ...newParty,
                      started: false,
                      scheduleDate: '',
                    });
                  }}
                  className={`rounded-full block w-full text-lg ${
                    selected === 1 && 'bg-gray-700 text-opacity-80'
                  } border border-primary text-gray-100 py-2`}
                >
                  <i className='far fa-clock mr-3'></i>
                  Set Time
                </button>
                {typeof newParty.started !== undefined &&
                  newParty.started === false && (
                    <div className={'mt-5'}>
                      <div className={''}>
                        <Space
                          className={'text-white'}
                          direction='vertical'
                          size={12}
                          style={{
                            color: '#fff',
                            border: 'none',
                            outline: 'none',
                            width: '100%',
                          }}
                        >
                          <DatePicker
                            placeholder={'Select date for party'}
                            style={{
                              color: '#fff',
                              border: 'none',
                              outline: 'none',
                              width: '100%',
                            }}
                            showSecond={false}
                            onChange={(e, dateString) =>
                              setNewParty({
                                ...newParty,
                                scheduleDate: dateString,
                              })
                            }
                            className={
                              'py-2 rounded-md text-lg bg-gray-700 text-white font-semibold outline-none focus:outline-none'
                            }
                            showTime
                          />
                        </Space>
                        {!newParty.scheduleDate && (
                          <small className='block mt-2 text-red-600'>
                            Please pick a date for party
                          </small>
                        )}
                      </div>
                    </div>
                  )}
                <button
                  onClick={() => {
                    setSelected(2);
                    setNewParty({
                      ...newParty,
                      started: true,
                      scheduleDate: new Date(),
                    });
                  }}
                  className={`rounded-full mt-7 block w-full text-lg  ${
                    selected === 2 && 'bg-gray-700 text-opacity-80'
                  } border border-primary text-gray-100 py-2`}
                >
                  Start Party Now
                </button>
                <button
                  type='button'
                  onClick={handleCreateParty}
                  className='w-full mt-9 flex items-center justify-center py-2 px-5 outline-none bg-primary text-gray-800 duration-200 hover:bg-opacity-75 font-bold rounded-full'
                >
                  {isSubmmitting && (
                    <i className='fa fa-spin text-gray-900 fa-spinner mr-2 font-bold text-lg' />
                  )}
                  Create Party
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className='max-w-sm mt-16 mx-auto px-5'>
                <h4 className='text-center text-xl mb-7 font-semibold'>
                  Invite People, Family and Friends
                </h4>
                {newParty.started ? (
                  <button
                    onClick={() => router.push(`/chat?partId=${newParty._id}`)}
                    className={`rounded-full block w-full text-lg hover:bg-gray-800 duration-200 border border-primary text-gray-100 py-2`}
                  >
                    <i className='far fa-comment-alt mr-3'></i>
                    Go to Chat
                  </button>
                ) : (
                  <button
                    onClick={() => router.push(`/profile`)}
                    className={`rounded-full block w-full text-lg hover:bg-gray-800 duration-200 border border-primary text-gray-100 py-2`}
                  >
                    <i className='far fa-backwards mr-3'></i>
                    Back to profile
                  </button>
                )}
                <div className='mt-14 relative'>
                  <ShareParty party={newParty} />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default New;

export async function getServerSideProps(context) {
  try {
    const party = await axios.get(
      `https://api.themoviedb.org/3/movie/${context.query.movieId}`,
      {
        params: {
          api_key: API_KEY,
          language: 'en-US',
        },
      }
    );

    return {
      props: {
        party: party.data,
      },
    };
  } catch (error) {
    console.log('error from newjs');

    console.log(error);
    return {
      props: {
        redirect: !context.query.movieId,
      },
    };
  }
}
