import {useEffect, useState} from "react";
import { dbService } from "fbase";
import ProjectPage from "components/ProjectPage";

import NweetFactory from "components/NweetFactory";

const Home = ({userObj}) => {
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		dbService
			.collection("nweets")
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) => {
				const newArray = snapshot.docs.map((document) => ({
					id: document.id,
					...document.data()
				}));
			setNweets(newArray);
		});
	}, []);

	return (
		<div
			style={{
				maxWidth: 1000,
				width: "100%",
				margin: "0 auto",
				marginTop: 80,
				display: "flex",
				justifyContent: "center",
			}}
		>
			<div className="nweetcontainer">
				<NweetFactory userObj={userObj} />
				<div style={{ marginTop: 30 }} className="nweetgrid">
					{nweets.map((nweet) => (
						<ProjectPage key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;