import Head from 'next/head';
import Link from 'next/link';
import Footer from '../Components/Layouts/Footer';
import Navbar from '../Components/Layouts/Navbar';
import {
  SyncOutlined,
  SearchOutlined,
  WechatOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#0b0c10' }}>
      <Head>
        <title>ViewingParty - About</title>
        <meta
          name='description'
          content='The best way to watch shows and movies with others'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div
        className={'px-5 bg-no-repeat bg-cover'}
        style={{ backgroundColor: '#0b0c10' }}
      >
        <Navbar />
        <div
          style={{ paddingTop: '150px' }}
          className={'container py-24 mx-auto text-center text-gray-100'}
        >
          <h1 className={'uppercase py-4 text-4xl md:text-5xl font-normal'}>
            COMMUNITY MOVIE NIGHT
          </h1>
          <p
            className={
              'pb-4 font-mono text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text'
            }
            style={{
              background: 'rgb(102,252,241)',
              background: 'linear-gradient(36deg, rgba(102,252,241,1) 0%,',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Make everynight a movie night with{' '}
            <Link href='#'>ViewingParty</Link>
          </p>
          <div className={'grid lg:grid-cols-4'}>
            <p className={'col-start-2 col-span-2'}>
              Watch videos together virtually with friends, family or fellow
              fans from across the globe. ViewingParty allows everyone to watch
              in sync on multiple streaming services right from your browser.
              Join other parties in session or schedule your own. Find out what
              all the fuss is about.
            </p>
          </div>
          <div className={'mt-10'}>
            {/* <Link href='/discover' passRef>
              <a
                className={
                  'py-2 md:py-3 px-2 md:px-6 text-sm  font-semibold rounded-full mr-5 text-sm sm:border sm:bg-primary hover:bg-transparent hover:border-primary hover:border sm:px-5 duration-200 font-semibold sm:py-1 rounded-full text-gray-300 sm:text-gray-900 hover:text-white'
                }
                style={{
                  border: '2px solid #1f2833',
                  background: 'white',
                  color: 'black',
                }}
              >
                Join random party
              </a>
            </Link> */}
            <a href='/discover' >
               <button
               style={{height:"60px"}}
                    className='mr-5 text-lg font-bold sm:border sm:bg-primary hover:bg-transparent hover:border-primary hover:border sm:px-10 duration-200 font-semibold sm:py-1 rounded-full text-gray-300 sm:text-gray-900 hover:text-white'
                  >
                    Join random party
                  </button>

                  </a>
          </div>


        </div>
      </div>
      <div
        className={'px-5 pt-10 text-gray-200'}
        style={{ backgroundColor: '#0b0c10' }}
      >
        <div
          className={
            'container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'
          }
        >
          <div
            className={'bg-blue-800 p-5 rounded-lg flex flex-col'}
            style={{ color: '#fff' }}
          >
            <h5 className={'font-mono text-2xl mb-1 font-semibold'}>WHO</h5>
            <p className='mb-5' style={{ color: '' }}>
              ViewingParty synchronizes all viewers' shows or movies with the
              host. Text chat in each party will allow everyone to share their
              reactions in real time.
            </p>
            <div className={'mt-auto'}>
              <a
                className={
                  'py-2 px-2 text-sm md:text-base md:px-4 rounded-md cursor-pointer border-2 duration-200 hover:font-light hover:bg-gray-darkest hover:text-gray-100 hover:border-transparent'
                }
                style={{ border: '2px solid #0b0c10' }}
              >
                Learn more
              </a>
            </div>
          </div>
          <div
            className={'bg-blue-800 p-5 rounded-lg flex flex-col'}
            style={{ color: '#fff' }}
          >
            <h5 className={'font-mono text-2xl mb-1 font-semibold'}>WHAT</h5>
            <p className='mb-5'>
              Watch videos with family and friends virtually. You can also be
              part of a larger community where you never will be forced to watch
              anything alone again!
            </p>
            <div className={'mt-auto'}>
              <a
                className={
                  'py-2 px-2 text-sm md:text-base md:px-4 rounded-md cursor-pointer border-2 duration-200 hover:font-light hover:bg-gray-darkest hover:text-gray-100 hover:border-transparent'
                }
                style={{ border: '2px solid #0b0c10' }}
              >
                Learn more
              </a>
            </div>
          </div>
          <div
            className={'bg-blue-800 p-5 rounded-lg flex flex-col'}
            style={{ color: '#fff' }}
          >
            <h5 className={'font-mono text-2xl mb-1 font-semibold'}>WHERE</h5>
            <p className='mb-5'>
              ViewingParty will be your virtual theatre. All the viewers need to
              do is use a computer with Google Chrome and download the
              ViewingParty Chrome Extension. We'll take care of the rest.
            </p>
            <div className={' mt-auto'}>
              <a
                className={
                  'py-2 px-2 text-sm md:text-base md:px-4 rounded-md cursor-pointer border-2 duration-200 hover:font-light hover:bg-gray-darkest hover:text-gray-100 hover:border-transparent'
                }
                style={{ border: '2px solid #0b0c10' }}
              >
                Learn more
              </a>
            </div>
          </div>
          <div
            className={'bg-blue-800 p-5 rounded-lg flex flex-col'}
            style={{ color: '#fff' }}
          >
            <h5 className={'font-mono text-2xl mb-1 font-semibold'}>WHEN</h5>
            <p className='mb-5'>
              Join an ongoing viewing party of find a scheduled one so you can
              watch from the beginning . You can also schedule your own viewing
              party and we'll announce it to all interested members .
            </p>

            <div className={'mt-auto'}>
              <a
                className={
                  'py-2 px-2 text-sm md:text-base md:px-4 rounded-md cursor-pointer border-2 duration-200 hover:font-light hover:bg-gray-darkest hover:text-gray-100 hover:border-transparent'
                }
                style={{ border: '2px solid #0b0c10' }}
              >
                Learn more
              </a>
            </div>
          </div>

          <div
            className={
              'col-span-full grid grid-cols-6 my-10 bg-blue-800 rounded pt-10 pb-10'
            }
            style={{ color: '#0b0c10' }}
          >
            <div
              className={
                'col-span-full md:col-span-4 md:col-start-2 text-center p-5'
              }
            >
              <h5
                className={
                  'text-2xl md:text-3xl font-mono font-semibold mb-8 rounded'
                }
              >
                WHY VIEWINGPARTY?
              </h5>
              <div className={'grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6'}>
                <div className={'grid grid-cols-8 gap-4 rounded'}>
                  <div className={'mt-2'}>
                    <SyncOutlined style={{  fontSize: '40px', color:"#fff" }} />
                  </div>
                  <div className={'col-span-7 '}>
                    <h6
                      className={'text-left font-sans text-xl mb-3  font-bold'}
                    >
                      Media Synchronization
                    </h6>
                    <p className={'text-left text-white'}>
                      No more of : "3..2..1..Start!" ViewingParty handles
                      everything automatically and for everyone. This includes
                      when the host skips or pauses.
                    </p>
                  </div>
                </div>
                <div className={'grid grid-cols-8 gap-4 rounded'}>
                  <div className={''}>
                    <UsergroupAddOutlined style={{  fontSize: '40px', color:"#fff" }} />
                  </div>
                  <div className={'col-span-7'}>
                    <h6
                      className={'text-left font-sans text-xl mb-3  font-bold'}
                    >
                      Community Experience
                    </h6>
                    <p className={'text-left text-white'}>
                      Meet other members with similar interests by joining one
                      of the public ViewingParty's or create your own. Stick
                      around after and share your thoughts and reactions. Then
                      vote on the next movie, show, song, clip etc.!
                    </p>
                  </div>
                </div>
                <div className={'grid grid-cols-8 gap-4 rounded'}>
                  <div className={''}>
                    <WechatOutlined style={{  fontSize: '40px', color:"#fff" }} />
                  </div>
                  <div className={'col-span-7'}>
                    <h6
                      className={'text-left font-sans text-xl mb-3  font-bold'}
                    >
                      Integrated or External Chat Rooms
                    </h6>
                    <p className={'text-left text-white'}>
                      Communicate with other viewers either through our internal
                      chat rooms or host a ViewingParty on Twitch.tv and use
                      your own channel's chat from Twitch . Find out how to do
                      this legally on Twitch in our Live Steamer page .
                    </p>
                  </div>
                </div>
                <div className={'grid grid-cols-8 gap-4 rounded'}>
                  <div className={''}>
                    <SearchOutlined style={{ fontSize: '40px', color:"#fff" }} />
                  </div>
                  <div className={'col-span-7'}>
                    <h6
                      className={'text-left font-sans text-xl mb-3  font-bold'}
                    >
                      Discover Content
                    </h6>
                    <p className={'text-left text-white'}>
                      See what other people like to watch on StreamParty or
                      simply what is new on your Streaming Services to find your
                      next videos to binge with friends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            'text-white md:mt-5 text-base container mx-auto col-span-full flex items-center justify-center'
          }
        >
          <h4 className='mr-7'>Ready to start? </h4>
          <Link href='#' passRef>
            <a
              className={
                'py-2 md:py-3 px-2 md:px-6 text-sm text-darker sm:text-base font-semibold rounded-full sm:bg-primary hover:bg-transparent'
              }
              style={{ border: '2px solid #1f2833',  }}
            >
            Try viewingParty
            </a>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
