import React, { useState ,useEffect} from "react";
import Link from "next/link";
import { Tooltip, DatePicker, Space } from "antd";
import axios from "../../services/axios";

import ReactPaginate from "react-paginate";



// import DatePicker from "react-datepicker";
import {
  ShareAltOutlined,
  BookOutlined,
  PlayCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";

import PartyCard from "./PartiesCard";

export default function PartiesCard({ data, ongoing }) {
  const [parties, setParties] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);


  useEffect(() => {

  axios.get(`/get-allparties`).then((response) => {

    setTotalPage(response.data.data.lenght)

    setParties(response.data.data);
  }).catch(error=>{
    setParties([]);
  });

}, []);


const onPageChange = (res) => {
  setPage(res.selected + 1);
};

  return (
    <div >

<div className={"mb-10"}>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={totalPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={onPageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>

    <div  style={{justifyContent:"center" , alignContent:'center'}} className="flex  flex-col lg:flex-row self-centre  flex-wrap" >

{
parties.map((party)=>(

  
    <PartyCard  data={party} ></PartyCard>
))

}

     
</div>

<div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={totalPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={onPageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>

     
    </div>
  );
}
