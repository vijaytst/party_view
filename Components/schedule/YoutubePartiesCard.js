import React, {useState} from 'react'
import Link from 'next/link';
import { Tooltip, Avatar,Badge } from 'antd';
import Image from 'next/image';
import moment from 'moment';
import { PlayCircleOutlined} from "@ant-design/icons";
import ReactPlayer from 'react-player'

const YoutubePartiesCard = ({party}) => {
	const [loading, setLoading] = useState(false);

	return (
		<div className="bg-gray-900 pb-5 group hover:scale-105 duration-200 transform rounded-b-2xl bg-opacity-25">
			<a href={`/youtube/${party?._id}/${party?.partyTitle.replaceAll(" ", "_")}`} className={"cursor-pointer"} >
				<figure className="relative overflow-hidden h-52 cursor-pointer">
					{/* <video src={party?.videoUrl} className="w-full h-full object-cover cursor-pointer" alt="avengers" /> */}
                    <ReactPlayer
                  className='pointer-events-none'
                    width={"100%"}
                    url={party?.videoUrl}
                    height={"100%"}
                    controls={false}
                    playing ={false}
                  />
					<div className="bg-black bg-opacity-70 absolute top-3 left-3 p-1 rounded-sm">
						<h2 className="text-white text-sm">{party?.attendees.length} Invited</h2>
					</div>
					<div className="bg-red-500 absolute top-3 right-3 p-1 px-3 rounded-sm">
						<h2 className="text-white text-sm">
							<span>
								{moment(party?.createdAt).format("LLL")}
								{/* <span className="text-primary font-semibold mx-2">|</span>{" "} */}
							</span>
						</h2>
					</div>
				</figure>
			</a>
			<div className="px-5">
				<div className="flex justify-between items-center pt-4 pb-2">
					<h2 className="text-white text-lg">{party?.partyTitle}</h2>
                    <h2 className="text-white text-lg" >{party?.sportType}</h2>
				
				</div>
                
				<div className="flex justify-between items-center pt-4 pb-2">
					<h2 className="text-white text-sm">{party?.creator?.userName}</h2>
					{/* <h4 className="text-white text-lg uppercase">{party?.countries[0]}</h4> */}
				</div>
				<div className="flex justify-between items-center mt-2 mb-2">
					<h4 className="text-sm" style={{ color: "grey" }}>
						{" "}
						{   
                        party.started?(                        <Badge count={"Live"}>
                        </Badge>):(<Badge count={"Not Started"}>
    </Badge>)

}
					</h4>
                    <a href={`/youtube/${party?._id}/${party?.partyTitle.replaceAll(" ", "_")}`} >
              <a
                className={'bg-gray-900 px-5 py-2 flex items-center rounded-sm'}
              >
                <PlayCircleOutlined
                  className={''}
                  style={{ fontSize: '20px', color: '#66fcf1' }}
                />
                <p className={'ml-2'}>Join Party</p>{' '}
              </a>
            </a>
				</div>
				<div className="text-sm flex" style={{ color: "grey" }}>
			
				</div>
			</div>
		</div>

	);
}

export default YoutubePartiesCard
