import React, { useState } from "react";
import DiscoverCard from "./DiscoverCard";
import axios from "../../services/axios";
import { RAPIDAPI_HOST, RAPIDAPI_KEY } from "../../services/Parties";
import ReactPaginate from "react-paginate";
import { Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const GENRES = {
	6: "Short",
	7: "Adult",
	12: "Adventure",
	14: "Fantasy",
	16: "Animation",
	18: "Drama",
	27: "Horror",
	28: "Action",
	35: "Comedy",
	36: "History",
	37: "Western",
	53: "Thriller",
	80: "Crime",
	99: "Documentary",
	878: "Science Fiction",
	9648: "Mystery",
	10402: "Music",
	10749: "Romance",
	10751: "Family",
	10752: "War",
	10763: "News",
	10764: "Reality",
	10767: "Talk Show",
};

const genreArr = [
	"All",
	"Short",
	"Adult",
	"Adventure",
	"Fantasy",
	"Animation",
	"Drama",
	"Horror",
	"Action",
	"Comedy",
	"History",
	"Western",
	"Thriller",
	"Crime",
	"Documentary",
	"Science Fiction",
	"Mystery",
	"Music",
	"Romance",
	"Family",
	"War",
	"News",
	"Reality",
	"Talk Show",
];

const on = ["Netflix", "YouTube", "Sports"];

export default function Ongoing({ movies, totalPage, getMovies }) {
	// const [country, setCountry] = useState("US");
	const [genreKey, setGenreKey] = useState(18);
	const [loading, setLoading] = useState(false);
	const [partyView, setPartyView] = useState("");
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

	const onPageChange = (res) => {

		getMovies(res.selected + 1, "US", genreKey, );
	};

	const filterGenre = async (e) => {
		setLoading(true);
		setGenreKey(parseInt(e.target.value));
		await getMovies(1, "US", e.target.value);
		setLoading(false);
	};

	return (
		<>
			<div className={"max-w-sm"}>
				<div className={"flex items-center py-5"}>
					<div className="text-gray-900 mr-5 focus:outline-none">
						<select name="cars" className={"text-gray-200 text-xl bg-transparent pb-2 outline-none"}>
							{on.map((e, i) => (
								<option value={e} key={i} className={"text-base my-4 text-gray-900"}>
									{e}
								</option>
							))}
						</select>
					</div>
					<div className="text-gray-900 focus:outline-none">
						<select name="genre" className={"text-gray-200 text-xl bg-transparent pb-2 outline-none"} onChange={(event) => filterGenre(event)}>
							<option value={"18"} className={"text-base my-4 text-gray-900"}>
								All
							</option>
							{Object.keys(GENRES).map((e, i) => (
								<option value={e} key={i} className={"text-base my-4 text-gray-900"}>
									{GENRES[e]}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			{
				<div>
					{!loading && movies.length > 0 ? (
						movies.map((e, i) => <DiscoverCard key={i} data={e} ongoing={true} />)
					) : (
						<div className={"text-center text-lg text-gray-200 my-8"}>
							<p>Currently no data. Try a different filter...</p>
						</div>
					)}
					{loading && (
						<h2
							style={{
								display: "flex",
								justifyContent: "center",
								margin: "20px",
							}}
						>
							<Spin indicator={antIcon} size="large" />
						</h2>
					)}
					<div>
						<ReactPaginate
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
						/>
					</div>
				</div>
			}
		</>
	);

	// );
}
