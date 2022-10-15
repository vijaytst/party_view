import React, { useState, useEffect } from 'react';
import DiscoverCard from './ScheduleCard';
import axios from '../../services/axios';
import ReactPaginate from 'react-paginate';
import { Spin } from 'antd';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import YoutubeComponent from './YoutubeComponent';


import SportsComponent  from './SportsComponent';
import 'react-tabs/style/react-tabs.css';


import {  DatePicker, Space, Modal } from 'antd';
import ShareParty from '../Parties/ShareParty';

export default function Ongoing() {
  const [ongoing, setOngoing] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalYoutubePage, setTotalYoutubePage] = useState(0);
  const [totalSportPage, setTotalSportPage] = useState(0);
  const [display, setDisplay] = useState(true);
  const [parties, setparties] = useState();
  const [sportParties, setSportParties] = useState();
  const [youtubeParties, setYoutubeParties] = useState();
  const [selectedParty, setSelectedParty] = useState({});
  const [openShare, setOpenShare] = useState(false);
  const [dateFilter, setDateFilter] = useState('');

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const on = ['Netflix'];

  const genreArr = [
    'All',
    'Short',
    'Adult',
    'Adventure',
    'Fantasy',
    'Animation',
    'Drama',
    'Horror',
    'Action',
    'Comedy',
    'History',
    'Western',
    'Thriller',
    'Crime',
    'Documentary',
    'Science Fiction',
    'Mystery',
    'Music',
    'Romance',
    'Family',
    'War',
    'News',
    'Reality',
    'Talk Show',
  ];

  const filterWithGenre = value => {
    setparties(!setparties);

    axios
      .get(`https://viewingpartyserver.herokuapp.com/get-all-parties`)
      .then(response => {
        let filterResult = [];

        if (value === 'All') {
          return setparties(response.data.data);
        }

        response.data.data.map(party => {
          party.genre.indexOf(value) > -1 ? filterResult.push(party) : '';
        });

        setTotalPage(filterResult.length);

        setparties(filterResult);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onChange = (date, dateString) => {
    setparties(!setparties);
    setDateFilter(moment(dateString).format('DD-MMM-YYYY'));
    let filterString = moment(dateString).format('DD-MMM-YYYY');

    axios
      .get(`https://viewingpartyserver.herokuapp.com/get-all-parties`)
      .then(response => {
        let filterResult = [];

        response.data.data.map(party => {
          moment(dateString).format('DD-MMM-YYYY') ===
          moment(party.scheduleDate).format('DD-MMM-YYYY')
            ? filterResult.push(party)
            : '';
        });

        setTotalPage(filterResult.length);

        setparties(filterResult);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const resetDate = () => {
    setparties(!setparties);
    axios
      .get(`https://viewingpartyserver.herokuapp.com/get-all-parties`)
      .then(response => {
        setparties(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    setDisplay(false);
    axios
      .get(`https://viewingpartyserver.herokuapp.com/get-all-parties`)
      .then(response => {
        setTotalPage(response.data.data.length);
        setparties(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [page]);


  useEffect(() => {
    setDisplay(false);
    axios
      .get(`https://viewingpartyserver.herokuapp.com/get-sports-parties`)
      .then(response => {


        console.log('logging party response')
        setSportParties(response.data.data)
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      });
  }, [page]);

  useEffect(() => {
    setDisplay(false);
    axios
      .get(`https://viewingpartyserver.herokuapp.com/get-youtube-parties`)
      .then(response => {
        setYoutubeParties(response.data.data)
        setTotalYoutubePage(response.data.data.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, [page]);







  const onPageChange = res => {
    setTotalPage(parties.length);
    setPage(res.selected + 1);
  };

  const handleOpenShare = party => {
    setOpenShare(true);
    setSelectedParty(party);
  };

  return (
    <>

<Tabs>
    <TabList>
      <Tab style={{fontWeight:"bolder"}} >Movies</Tab>
      <Tab style={{fontWeight:"bolder"}} >Sports</Tab>
      <Tab style={{fontWeight:"bolder"}} >Youtube</Tab>
    </TabList>

    <TabPanel>
      
    <>
      
      
      <div
        className={
          'mt-6 scheduleFilterContainer flex flex-col md:flex-row items-center mb-5 center'
        }
        style={{ justifyContent: 'center' }}
      >
        <div className='text-gray-900 mr-10 focus:outline-none '>
          <select
            name='cars'
            className={'text-gray-200 text-xl bg-transparent pb-2 outline-none'}
          >
            {on.map((e, i) => (
              <option
                value={e}
                key={i}
                className={'text-base my-4 text-gray-900'}
              >
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className='text-gray-900 mr-10 focus:outline-none'>
          <select
            name='genr'
            className={'text-gray-200 text-xl bg-transparent pb-2 outline-none'}
            onChange={event => filterWithGenre(event.target.value)}
          >
            {genreArr.map((e, i) => (
              <option
                value={e}
                key={i}
                className={'text-base my-4 text-gray-900'}
              >
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className={'mr-5 flex flex-wrap items-center'}>
          <Space
            className={'text-white'}
            direction='vertical'
            size={10}
            style={{
              color: '#fff',
              border: 'none',
              outline: 'none',
            }}
          >
            <DatePicker
              placeholder={'Filter parties using date'}
              style={{
                color: '#fff',
                border: 'none',
                outline: 'none',
                width: '200px',
              }}
              onChange={onChange}
              className={
                'py-2 rounded-md text-lg bg-gray-900 text-white font-semibold outline-none focus:outline-none'
              }
            />
          </Space>

          <button
            className={`flex-1 duration-200 text-base w-100 p-3 rounded m-5 bg-gray-800  text-primary font-semibold bg-gray-700"
                          `}
            onClick={resetDate}
          >
            Reset
          </button>
        </div>
      </div>
      {
        <div className={''}>
          <div className={'mb-10'}></div>
          {
            // <MovieCard party={movies[Math.floor(Math.random()*movies?.length- 0 + 1)+0]} joinParty={joinParty} />
            parties ? (
              parties.map((party, i) => (
                <DiscoverCard
                  key={i}
                  partyData={party}
                  ongoing={true}
                  parties={parties}
                  handleOpenShare={handleOpenShare}
                />
              ))
            ) : (
              <h2
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '20px',
                }}
              >
                <Spin indicator={antIcon} size='large' />
              </h2>
            )
          }
          <div>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              pageCount={totalPage}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={onPageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
      }
      <Modal
        visible={openShare}
        footer={[]}
        centered
        onCancel={() => setOpenShare(false)}
        className='bg-gray-900 share-modal'
      >
        <ShareParty party={selectedParty} />
      </Modal>
      
      </>

    </TabPanel>
    <TabPanel>
      <SportsComponent sportParties={sportParties} />
  
    </TabPanel>
    <TabPanel>
      <YoutubeComponent youtubeParties={youtubeParties} />
  
    </TabPanel>
  </Tabs>


   
    </>
  );

  // );
}
