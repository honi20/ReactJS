import {useEffect, useState} from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(async () => {
		authService.onAuthStateChanged((user) => {
			if (user){
				setUserObj({
					uid: user.uid,
					displayName: user.displayName,
					// profileId: user.profileId,
					// profileEmail: user.profileEmail,
					// profileWeb: user.profileWeb,
					// profileBlo: user.profileBlo,
					updateProfile: (args) => user.updateProfile(args)
				});
			}
			else{
				setUserObj(false);
			}
			setInit(true);
		});
	}, []);

	const refreshUser = () => {
		const user = authService.currentUser;
		setUserObj({
			uid : user.uid,
			displayName: user.displayName,
			// profileId: user.profileId,
			// profileEmail: user.profileEmail,
			// profileWeb: user.profileWeb,
			// profileBlo: user.profileBlo,
			updateProfile: (args) => user.updateProfile(args)
		});
	}
	
	return (
		<>
			{init ? (
				<AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/>
			) : (
				"initializing..."
			)}
		</>
	);
}

export default App;
