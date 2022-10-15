import React from 'react';
import Image from 'next/image';

const ViewingPartyCard = ({ live, movieImg, provider, movieName, noOfParticipants }) => {
	return (
		<div className="bg-gray-900 pb-5 group hover:scale-105 duration-200 transform rounded-b-2xl bg-opacity-25">
			<figure className="relative h-48">
				<Image 	width={500}
							height={200} src={`${movieImg}` } className="w-full h-full object-cover" alt="avengers" />
				<div className="bg-black bg-opacity-70 absolute top-3 left-3 p-1 rounded-sm">
					<h2 className="text-white text-sm">{noOfParticipants} participants</h2>
				</div>
				{live && (
					<div className="bg-red-500 absolute top-3 right-3 p-1 px-3 rounded-sm">
						<h2 className="text-white text-sm">Live</h2>
					</div>
				)}
			</figure>
			<div className="px-5">
				<div className="flex justify-between items-center pt-4 pb-2">
					<h4 className="text-white text-lg">
						JUL 19 <span className="text-primary font-semibold mx-2">|</span>{' '}
						10:00 PM
					</h4>
					<h4 className="text-white text-lg uppercase">{provider}</h4>
				</div>
				<div className="flex items-center py-2 justify-between">
					<div className="flex items-center">
						<figure className="m-0 p-0 w-12 h-12">
							<Image
								width={500}
								height={300}
								src="/images/user1.jpg"
								className="w-full h-full object-cover rounded-full"
								alt=""
							/>
						</figure>
						<div className="ml-4">
							<h4 className="text-gray-300 text-xs whitespace-nowrap max-w-full overflow-hidden text-">
								Bay Daniel Watch's party
							</h4>
							<h4 className="text-white font-semibold">{movieName}</h4>
						</div>
					</div>
					<div className="flex flex-col justify-center align-en" style={{marginBottom:'auto'}}>
						<a
							href="#"
							className="border flex items-center border-primary rounded-full mx-auto px-5 text-gray-400 py-2 text-xs sm:text-sm hover:bg-gray-700 hover:text-white duration-200 block w-full max-w-max"
						>
							{live ? (
								<>
									<Image
										width={30}
										height={30}
										src="/icons/play.svg"
										alt="play"
										className="w-4 h-4 object-contain"
									/>
									<span className="ml-2">Join</span>
								</>
							) : (
								<>
									<Image
										width={30}
										height={30}
										src="/icons/calendar.svg"
										alt="play"
										className="w-4 h-4 object-contain"
									/>
									<span className="ml-2">Add</span>
								</>
							)}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewingPartyCard;
