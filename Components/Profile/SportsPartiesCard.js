import React, {useState,useContext} from 'react'
import { List, Typography, Button } from 'antd';
import moment from "moment";



const SportsPartiesCard = ({data , joinParty,endParty}) => {

    const [loading, setLoading] = useState(false)
    const [sportsLoading, setSportsLoading] = useState(false)

    return (
        <div style={{color:"white", borderColor:"red"}} className="flex-grow mt-5 font-bold bg-black flex  w-full h-15 black border-white align-center rounded-lg px-2" >
            <div className="flex w-1/4">
            <h2 style={{color:"white"}} >{data.partyTitle}</h2>
            </div>
            <div className="w-1/4">
            <h2 style={{color:"white"}} >  {moment(data.createdAt).format("LLL")}</h2>
            </div>
            <div className="w-1/4">
            <h2 style={{color:"white"}} >{data.sportType}</h2>
            </div>
            <div className="w-1/4">
            <h2 style={{color:"white"}} >{data.started?('Live'):('Not started')}</h2>
            </div>
    <div className="w-1/4" >
        
    <button
              onClick={() =>endParty(data._id, setSportsLoading)}
              className="outline-none rounded-full items-center flex text-sm text-white w-max px-5 py-2 border border-gray-300 group duration-200 hover:bg-gray-800 ml-3"
            >
              {sportsLoading && (
                <i className="fa fa-spin fa-spinner mr-3"></i>
              )}
              End party
            </button>
        
         </div>

         <div className="w-1/4" >
        
        <button
                  onClick={() => joinParty(data._id, setLoading, data.partyTitle)}
                  className="outline-none rounded-full items-center flex text-sm text-white w-max px-5 py-2 border border-gray-300 group duration-200 hover:bg-gray-800 ml-3"
                >
                  {loading && (
                    <i className="fa fa-spin fa-spinner mr-3"></i>
                  )}
                  {data.started?('Join party'):('Start party')}
                </button>
             </div>
        </div>
    )
}

export default SportsPartiesCard
