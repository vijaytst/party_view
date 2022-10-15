import Head from 'next/head';
import Faq from '../Components/Faq/FaqComponent';
import Navbar from '../Components/Layouts/Navbar';
import Footer from '../Components/Layouts/Footer';
import { FaqData } from '../Components/Faq/Data';

export default function FaqPage() {
  return (
    <div style={{ background: '#0b0c10' }}>
      <div
        className='bg-gray-dark h-full text-white-100'
        style={{ color: '#fff' }}
      >
        <Head>
          <title>FAQ APP</title>
          <meta name='description' content='Viewing party faq' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Navbar />
        <main className='pt-5' style={{ background: '#0b0c10' }}>
          <h1
            className='text-3xl sm:text-6xl text-center font-bold font-sans'
            style={{ marginTop: '130px' }}
          >
            Frequently Asked Questions
          </h1>

          <div className='flex mx-auto max-w-5xl px-5 mt-20  flex-wrap'>
            {FaqData.map(data => (
              <Faq
                key={data.question}
                question={data.question}
                answer={data.Answer}
              />
            ))}
          </div>

          <div className='flex mx-auto max-w-5xl px-5 mt-15 flex-wrap'>
            <h3></h3>
            <h1 className='block w-full text-gray-light font-bold mt-20 ml-3 mb-10'>
              Have a question not listed here or need further clarity? Fill out
              the form below and we will get back to you as soon as possible .
            </h1>

            <div className='flex items-center  w-full bg-teal-lighter'>
              <div className='w-full bg-white rounded shadow-lg p-8 m-4'>
                <form className='mb-4' action='/' method='post'>
                  <div className='flex flex-col mb-4'>
                    <label
                      className='mb-2 font-bold text-lg text-gray-darkest'
                      htmlFor='first_name'
                    >
                      Username
                    </label>
                    <input
                      className='border py-2 px-3 text-gray-darkest'
                      type='text'
                      name='full_name'
                      id='full_name'
                    />
                  </div>
                  <div className='flex flex-col mb-4'>
                    <label
                      className='mb-2 font-bold text-lg text-gray-darkest'
                      htmlFor='email'
                    >
                      Email
                    </label>
                    <input
                      className='border py-2 px-3 text-gray-darkest'
                      type='email'
                      name='email'
                      id='email'
                    />
                  </div>
                  <div className='flex flex-col mb-6'>
                    <label
                      className='mb-2 font-bold text-lg text-gray-darkest'
                      htmlFor='message'
                    >
                      Message
                    </label>
                    <textarea
                      className='border py-2 px-3 text-gray-darkest'
                      type='text'
                      name='message'
                      id='message'
                    />
                  </div>
                  <button
                    style={{ color: '#fff' }}
                    className='block bg-gray-darkest hover:bg-teal-dark text-black uppercase text-lg mx-auto p-2 rounded'
                    type='submit'
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
