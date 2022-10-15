
import React, { useEffect, useRef, useState } from "react";
// import MovieCard from "./PopularMoviesCard";
import { Spin, notification } from "antd";
import Link  from "next/link";
import { LoadingOutlined } from "@ant-design/icons";
import YoutubePartyCard from './YoutubePartiesCard'
import ReactPaginate from "react-paginate";


const YoutubeComponent = ({youtubeParties}) => {

    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

    const onPageChange = (res) => {
		// getMovies(res.selected + 1, "US", genreKey, );
	};
	
    return (
        <div>
            		<section style={{ backgroundColor: "#040308" }}>
			<div className="container mx-auto px-5 py-10">
				<h3 className="text-xl text-gray-200">Youtube Parties</h3>

				{youtubeParties ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
						{youtubeParties
							.map((party, idx) => (
                                <YoutubePartyCard party={party}  />
								// <MovieCard key={idx} joinParty={joinParty} party={movies[Math.floor(Math.random()*movies?.length- 0 + 1)+0]} />
							))}
					</div>
				) : (
					<h2 style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
						<Spin indicator={antIcon} size="large" />
					</h2>

				)
                }
                		<div>
						{/* <ReactPaginate
							previousLabel={"<"}
							nextLabel={">"}
							breakLabel={"..."}
							children= {5}
							pageCount={10}
							marginPagesDisplayed={1}
							pageRangeDisplayed={1}
							onPageChange={onPageChange}
							containerClassName={"pagination"}
							activeClassName={"active"}
						/> */}
					</div>
			</div>
        
		</section>
            
        </div>
    )
}

export default YoutubeComponent
