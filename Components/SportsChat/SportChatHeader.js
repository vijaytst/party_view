import React , {useState}  from 'react';

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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip } from 'antd';
const SportChatHeader = ({ partyInfo }) => {

  const [copied,setCopied] = useState()

  return (
    <div style={{height:'30%'}}>
      <div
        className='flex'
        style={{
          backgroundColor: '#030816e8',
          backdropFilter: 'blur(.6rem)',
        }}
      >
        <div className='flex flex-col'>
          <div>
            <h4 className='text-2xl mb-1 font-mono px-4 py-5 font-extralight leading-relaxed'>
              {partyInfo?.partyTitle}{' '}
              <h4 className='text-sm'> Sports Type: {partyInfo?.sportType} </h4>{' '}
              <h4 className='text-sm'>
                {' '}
                created by {partyInfo?.creator?.userName}{' '}
              </h4>
            </h4>
            <h6 className='font-mono text-primary font-semibold opacity-90'></h6>
          </div>

          <di style={{alignItems:"flex-start", width:"100%"}}  className="pt-5 pb-5 flex flex-col justify-end px-4 items-center w-full md:w-10/12 leading-4">
          <h3  style={{marginRight:"10px"}}>Share party  on : </h3>
          <div className='flex items-center justify-evenly mr-5 mt-4'>
   
        <FacebookShareButton
          style={{ outline: 'none' }}
          quote={partyInfo.partyTitle}
    
          className='outline-none '
          title={`${partyInfo.partyTitle}`}
          url={`https://viewingparty.net/sports/${partyInfo._id}`}
        >
          <FacebookIcon className='rounded-full h-10 w-10 outline-none' />
        </FacebookShareButton>
        <LinkedinShareButton
          title={`${partyInfo.partyTitle}`}
          url={`https://viewingparty.net/sports/${partyInfo._id}`}
          className='ml-2'
          source='Viewing Party'
          summary={partyInfo.partyTitle}
        >
          <LinkedinIcon className='rounded-full h-10 w-10 outline-none' />
        </LinkedinShareButton>
        <TwitterShareButton
             title={`${partyInfo.partyTitle}`}
             url={`https://viewingparty.net/sports/${partyInfo._id}`}
          className='ml-2'
          
        >
          <TwitterIcon className='rounded-full h-10 w-10 outline-none' />
        </TwitterShareButton>
        <PinterestShareButton
          media={partyInfo.partyTitle}
          description={partyInfo.partyTitle}
          title={`${partyInfo.partyTitle}`}
          url={`https://viewingparty.net/sports/${partyInfo._id}`}
          className='ml-2'
        >
          <PinterestIcon className='rounded-full h-10 w-10 outline-none' />
        </PinterestShareButton>
        <div  className='ml-2' >
        <CopyToClipboard
            text={`https://viewingparty.net/sports/${partyInfo._id}`}
          onCopy={() => setCopied(true)}
        >
          <div
            className={`cursor-pointer py-2 text-center p-2 rounded-full border duration-200 ${
              copied ? 'bg-green-700 border-transparent' : 'border-gray-300'
            } `}
          >
            {' '}
            <Tooltip title='Copy Link' className={'block'}>
              <h4 className='text-sm '>
                {copied
                  ? 'Copied'
                  : `Copy Link`}
              </h4>
            </Tooltip>
          </div>
        </CopyToClipboard>


        </div>

     
      </div>

          </di>
    
        </div>
      </div>
    </div>
  );
};

export default SportChatHeader;
