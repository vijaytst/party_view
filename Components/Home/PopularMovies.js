import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./PopularMoviesCard";
import { Spin, notification } from "antd";
import Link  from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

const joinParty = (id, setLoading) => {
	setLoading(true);
	socket.emit("join_party", { partyId: id, userId: userInfo.data._id }, (res) => {
		if (res.error) {
			notification.error({ message: "Please signin to join" });
		} else {
			notification.success({ message: "You joined party" });
			router.push(`/chat?partyId=${id}`);
			setLoading(false);
		}
	});
};

const PopularMovies = ({ popularMovies }) => {
	const moviesRef = useRef();
	const containerRef = useRef();
	const [translate, setTranslate] = useState(0);
	const [movies, setMovies] = useState(popularMovies);
	const [page, setPage] = useState(1);

	const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

	const getMoviesWidth = () => moviesRef.current?.clientWidth;
	let canMoveLeft = translate >= -getMoviesWidth() + containerRef.current?.clientWidth;

	const handleTranslate = (right = true) => {
		if (right) {
			if (translate < 0) {
				setTranslate((current) => current + 195);
			}
		} else {
			if (translate >= -getMoviesWidth() + containerRef.current?.clientWidth) {
				// alert(translate+" - "+getMoviesWidth())
				setTranslate((current) => current - 195);
			}
		}
	};

	const SLIDE_COUNT = 10;
	const slides = Array.from(Array(SLIDE_COUNT).keys());

	return (
		<section style={{ backgroundColor: "#040308" }}>
			<div className="container mx-auto px-5 py-10">
				<h3 className="text-xl text-gray-200">Popular picks for your next virtual Viewing Party</h3>

				{movies ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
						{movies
							.filter((i, index) => index < 3)
							.map((party, idx) => (
								<MovieCard key={idx} joinParty={joinParty} party={movies[Math.floor(Math.random()*movies?.length- 0 + 1)+0]} />
							))}
					</div>
				) : (
					<h2 style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
						<Spin indicator={antIcon} size="large" />
					</h2>
				)}
			</div>
			<div className="flex m-auto mb-5 " style={{ backgroundColor: "inherit" }}>
			<a
					style={{ marginBottom: "20px" }}
					href="/discover"
					className="border border-primary rounded-3xl mx-auto text-sm sm:border sm:bg-primary hover:bg-transparent hover:border-primary hover:border sm:px-5 duration-200 font-semibold sm:py-1 rounded-full text-gray-300 sm:text-gray-900 hover:text-white"
				>
					View More
				</a>
			</div>
		</section>
	);
};

export default PopularMovies;
