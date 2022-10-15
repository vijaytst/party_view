import React from 'react';
import Link from "next/link";
import {

  PlayCircleOutlined,

} from "@ant-design/icons";



import partyCss from './party.module.scss';


const ViewingPartyCard = ({ data}) => {









	return (

    <Link href={`/party/${data._id}`} >
    <div className={` bg-gray-900 pb-5 group hover:scale-105 duration-200 transform rounded-b-2xl bg-opacity-25 w-full  md:w-3/12 m-5`}>
	
				<img     style={{    height:" 320px",width:"100%"}} 	  src={data.movieImg} className="w-full h-full object-cover" alt="avengers" />
				<div className="bg-black bg-opacity-70 absolute top-3 left-3 p-1 rounded-sm">
					<h2 className="text-white text-sm">{data.attendees.length} participants</h2>
				</div>
				{data.started && (
					<div className="bg-red-500 absolute top-3 right-3 p-1 px-3 rounded-sm">
						<h2 className="text-white text-sm">Live</h2>
					</div>
				)}
        

			<div className="px-5">
				<div className="flex justify-between items-center pt-4 pb-2">
					<h4 className="text-white text-lg">
						 <span className="text-primary font-semibold mx-2">|</span>{' '}
						{data.movieName}
					</h4>
					<h4 className="text-white text-lg uppercase"></h4>
				</div>
				<div className="flex items-center py-2 justify-between">
					<div className="flex items-center">
							<img
							
              style={{    height:" 30px",width:"30px"}}
        
								src={data.movieImg}
								className="w-full h-full object-cover rounded-full"
								alt=""
							/>
		
						<div className="ml-4">
							<h4 className="text-gray-300 text-xs whitespace-nowrap max-w-full overflow-hidden text-">
								{data.creator.userName}
							</h4>
							<h4 className="text-white font-semibold">{data.createdAt}</h4>
						</div>
					</div>
					<div className="flex flex-col justify-center align-en" style={{marginBottom:'auto'}}>
						<a
							href="#"
							className="border flex items-center border-primary rounded-full mx-auto text-gray-400 py-2 px-2 text-xs sm:text-sm hover:bg-gray-700 hover:text-white duration-200 block w-full max-w-max"
						>
							{data.started ? (
								<>
						
<img
										width={10}
										height={10}
                    src="/icons/play.svg"
										alt="play"
										className="w-4 h-4 object-contain"
									/>
									<span className="ml-2">Join Party</span>
								</>
							) : (
								<>
										<img
										width={10}
										height={10}
										src="/icons/calendar.svg"
										alt="play"
										className="w-4 h-4 object-contain"
									/>

									<span className="ml-2">Join Schedule</span>
								</>
							)}
						</a>
					</div>
				</div>
			</div>

      <p className={"mr-2"}>Schedule party</p>
    <PlayCircleOutlined
      className={""}
      style={{ fontSize: "20px", color: "#66fcf1" }}
    />
		</div>

</Link>
	);
};

export default ViewingPartyCard;
