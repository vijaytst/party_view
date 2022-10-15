import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import axios from "../../services/axios";
import { RAPIDAPI_HOST, RAPIDAPI_KEY } from "../../services/Parties";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, notification } from "antd";
import { DiscoverPartyContext } from "../../pages/_app";

const Footer = () => {




	const discoverParties = useContext(DiscoverPartyContext);

	const [movies, setMovies] = useState(discoverParties.discoverMovies);
	const [series, setSeries] = useState(discoverParties.discoverSeries);
	const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

	return (
		<div className={"py-10 px-5 mt-auto"} style={{ backgroundColor: "#0b0c10", color: "#fff" }}>
			<div className={" grid sm:grid-cols-2 md:grid-cols-4 gap-5 container mx-auto pb-5 border-t border-b border-gray-600"}>
				<div>
					<h5 className={"text-lg py-6 font-semibold text-gray-100"}>Top Movies</h5>
					<ul className={"text-base font-light"} style={{ color: "#45A29E" }}>
						{discoverParties.discoverMovies
							.filter((e, i) => i < 4)
							.map((show, index) => (
								
								<li key={`item ${index}`} className={"py-1"}>
									<Link key={index} href={`/discover/${show.imdbID}/${show.title}`} as={`/discover/${show.imdbID}/${show.title.replaceAll(" ", "_")}`}>
										{show.title}
									</Link>
								</li>
							))}
					</ul>
				</div>
				<div>
					<h5 className={"text-lg py-6 font-semibold text-gray-100"}>Top Shows</h5>
					<ul className={"text-base font-light"} style={{ color: "#45A29E" }}>
						{discoverParties.discoverSeries
							.filter((e, i) => i < 4)
							.map((show, index) => (
								<li key={`item ${index}`} className={"py-1"}>
									<Link href={`/discoverseries/${show._id}/${show.title}`} as={`/discoverseries/${show._id}/${show.title.replaceAll(" ", "_")}`} >{show.title}</Link>
								</li>
							))}
					</ul>
				</div>
				<div>
					<h5 className={"text-lg py-6 font-semibold text-gray-100"}>Top Providers</h5>
					<ul className={"text-base font-light"} style={{ color: "#45A29E" }}>
						<li className={"py-1"}>
							<Link href="#">Netflix</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className={"text-center text-sm pt-5 text-gray-100"}>
				© 2021 <Link href="/">ViewingParty</Link> - The Streaming Guide <Link href="#">Imprint</Link> · <Link href="/privacy-policy">Privacy Policy</Link> ·{" "}
				<Link href="#">Talent</Link>
			</div>
		</div>
	);
};

export default Footer;
