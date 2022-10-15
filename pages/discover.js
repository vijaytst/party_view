import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../Components/Layouts/Navbar';
import Ongoing from '../Components/discover/Ongoing';
import Footer from '../Components/Layouts/Footer';
import axios from '../services/axios';

let getPartyReq = async ({ page = 1, countries = 'US', genres = 18 }) => {
  return await axios.get('/get-api-movies', {
    params: {
      page,
      genres,
      countries,
    },
  });
};

export default function Discover({ movie, pages }) {
  const [movies, setMovies] = useState(movie);
  const [totalPage, setTotalPage] = useState(pages);

  // useEffect(() => {
  // 	getMovies({ page: 1, genres: "", countries: "US" });
  // }, []);

  const getMovies = async (page, countries, genres) => {
    try {
      let res = await getPartyReq({ page, countries, genres });
      setMovies(res.data?.data?.movies);
      setTotalPage(res.data?.data?.pages);
    } catch (error) {}
  };

	return (
		<div style={{ backgroundColor: "#040308" }}>
			<Head>
				<title>ViewParty - Discover</title>
				<meta name="description" content="The best way to watch shows and movies with others" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<div className={"pt-28 px-5 text-white"}>
				<div className={"container mx-auto"}>
					<div className={"my-5"}>
						<h1 className={"text-3xl md:text-4xl font-sans"}>Discover New Content For Your Next Viewing Party Below</h1>
					</div>
					<div className={"flex items-center text-lg box-content mb-5"}></div>
					<div className={"py-4 border-t border-gray-900"}>
						<Ongoing movies={movies} totalPage={totalPage} getMovies={getMovies} />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export async function getServerSideProps() {
	try {
		let res = await getPartyReq({ page: 1, countries: "US", genres: 18 });

		return {
			props: {
				movie: res.data?.data?.movies,
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
