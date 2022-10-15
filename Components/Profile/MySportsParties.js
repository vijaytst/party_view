import React, {useContext } from 'react'
import SportsPartyCard from './SportsPartiesCard';
import { userContext } from "../../pages/_app";
import { socket } from "../../services/socket";
import { notification } from "antd";
import axios from "../../services/axios";
import { useRouter } from "next/router";
import Axios from 'axios';

const MySportsParties = ({sportsParties,setSportsParties }) => {
  
    const { userInfo } = useContext(userContext);
    const router = useRouter();



    let reverseRow = sportsParties

 

    const joinParty = (id, setLoading, title) => {
        setLoading(true);
        axios.defaults.headers['x-access-token'] = localStorage.getItem("accessToken");
        axios.post(`/join-sport-party`,{ partyId: id, userId: userInfo.data._id }
  ).then(async (response) => {
   await  getSportsParty()
   setLoading(false);
    notification.success({ message: "Successfully joined party" , duration: 1});
    router.push(`/sports/${id}/${title.replaceAll(" ", "_")}`);
  }).catch(error=>{
    console.log(error)
    setLoading(false);
    notification.success({ message: "Sign in to join a party" , duration: 1});
  });
      };

      const getSportsParty  = ()=>{
        axios
        .get('/get-user-sports-party', {
          headers: { 'x-access-token': localStorage.getItem('accessToken') },
        })
        .then(res => {
          setSportsParties(res.data.data)
        })
        .catch(() => {
          notification.warn({
            message: 'Party not found',
            description: 'Unable to get user party',
            duration: 5000,
          });
        });
      }

      const endParty = (id, setSportsLoading) => {
       setSportsLoading(true);
   
  axios.get(`/stop-sport-party`,{
    headers: { "x-access-token": localStorage.getItem("accessToken") },
    params: { id },}
  ).then(async (response) => {
   await  getSportsParty()
    setSportsLoading(false);
    notification.success({ message: "You deleted party" , duration: 1});
  }).catch(error=>{
    console.log(error)
    setSportsLoading(false);
    notification.success({ message: "operation failed" , duration: 1});
  });
};



    return (
        <section style={{ backgroundColor: "#040308" }}>
        <div className="container mx-auto px-5 py-10">
          <h3 className="text-xl text-gray-200">My Sports Parties</h3>
          <div className="flex w-full flex-col">

          {reverseRow.length > 0 ? (
            reverseRow.slice(0).map((party, i) => (
                <SportsPartyCard 
                joinParty ={joinParty}
                endParty={endParty}
                
                data={party}  />
            ))
          ) : (
            <div className={"pb-24 text-gray-800 text-lg"}>
              <h6>There is currently no schedule to display</h6>
            </div>
          )}

   
          </div>
        </div>
      </section>
    )
}

export default MySportsParties
