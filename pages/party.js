import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../Components/Layouts/Navbar';
import Footer from '../Components/Layouts/Footer.js';

import PartiesComponent from '../Components/Parties/Parties';

export default function Parties() {
  const [isOnGoing, setIsOnGoing] = useState(true);

  const [display, setDisplay] = useState(false);
  const toggleParty = () => setIsOnGoing(!isOnGoing);

  return (
    <div style={{ backgroundColor: '#040308' }}>
      <Head>
        <title>ViewParty - Parties</title>
        <meta
          name='description'
          content='The best way to watch shows and movies with others'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />
      <div className={'pt-28 px-5 text-white'}>
        <div className={'my-5'}>
          <h1 className={'text-3xl flex md:text-4xl font-sans justify-center'}>
            Parties
          </h1>
          <h1
            style={{
              width: '50px',
              height: '2px',
              background: '#fff',
              display: 'flex',
              margin: 'auto',
              justifyContent: 'center',
              marginTop: '5px',
              marginBottom: '5px',
            }}
          ></h1>
        </div>

        <div>
          <PartiesComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
}
