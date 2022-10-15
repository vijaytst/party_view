import React from "react";
import Link from "next/link";
import { Tooltip } from "antd";

import { ShareAltOutlined, PlayCircleOutlined, StarOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const GENRE = {
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

export default function DiscoverCard({ data, ongoing }) {
	const router = useRouter();

	return (
		<div className={"grid grid-cols-1 md:grid-cols-3 gap-5 my-10"}>
			<div className={"max-h-80 overflow-hidden rounded-lg relative discover__card"}>
				<div className={"discover__display absolute grid place-content-center h-full w-full"} style={{ backgroundColor: "#0b0c1099" }}>
					<div className={"flex items-center text-base sm:text-lg text-white opacity-100"}>
						{ongoing ? (
							<button
								onClick={() =>
									router.push({
										pathname: "/party/new",
										query: { movieId: data.imdbID },
									})
								}
								className={"bg-gray-900 px-8 py-4 flex items-center rounded-sm"}
							>
								<PlayCircleOutlined className={""} style={{ fontSize: "20px", color: "#66fcf1" }} />
								<p className={"ml-2"}>Create Party</p>{" "}
							</button>
						) : (
							<button
								onClick={() =>
									router.push({
										pathname: "/party/new",
										query: { movieId: data.imdbID },
									})
								}
								className={"bg-gray-900 px-8 py-4 flex items-center rounded-sm"}
							>
								<PlayCircleOutlined className={""} style={{ fontSize: "20px", color: "#66fcf1" }} />
								<p className={"ml-2"}>Create Party</p>{" "}
							</button>
						)}
					</div>
				</div>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img className={"w-full bg-cover"} src={`https://image.tmdb.org/t/p/original${data.posterPath}`} alt="event" />
			</div>
			<div className={"col-span-2 md:border-l md:border-gray-900 md:pl-5"}>
				<div className="flex flex-col justify-between h-full">
					<div>
						<div className="mb-2">
							<Link href={`/discover/${data.imdbID}`} passHref>
								<h1 className={"cursor-pointer text-2xl md:text-3xl capitalize font-sans font-semibold"}>{data.title}</h1>
							</Link>
						</div>
						<div className={"text-base text-gray-300"}>
							<p>{data.overview}</p>
						</div>
						<div className={"my-3"}>
							<div className={"flex flex-row mb-2"}>
								{data.genres.map((item, index) => (
									<Link key={index} href="#" passHref>
										<div className={"cursor-pointer text-black-900 text-xs py-1 px-3 mr-2  rounded-full bg-red-900"}>{GENRE[item] || "Drama"}</div>
									</Link>
								))}
							</div>
							<div className={"flex items-center mb-2"}>
								<p className={"font-mono mr-4 capitalize"}>Party on:</p>
								<div className={"text-gray-900 px-3 mr-2"} style={{ backgroundColor: "#66fcf1" }}>
									Netflix
								</div>
							</div>
							<div className={"flex flex-row mb-2"} style={{ alignItems: "center" }}>
								<p className={"font-mono mr-4 capitalize"}>Countries:</p>
								{data.countries.map((item, index) => (
									<Link key={index} href="#" passHref>
										<div
											style={{ color: "black", width: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}
											className={"cursor-pointer bg-gray-300 text-xs font-bold rounded"}
										>
											{item}
										</div>
									</Link>
								))}
							</div>
							<div className={"text-gray-900 mr-2 flex items-center"} style={{ backgroundColor: "transparent" }}>
								<StarOutlined className={"mr-2"} style={{ fontSize: "20px", color: "#66fcf1" }} />
								<p className={"text-white"}>{data.imdbRating}.0</p>
							</div>
						</div>
					</div>
					<div className="flex items-center">
						{/* <Tooltip title="Share" className={"mr-3"}>
							<div className={"bg-gray-900 w-min p-2 rounded-full cursor-pointer"}>
								<ShareAltOutlined className={""} style={{ fontSize: "25px" }} />
							</div>
						</Tooltip> */}
						<button
							onClick={() =>
								router.push({
									pathname: "/party/new",
									query: { movieId: data.imdbID },
								})
							}
							className={"bg-gray-900 px-5 py-2 flex items-center rounded-sm"}
						>
							<PlayCircleOutlined className={""} style={{ fontSize: "20px", color: "#66fcf1" }} />
							<p className={"ml-2"}>Create Party</p>{" "}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
