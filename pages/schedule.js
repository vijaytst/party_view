import React, { useState } from 'react';
import Head from 'next/head';
import { useEditable } from '@chakra-ui/react';
import moment from 'moment';
import SeoLayout from '../Components/Layouts/SeoLayout';
import Navbar from '../Components/Layouts/Navbar';
import Ongoing from '../Components/schedule/Ongoing';
import Footer from '../Components/Layouts/Footer.js';

import { Tooltip, DatePicker, Space, notification } from 'antd';

export default function Discover() {
  const [isOnGoing, setIsOnGoing] = useState(true);

  const [dateFilter, setDateFilter] = useState('');

  const [display, setDisplay] = useState(false);
  const toggleParty = () => setIsOnGoing(!isOnGoing);

  const onChange = (date, dateString) => {
    setDateFilter(moment(dateString).format('DD-MMM-YYYY'));
  };

  return (
    <SeoLayout title='ViewParty | Discover Party and movies to watch with loved ones'  style={{ backgroundColor: 'black' }}>
      <div style={{ backgroundColor: '#040308' }}>
        <Navbar />
        <div className={'pt-28 px-5 text-white'}>
          <div className={'container mx-auto'}>
            <div className={'my-5'}>
              <h1 className={'text-3xl md:text-4xl font-sans'}>Parties</h1>
            </div>
            <div className={'flex items-center text-lg box-content mb-5'}>
              {/* <button
              className={`focus:outline-none px-3 py-2 mr-3 ${
                isOnGoing && 'border-b-4 border-new'
              }`}
              onClick={toggleParty}
              >
              Ongoing
            </button> */}
              {/* <button
              className={`focus:outline-none px-3 py-2  ${
                !isOnGoing && 'border-b-4 border-new'
              }`}
              onClick={toggleParty}
              >
              Upcoming
            </button> */}
            </div>

            <div className={'py-5 border-t border-gray-900'}>
              <Ongoing setDisplay={setDisplay} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SeoLayout>
  );
}
