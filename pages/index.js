import React, { useState } from "react";
import Head from "next/head";
import Footer from "../Components/Layouts/Footer";
import Header from "../Components/Home/Header";
import Navbar from "../Components/Layouts/Navbar.js";
import WhatWeOffer from "../Components/Home/WhatWeOffer";
import PublicWatchParties from "../Components/Home/PublicWatchParties";
import PopularMovies from "../Components/Home/PopularMovies";
import NewMovies from "../Components/Home/NewMovies";
import Link from "next/link";
import axios from "../services/axios";
import { CompassOutlined } from "@ant-design/icons";
import { Button } from 'antd'
import router from "next/router";

let getPartyReq = async ({ page = 1, countries = "US", genres = 18 }) => {
	return await axios.get("/get-api-movies", {
		params: {
			page,
			genres,
			countries,
			limit: 18,
		},
	});
};

let gerParties = async ({ page = 1, countries = "US", genres = 18 }) => {

	// https://viewingpartyserver.herokuapp.com/get-all-parties

	return await axios.get("/get-all-parties", {
		params: {
			page,
			genres,
			countries,
			limit: 18,
		},
	});
};


export default function Home({ movie, pages,publicParties }) {
	const [movies, setMovies] = useState(movie);



	return (
		<div className="bg-gray-darkest">
			<Head>
				<title>Home - ViewingParty</title>
				<meta name="description" content="Host Viewing parties with friends and family all around the world" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<Header />
			<WhatWeOffer />
			<PublicWatchParties movies={publicParties} />
			{/* <Languages /> */}
			<PopularMovies popularMovies={movies} />
			{/* <Recommended /> */}
			<NewMovies newMovie={movies} />
			<div className="py-10" style={{ backgroundColor: "#02080d" }}>
				<p className="max-w-2xl text-gray-200 text-center text-xl mx-auto px-5">
					Didn't find what you were looking for? You can create your own ViewingParty on our growing list of supported services!
				</p>
				{/* <Link
				style={{color:"white"}}
					href="/discover"
					className="border border-primary rounded-3xl mx-auto px-7 text-gray-400 py-3 text-xs sm:text-sm hover:bg-gray-700 hover:text-white duration-200 block w-full max-w-max mt-5"
				>
					Host a ViewingParty
				</Link> */}
						<p className="max-w-2xl text-gray-200 text-center text-xl mx-auto px-5 mt-5">
					<Button shape="round" className="font-bold sm:bg-primary hover:bg-transparent" onClick={()=>router.push('/discover')} > Host a ViewingParty </Button>
					
				</p>
			</div>
			<Footer />
		</div>
	);
}

export async function getServerSideProps() {
	try {
		let res = await getPartyReq({ page: 1, countries: "US", genres: 18 });

		let getParty = await gerParties({ page: 1, countries: "US", genres: 18 });


		return {
			props: {
				movie: res.data?.data?.movies,
				publicParties: getParty?.data?.data,
				pages: res.data?.data?.pages,
			},
		};
	} catch (error) {
		console.log("error");
		return {
			props: {
				movie: [],
				pages: 0,
			},
		};
	}
}
