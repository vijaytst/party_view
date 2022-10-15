import React from 'react';
import Image from 'next/image';

const MovieCard = ({imageUrl, provider, name}) => {
	return (
		<div style={{height: '30rem'}} className="group bg-gray-900  bg-opacity-25 overflow-y-hidden mr-4 w-48 hover:scale-105 duration-200 transform ">
			<figure className="w-full h-80">
				<Image width={500}
					height={750} className="w-full h-full object-cover" src={imageUrl} alt="lucifer" />
			</figure>
			<div className="pb-5 px-4">
				<h4 className="uppercase font-semibold text-sm text-red py-2">
					{provider}
				</h4>
				<h5 className=" text-base text-gray-300 py-1">{name}</h5>
				<a
					href="#"
					className="border border-primary rounded-2xl mt-3 px-3 text-gray-400 py-1 text-xs sm:text-sm hover:bg-gray-700 hover:text-white duration-200 block w-full max-w-max"
				>
					Host
				</a>
			</div>
		</div>
	);
};

export default MovieCard;
