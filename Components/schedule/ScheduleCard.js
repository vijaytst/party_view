import React, { useState } from 'react';
import Link from 'next/link';
import { Tooltip } from 'antd';
import Image from 'next/image';
import moment from 'moment';

import { notification } from 'antd';
import {
  ShareAltOutlined,
  PlayCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';

export default function DiscoverCard({ partyData, ongoing, handleOpenShare }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 my-10'>
      <Link href={`/party/${partyData?._id}/${partyData?.partyTitle.replaceAll(" ", "_")}`} passHref>
        <a className={'block w-full h-full'}>
          <figure className='relative group rounded-xl overflow-hidden h-full cursor-pointer'>
            <Image
              src={`https://image.tmdb.org/t/p/original${partyData?.movieImg}`}
              className='w-full h-full object-cover cursor-pointer'
              alt='avengers'
              layout='fill'
            />
            <h3
              className={`${
                partyData?.started ? 'bg-red-600' : 'bg-gray-900'
              } bg-opacity-70 duration-200 absolute z-10 top-3 font-bold left-3 py-1 px-3 rounded-sm`}
            >
              {partyData?.started
                ? 'Live'
                : moment(partyData?.scheduleDate).format('LLL')}
            </h3>
            <div className='bg-black bg-opacity-20 group-hover:bg-opacity-0 duration-200 absolute inset-0'></div>
          </figure>
        </a>
      </Link>
      <div className={'col-span-2 md:border-l md:border-gray-900 md:pl-5'}>
        <div className='flex flex-col py-2 justify-between h-full'>
          <h1 className='cursor-pointer text-2xl md:text-3xl mb-2 capitalize font-sans font-semibold'>
            {partyData?.partyTitle}
          </h1>
          <Link href={`/party/${partyData?._id}`} passHref>
            <h3 className='cursor-pointer text-.5xl md:text-1xl mb-2 capitalize font-sans font-semibold'>
              {partyData?.movieName}
            </h3>
          </Link>
          <p className='text-base text-gray-300'>{partyData?.overview}</p>
          <div className={'flex flex-row'}>
            {partyData?.genres.map((item, index) => (
              <Link key={index} href='#' passHref>
                <div className='cursor-pointer text-black-900 text-xs py-1 px-3 mr-2  rounded-full bg-red-900'>
                  {item}
                </div>
              </Link>
            ))}
          </div>
          <div
            className={'text-gray-900 mr-2 max-w-max px-3 my-3'}
            style={{ backgroundColor: '#66fcf1' }}
          >
            Netflix
          </div>
          <div
            className={'text-gray-900 mr-2 flex items-center'}
            style={{ backgroundColor: '' }}
          >
            <StarOutlined
              className={'mr-2'}
              style={{ fontSize: '20px', color: '#66fcf1' }}
            />
            <p className={'text-white'}>{partyData?.rating}</p>
          </div>
          <div className='mt-2'>
            <i className='mt-3 mb-3'>Hosted by</i> @
            {partyData?.creator?.userName}
          </div>
          <div className={'flex flex-row mb-4 mt-4'}>
            {partyData?.genre?.map((item, index) => (
              <Link key={index} href='#' passHref>
                <div className='cursor-pointer text-black-900 text-xs py-1 px-3 mr-2  rounded-full bg-red-900'>
                  {item}
                </div>
              </Link>
            ))}
          </div>
          <div className='flex items-center'>
            <Tooltip title='Share' className={'mr-3'}>
              <div
                onClick={() => handleOpenShare(partyData)}
                className={'bg-gray-900 w-min p-2 rounded-full cursor-pointer'}
              >
                <ShareAltOutlined className={''} style={{ fontSize: '25px' }} />
              </div>
            </Tooltip>
            <Link href={`/party/${partyData?._id}/${partyData?.partyTitle.replaceAll(" ","_")}`} passHref>
              <a
                className={'bg-gray-900 px-5 py-2 flex items-center rounded-sm'}
              >
                <PlayCircleOutlined
                  className={''}
                  style={{ fontSize: '20px', color: '#66fcf1' }}
                />
                <p className={'ml-2'}>Join Party</p>{' '}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
