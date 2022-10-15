import React from "react";
import Image from "next/image";

const WhatWeOffer = () => {
  return (
    <section style={{ backgroundColor: "#05080e" }} className="py-10">
      <div className="container mx-auto px-5">
        <h3 className="text-white text-3xl text-center">
          What <span className="text-primary">ViewingParty</span> Offers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
          <div>
            <figure className="p-0 m-0 h-52">
              <Image
                width={400}
                height={200}
                src="/images/friends.jpg"
                className="rounded-t-lg h-full w-full object-cover hover:opacity-80 duration-200"
                alt="meet people"
              />
            </figure>
            <h4 className="text-gray-200 py-2 font-semibold text-lg">
              Join a community
            </h4>
            <p className="text-gray-400 text-sm">
              Meet people with similar media interests and experience content
              together.
            </p>
          </div>
          <div>
            <figure className="p-0 m-0 h-52">
              <Image
                width={400}
                height={200}
                src="/images/marathon.jpg"
                className="rounded-t-lg h-full w-full object-cover hover:opacity-80 duration-200"
                alt="movie marathon"
              />
            </figure>
            <h4 className="text-gray-200 py-2 font-semibold text-lg">
              Watch a Marathon
            </h4>
            <p className="text-gray-400 text-sm">
              Stop binge watching alone, bring family, friends or pick one of
              the many ongoing sessions here on ViewingParty.
            </p>
          </div>
          <div>
            <figure className="p-0 m-0 h-52">
              <Image
                width={400}
                height={200}
                src="/images/dj.jpg"
                className="rounded-t-lg h-full w-full object-cover hover:opacity-80 duration-200"
                alt="dj"
              />
            </figure>
            <h4 className="text-gray-200 py-2 font-semibold text-lg">
              DJ Music Streams
            </h4>
            <p className="text-gray-400 text-sm">
              Whether through YouTube or Spotify playlists, you can join or
              create a virtual music party and jam out with others.
            </p>
          </div>
          <div>
            <figure className="p-0 m-0 h-52">
              <Image
                width={400}
                height={200}
                src="/images/vote.jpg"
                className="rounded-t-lg h-full w-full object-cover hover:opacity-80 duration-200"
                alt="dj"
              />
            </figure>
            <h4 className="text-gray-200 py-2 font-semibold text-lg">
              Vote on the next viewing
            </h4>
            <p className="text-gray-400 text-sm">
              After every viewing, the session will prompt our voting systems. Vote on the next content whether it be
              a movie, song, clip etc. You can also vote on a discussion period
              to chat with others on your experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
