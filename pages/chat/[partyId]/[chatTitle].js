import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import ChatForm from '../../../Components/Chat/ChatForm';
import ChatHeader from '../../../Components/Chat/ChatHeader';
import ChatMessageList from '../../../Components/Chat/ChatMessageList';
import { socket } from '../../../services/socket';
import axios, { setAuthToken,DeleteAuthToken } from '../../../services/axios';
import Axios from 'axios';


const chat = ({ userInfo, setUserInfo }) => {
  const { query, ...router } = useRouter();
  const [partyInfo, setPartyInfo] = useState({});
  const [value, setValue] = useState({
    partyId: query?.partyId,
    userId: '611cf0bff8a283001decbd73',
    message: '',
  });
  const [messages, setMessages] = useState([]);

  const currPartyId = query?.partyId;



  useEffect(() => {
    if (!userInfo.loading && !userInfo.isAuthenticated) {
      notification.success({
        message: 'Auth Error!',
        description: 'Please you have to login',
      });
      router.push('/?auth=login');
    }

    axios
      .get('/get-single-party', {
        headers: { 'x-access-token': localStorage.getItem('accessToken') },
        params: { partyId: currPartyId },
      })
      .then(res => {
        setPartyInfo(res.data.data);
      })
      .catch(err => {
        // setTokenState(false);

        console.log('error from get singlr party')

        console.log(err)

        // DeleteAuthToken();
        // router.push('/');
        // notification.error({
        //   message: err?.response?.data?.message || err.message,
        // });
      });
  }, [userInfo]);

  useEffect(() => {
    socket.on('connect', res => {
      console.log('connect status', socket.connected);
    });

    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!userInfo.loading && userInfo.isAuthenticated) {
      socket.emit(
        'join_party',
        {
          partyId: query?.partyId,
          userId: userInfo.data._id,
        },
        res => {
          if (!res.error) setMessages(prev => [...prev, ...res.messages]);
        }
      );

      return () => {
        console.log('from error block');
        socket.disconnect();
        socket.close();
      };
    }
  }, [userInfo]);

  useEffect(() => {
    socket.on('message_party', data => {
      setMessages(prevState => [...prevState, data]);
    });

    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  return userInfo.loading ? (
    <div className='h-screen grid place-content-center'>
      <i className='fa fa-spin fa-spinner text-xl'></i>
    </div>
  ) : (
    <div className='h-screen w-full bg-gray-600'>
      <div className='flex flex-col h-full relative mx-auto bg-gray-900'>
        <ChatHeader partyInfo={partyInfo} />
        <ChatMessageList messages={messages} userInfo={userInfo} />
        <ChatForm
          userInfo={userInfo}
          value={value}
          setValue={setValue}
          partyId={query.partyId}
        />
      </div>
    </div>
  );
};

export default chat;
