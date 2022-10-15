import { createContext, useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import Account from "../Components/Auth/Account";
import axios from "../services/axios";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Axios from "axios";

export const FormAuthContext = createContext();
export const userContext = createContext();
export const DiscoverPartyContext = createContext();

const progress = new ProgressBar({
	size: 2.5,
	color: "rgb(47 107 223)",
	className: "bar-of-progress",
	delay: 100,
});

let getPartyReq = async ({ page = 3, countries = "US", genres = 18 }) => {
	return await axios.get("/get-api-movies", {
		params: {
			page,
			genres,
			countries,
		},
	});
};


let getSeriesReq = async ({ page = 1, countries = "US", genres = 18 }) => {
	return await axios.get("/get-api-series", {
		params: {
			page,
			genres,
			countries,
		},
	});
};

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
	const [showAuthForm, setAuthForm] = useState(false);
	const [currentForm, setCurrentForm] = useState(1);
	const [discoverMovies, setDiscoverMovies] = useState([]);
	const [discoverSeries, setDiscoverSeries] = useState([]);

	const [userInfo, setUserInfo] = useState({
		data: {},
		isAuthenticated: false,
		loading: true,
		error: "",
	});

	const openForm = (current) => {
		setAuthForm(true);
		setCurrentForm(current);
	};

	useEffect(() => {
		discoverMovieFunc();
		discoverSeriesFunc()
		// axios
		axios
			.get("/profile", {
				headers: { "x-access-token": localStorage.getItem("accessToken") },
			})
			.then((res) => {
				setUserInfo({ data: res.data.data, isAuthenticated: true, error: "", loading: false });
			})
			.catch((err) =>
				setUserInfo({
					...userInfo,
					loading: false,
					error: err?.response?.data?.message || err.message,
				})
			);
	}, []);



	const discoverMovieFunc = async () => {
		try {
			var ranndomPage = Math.floor(Math.random()*20);

			let res = await getPartyReq({ page: 1, countries: "US", genres: 18 });	
			setDiscoverMovies(res.data?.data?.movies);
		} catch (error) {}
	};

	const discoverSeriesFunc = async () => {
		try {
			var ranndomPage = Math.floor(Math.random()*7);
			let res = await getSeriesReq({ page: 1, countries: "US", genres: 18 });	

			setDiscoverSeries(res.data?.data?.series);
		} catch (error) {}
	};

	return (
		<>
			{showAuthForm && <Account setCurrent={setCurrentForm} setShowAuthForm={setAuthForm} current={currentForm} />}
			<userContext.Provider value={{ userInfo, setUserInfo }}>
				<FormAuthContext.Provider value={{ openForm }}>
					<DiscoverPartyContext.Provider value={{ discoverMovies,discoverSeries }}>
						<Component {...pageProps} {...{ userInfo, setUserInfo }} />
					</DiscoverPartyContext.Provider>
				</FormAuthContext.Provider>
			</userContext.Provider>
		</>
	);
}

export default MyApp;
