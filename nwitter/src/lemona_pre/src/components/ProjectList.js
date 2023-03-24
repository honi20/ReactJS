import { Link } from "react-router-dom";

const ProjectPage = ({nweetObj, isOwner}) => {

	return (
		
			<div className="nweet">
				<Link to={`/project_items/${nweetObj.projectNum}`}>
					<div className="nweet_content">
						<h1>{nweetObj.title}</h1>
						<div>
							<img src={nweetObj.attachmentUrl} />
						</div>
						
						<span>
							{nweetObj.summary}
						</span>

						{/* <span>
							{nweetObj.hasgtag}
						</span>
						<span>
							{`Member : ${nweetObj.member}`}
						</span> */}
					</div>
				</Link>
			</div>
		
	);
};

export default ProjectPage;