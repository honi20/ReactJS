import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faGoogle,
	faGithub
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "componentss/AuthForm";

const Auth = ({userObj}) => {
	const onSocialClick = async (event) => {
		const {
			target : {name}
		} = event;
		let provider;

		if (name === "google"){
			provider = new firebaseInstance.auth.GoogleAuthProvider();
		}
		else if (name === "github"){
			provider = new firebaseInstance.auth.GithubAuthProvider();
		}
		const data = await authService.signInWithPopup(provider);
	}

	return(
		<div className="authContainer">
			<FontAwesomeIcon
				icon={faTwitter}
				color={"black"}	
				size="3x"
				style={{marginBottom: 30}}
			/>
			<AuthForm userObj={userObj}/>
			
			<div className="authBtns">
				<button onClick={onSocialClick} name="google" className="authBtn">
					Continue with Google <FontAwesomeIcon icon={faGoogle}/>
				</button>
				<button onClick={onSocialClick} name="github" className="authBtn">
					Continue with Github <FontAwesomeIcon icon={faGithub}/>
				</button>
			</div>
		</div>
	);
};

export default Auth;