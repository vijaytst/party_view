import React, { useEffect, useState } from 'react';
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
import { Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ShareParty = ({ party }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 500);
    }
  }, [copied]);

  return (
    <div className='relative border-t border-gray-400 pt-5'>
      <h4
        style={{ top: '-.8rem' }}
        className='absolute text-center bg-gray-900 px-3 max-w-max mx-auto right-0 left-0'
      >
        Invite Guest to Party
      </h4>
      <div className='py-2 flex items-center justify-evenly'>
        <FacebookShareButton
          style={{ outline: 'none' }}
          quote={party?.overview}
          title={party?.partyTitle}
          className='outline-none '
          url={`https://viewingparty.net/party/${party?._id}`}
        >
          <FacebookIcon className='rounded-full h-10 w-10 outline-none' />
        </FacebookShareButton>
        <LinkedinShareButton
          url={`https://viewingparty.net/party/${party?._id}`}
          title={party?.partyTitle}
          className='ml-2'
          source='Viewing Party'
          summary={party?.overview}
        >
          <LinkedinIcon className='rounded-full h-10 w-10 outline-none' />
        </LinkedinShareButton>
        <TwitterShareButton
          url={`https://viewingparty.net/party/${party?._id}`}
          title={party?.partyTitle}
          className='ml-2'
        >
          <TwitterIcon className='rounded-full h-10 w-10 outline-none' />
        </TwitterShareButton>
        <PinterestShareButton
          media={party?.movieImg}
          url={`https://viewingparty.net/party/${party?._id}`}
          description={party?.partyTitle}
          title={party?.partyTitle}
          className='ml-2'
        >
          <PinterestIcon className='rounded-full h-10 w-10 outline-none' />
        </PinterestShareButton>
      </div>
      <div className='mt-10'>
        <CopyToClipboard
          text={`https://viewingparty.net/party/${party?._id}`}
          onCopy={() => setCopied(true)}
        >
          <div
            className={`cursor-pointer py-2 text-center block rounded-full border duration-200 ${
              copied ? 'bg-green-700 border-transparent' : 'border-gray-300'
            } `}
          >
            {' '}
            <Tooltip title='Copy Link' className={'block'}>
              <h4 className='text-base font-semibold'>
                {copied
                  ? 'Copied'
                  : `https://viewingparty.net/party/${party?._id}`}
              </h4>
            </Tooltip>
          </div>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default ShareParty;
