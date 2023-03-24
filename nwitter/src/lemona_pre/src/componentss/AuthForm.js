import {useState} from "react";
import { authService, dbService } from "fbase";

const AuthForm = ({userObj}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const onChange = (event) => {
		// event.target에서 name과 value값 가져옴
		const {
			target: {name, value}
		} = event;

		if (name === "email"){
			setEmail(value);
		}
		else if (name === "password"){
			setPassword(value);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try{
			let data;
			if (newAccount){
				data = await authService.createUserWithEmailAndPassword(email, password);
			}
			else{
				data = await authService.signInWithEmailAndPassword(email,password);
			}

		} catch(error){
			setError(error.message);
		}
	};

	const toggleAccount = () => setNewAccount( (prev) => !prev );

	return(
		<>
			<form onSubmit={onSubmit} className="container">
				<input 
					name="email" 
					type="email" 
					placeholder="Email" 
					requird="true"
					value={email}
					onChange={onChange}
					className="authInput"
				/>
				<input 
					name="password" 
					type="password" 
					placeholder="Password" 
					requird="true"
					value={password}
					onChange={onChange}
					className="authInput"
				/>
				<input 
					type="submit" 
					value={newAccount ? "Create Account" : "Log In"}
					className="authInput authSubmit"
				 />
				{error && <span className="authError">{error}</span>}
			</form>

			<span onClick={toggleAccount} className="authSwitch">
				{newAccount ? "Sign In" : "Create Account"}
			</span>
		</>
	);
};

export default AuthForm;