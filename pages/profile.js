import { notification } from 'antd';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Footer from '../Components/Layouts/Footer';
import Navbar from '../Components/Layouts/Navbar';
import MyViewParties from '../Components/Profile/MyViewParties.js';
import UserSchedule from '../Components/Profile/UserSchedule';
import UserInfo from '../Components/Profile/UserInfo.js';
import axios, { DeleteAuthToken, setAuthToken } from '../services/axios';
import { useRouter } from 'next/router';
import SportParties from '../Components/Profile/MySportsParties';
import MyyoutubeParties from '../Components/Profile/MyYoutubeParties';

const profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [tokenState, setTokenState] = useState(false);
  const [scheduleParties, setScheduleParties] = useState([]);
  const [sportsParties, setSportsParties] = useState([]);
  const [userSchedule, setUserSchedule] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setAuthToken(localStorage.getItem('accessToken'));
    axios
      .get('/profile', {
        headers: { 'x-access-token': localStorage.getItem('accessToken') },
      })
      .then(res => {
        setUserInfo(res.data.data);
        setTokenState(true);
      })
      .catch(err => {
        setTokenState(false);
        DeleteAuthToken();
        router.push('/');
        notification.error({
          message: err?.response?.data?.message || err.message,
        });
      });

      ///get-user-sports-party

    axios
      .get('/get-user-party', {
        headers: { 'x-access-token': localStorage.getItem('accessToken') },
      })
      .then(res => {
        setScheduleParties(res.data.data);
      })
      .catch(() => {
    
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps

    axios
    .get('/get-user-sports-party', {
      headers: { 'x-access-token': localStorage.getItem('accessToken') },
    })
    .then(res => {
      setSportsParties(res.data.data.reverse())
   
    })
    .catch(() => {
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps


    axios
      .get('/getUserSchedules', {
        headers: { 'x-access-token': localStorage.getItem('accessToken') },
      })
      .then(res => {
        setUserSchedule(res.data.data);

        // setScheduleParties(res.data.data);
      })
      .catch(() => {

      });
  }, []);

  const emitStart = (youtubeParties) => {
    socket.emit(
      "startYoutubeParty",
      {
        party: youtubeParties,
      },
      (res) => {
        console.log('response from start')
        console.log(res);
        if (!res.error)
          return
      }
    );
  };


  const getSportsParty  = ()=>{
    axios
    .get('/get-user-sports-party', {
      headers: { 'x-access-token': localStorage.getItem('accessToken') },
    })
    .then(res => {
      setSportsParties(res.data.data)
   
    })
    .catch(() => {
      notification.warn({
        message: 'Party not found',
        description: 'Unable to get user party',
        duration: 5000,
      });
    });
  }

  return (
    <div>
      {tokenState ? (
        <>
          <Head>
            <title>ViewingParty</title>
            <meta
              name='description'
              content='Host Viewing parties with friends and family all around the world'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Navbar />
          <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
          <MyViewParties
            setScheduleParties={setScheduleParties}
            scheduleParties={scheduleParties}
          />

          <UserSchedule
            setUserSchedule={setUserSchedule}
            userSchedule={userSchedule}
          />
          <MyyoutubeParties/>
          <SportParties sportsParties={sportsParties} setSportsParties={setSportsParties} />
          

          <Footer />
        </>
      ) : (
        <div  style={{display:"flex", flexDirection:"column",alignItems:"center", marginTop:"300px"}} className=''>
        <div className="flex justify-center items-center">
<div
 className="animate-spin rounded-full h-40 w-40 border-b-2 border-gray-900"
></div>
</div>

       <p style={{marginTop:"50px"}} > <h1 style={{color:'black', fontWeight:"bolder"}} > Redirecting to dashboard </h1> </p>  
</div>
      )}
    </div>
  );
};

export default profile;
