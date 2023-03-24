import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Nweet from "componentss/Nweet";

const Profile = ({userObj, refreshUser}) => {
	const history = useNavigate();
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const [editing, setEditing] = useState(false);

	const onLogOutClick = () => {
		authService.signOut();
		history("/");
	};

	const onChange = (event) => {
		const {
			target: {value}
		} = event;
		setNewDisplayName(value);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		if (userObj.displayName !== newDisplayName){
			await userObj.updateProfile({displayName: newDisplayName});
			refreshUser();
		}
	};

	return (
		<div className="maincontainer">
			<div className="container">
				<form onSubmit={onSubmit}>
					<span>Name</span>
					<input 
						onChange={onChange} 
						type="text" 
						placeholder="Display name" 
						value={newDisplayName}
						autoFocus
						className="formInput"
					/>
					<input 
						type="submit" 
						value="Update Profile"
						className="formBtn"
						style={{
							marginTop: 10
						}} 
					/>
				</form>
				<span className="formBtn concelBtn logOut" onClick={onLogOutClick}>
					Log Out
				</span>
			</div>
			
		</div>
	);
};

export default Profile;