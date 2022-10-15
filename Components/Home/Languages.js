import React from "react";
import Image from "next/image";

const Languages = () => {
  return (
    <section className="py-10" style={{ backgroundColor: "#02080d" }}>
      <div className="container mx-auto ">
        <div className="flex justify-center ">
          <div className="flex flex-col">
            <h4 className="text-lg text-center text-red">
              18+ Filters for movies/show chat rooms
            </h4>

            <p className="text-gray-400 text-lg sm:text-xl text-center">
              <span className="text-primary">ViewingParty</span> lets you select
              filters for your chat rooms that moderates the content visible to
              you in the rooms
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Languages;
