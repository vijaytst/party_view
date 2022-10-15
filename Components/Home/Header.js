import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <section
      className="pt-20 pb-10 sm:py-20"
      style={{
        minHeight: "85vh",
        backgroundImage: "url(/images/bg-home.webp)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "lighten",
      }}
    >
      <div className="container mt-20 mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            <h1 className="text-white sm:leading-snug text-center py-5 font-bold text-4xl sm:text-5xl">
              Watch movies, shows, sports and other events together with friends
              or viewers all around the world
            </h1>
            <p className="text-gray-400 text-center pt-2">
              ViewingParty allows people to watch video streams legally in sync
              with others. Experience streamed content with friends or a whole
              community. Gasp and laugh with fellow fans in the digital format
              of highly anticipated theatre premiers.
            </p>
            <div>
              <a
                href="#"
                className="border border-primary rounded-3xl mx-auto px-7 text-gray-400 py-3 text-xs sm:text-sm hover:bg-gray-700 hover:text-white duration-200 block w-full max-w-max mt-5"
              >
               Discover Movies, Events, Sports, & Shows
              </a>
            </div>
          </div>

          <figure className="m-0 p-0">
            <Image
              width={700}
              height={500}
              src="/images/header2.jpg"
              alt="movies"
            />
          </figure>
        </div>
        <div className="mt-10">
          <p className="text-gray-300 text-center mb-4">
            Streaming service on ViewingParty
          </p>
          <div className="flex sm:justify-center flex-wrap sm:flex-nowrap mx-auto sm:flex-row">
          <a href='https://www.netflix.com/' passHref  target="_blank" >
             <div className="bg-gray-900 group py-2 ml-2 px-4 mb-4 max-w-max rounded-xl flex flex-col cursor-pointer">
          
              <figure className="mb-1 p-0 m-0 flex justify-center">
                <Image
                  width={20}
                  height={20}
                  src="/icons/netflix.svg"
                  className="h-8 w-8 object-contain"
                  alt="netflix"
                />
              </figure>
             
              <h4 className="text-gray-400 text-xs text-center group-hover:text-white duration-200 cursor-pointer mt-auto">
                Netflix
              </h4>
         
            </div> 
            </a>
            <a href='https://www.spotify.com/' passHref target="_blank">
             <div className="bg-gray-900 group py-2 ml-2 sm:ml-4 px-4 mb-4 max-w-max rounded-xl flex flex-col cursor-pointer">
            
              <figure className="mb-1 p-0 m-0 flex justify-center">
                <Image
                  width={20}
                  height={20}
                  src="/icons/spotify.svg"
                  className="h-8 w-8 object-contain"
                  alt="spotify"
                />
              </figure>
            
              <h4 className="text-gray-400 text-xs text-center group-hover:text-white duration-200 cursor-pointer mt-auto">
                Spotify
              </h4>
           
            </div> 
            </a>
            <a href='https://www.hbomax.com/' passHref  target="_blank" >
             <div className="bg-gray-900 group py-2 ml-2 px-4 mb-4 max-w-max rounded-xl flex flex-col cursor-pointer">
          
              <figure className="mb-1 p-0 m-0 flex justify-center">
                <Image
                  width={20}
                  height={20}
                  src="/icons/hbo.svg"
                  className="h-8 w-8 object-contain"
                  alt="netflix"
                />
              </figure>
             
              <h4 className="text-gray-400 text-xs text-center group-hover:text-white duration-200 cursor-pointer mt-auto">
                HBO Max
              </h4>
         
            </div> 
            </a>

<a  href='https://www.youtube.com/' passHref  target="_blank">
             <div className="bg-gray-900 group py-2 ml-2 sm:ml-4 px-4 mb-4 max-w-max rounded-xl flex flex-col cursor-pointer">
      
                      <figure className="mb-1 p-0 m-0 flex justify-center">
                <Image
                  width={20}
                  height={20}
                  src="/icons/youtube.svg"
                  className="h-8 w-8 object-contain"
                  alt="youtube"
                />
              </figure>
                      
                    

                    
              <h4 className="text-gray-400 text-xs text-center group-hover:text-white duration-200 cursor-pointer mt-auto">
                Youtube
              </h4>
             
            </div> 
            </a>

            <a className="mr-2" href='https://www.preview.disneyplus.com/' target="_blank" >
             <div className="bg-gray-900 group py-2 ml-2 sm:ml-4 px-4 mb-4 max-w-max rounded-xl flex flex-col cursor-pointer">
      
                      <figure className="mb-1 p-0 m-0 flex justify-center">
                <Image
                  width={20}
                  height={20}
                  src="/icons/disney.svg"
                  className="h-8 w-8 object-contain"
                  alt="Disney+"
                />
              </figure>                    
              <h4 className="text-gray-400 text-xs text-center group-hover:text-white duration-200 cursor-pointer mt-auto">
                Disney +
              </h4>
             
            </div> 
            </a>
            <div className="bg-gray-900 group py-2 px-4 mb-4 max-w-max rounded-xl flex flex-col cursor-pointer">
              <figure className="mb-1 p-0 m-0 flex justify-center">
                <Image
                  width={20}
                  height={20}
                  src="/icons/plus.svg"
                  className="h-8 w-8 object-contain"
                  alt="add"
                />
              </figure>
              <h4 className="text-gray-400 text-xs text-center group-hover:text-white duration-200 cursor-pointer mt-auto">
                +More
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
