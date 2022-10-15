import React from 'react';
import NavBar from '../Layouts/Navbar';

const ChatHeader = ({ partyInfo }) => {

  return (
    <div>
      <NavBar />

      <div
        className='px-10 pb-2 pt-3 '
        style={{
          backgroundColor: '#030816e8',
          backdropFilter: 'blur(.6rem)',
          marginTop: '45px',
        }}
      >
        <div className='flex items-center'>
          <div>
            <h4 className='text-2xl mb-1 font-mono font-extralight'>
              {partyInfo?.partyTitle}{' '}
              <h4 className='text-sm'> Movie Name: {partyInfo?.movieName} </h4>{' '}
              <h4 className='text-sm'>
                {' '}
                created by {partyInfo?.creator?.userName}{' '}
              </h4>
            </h4>
            <h6 className='font-mono text-primary font-semibold opacity-90'></h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
