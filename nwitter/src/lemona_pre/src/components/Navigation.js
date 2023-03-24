import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Navigation = ({userObj}) => {
	return (
		<nav>
			<ul style={{ display: "flex", justifyContent: "center", marginTop: 50}}>
				<li>
					<Link to="/"
						style={{
							marginLeft: 10,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							fontSize: 12
						}}
					>
						<FontAwesomeIcon icon={faTwitter} color={"#black"} size="2x" />
						<span style={{ marginTop: 10}}>
							{"Project"}
						</span>
					</Link>
				</li>

				<li>
					<Link to="/participation"
						style={{
							marginLeft: 10,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							fontSize: 12
						}}
					>
						<FontAwesomeIcon icon={faTwitter} color={"#black"} size="2x" />
						<span style={{ marginTop: 10}}>
							{"Participation"}
						</span>
					</Link>
				</li>

				<li>
					<Link to="/promotion"
						style={{
							marginLeft: 10,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							fontSize: 12
						}}
					>
						<FontAwesomeIcon icon={faTwitter} color={"#black"} size="2x" />
						<span style={{ marginTop: 10}}>
							{"Promotion"}
						</span>
					</Link>
				</li>

				<li>
					<Link to="/profile"
						style={{
							marginLeft: 10,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							fontSize: 12
						}}
					>
						<FontAwesomeIcon icon={faUser} color={"#black"} size="2x" />
						<span style={{ marginTop: 10}}>
							{userObj.displayName
								? `${userObj.displayName}의 Profile`
								: "Profile"
							}
						</span>
						
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;