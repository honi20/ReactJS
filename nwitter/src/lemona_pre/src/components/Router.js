import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";
import ProjectItem from "./ProjectPage";
import Participation from "./Participation";
import Promotion from "./Promotion";
import ProjectDetail from "../DetailPage/ProjectDetail";

const AppRouter = ({isLoggedIn, userObj, refreshUser }) => {

	return (
		<Router>
			{isLoggedIn && <Navigation userObj={userObj} />}

			<Routes>	
				{isLoggedIn ? (
					<>
						<Route exact path="/"
							element = {<Home userObj={userObj}/>}
						/>
						{/* <Route exact path="/project_items"
							element = {<Home userObj={userObj}/>}
						/> */}
						<Route path="/project_items/:id"
							element = {<ProjectDetail userObj={userObj}/>}
						/>
						<Route exact path="/participation"
							element = {<Participation userObj={userObj}/>}
						/>
						<Route exact path="/promotion"
							element = {<Promotion userObj={userObj}/>}
						/>
						<Route exact path="/profile"
							element = {<Profile refreshUser={refreshUser} userObj={userObj}/>}
						/>
					</>
					
				) : (
					<Route exact path="/"
						element = {<Auth userObj={userObj}/>}
					/>
				)}
			</Routes>
		</Router>
	)
}

export default AppRouter;