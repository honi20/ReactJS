import { dbService, storageService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProjectPage = ({nweetObj, isOwner}) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);

	// 트윗 삭제
	const onDeleteClick = async () => {
		const ok = window.confirm("삭제하시겠습니까?");

		if (ok){
			await dbService.doc(`nweets/${nweetObj.id}`).delete();
			if (nweetObj.attachmentUrl !== ""){
				await storageService.refFromURL(nweetObj.attachmentUrl).delete();
			}
		}
	};

	const toggleEditing = () => setEditing((prev) => !prev);

	const onChange = (event) => {
		const {
			target: {value}
		} = event;
		setNewNweet(value);
	}

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.doc(`nweets/${nweetObj.id}`).update({text: newNweet});
		setEditing(false);
	};

	return (
		<Link to="/profile">
			<div className="nweet" style={{ backgroundColor:"pink"}}>
				<h4>{nweetObj.text}</h4>
				<br /><br/>
				<img src={nweetObj.attachmentUrl} />
				{/* {nweetObj.attachmentUrl && (
					<img 
						src={nweetObj.attachmentUrl} 
						width="100px" 
						height="100px"
						// color="pink"
					/>
				)} */}
			</div>
		</Link>
					
			// {isOwner && (
			// 	<div className="nweet__actions">
			// 		<span onClick={onDeleteClick}>
			// 			<FontAwesomeIcon icon={faTrash}/>
			// 		</span>
			// 		<span onClick={toggleEditing}>
			// 			<FontAwesomeIcon icon={faPencilAlt}/>
			// 		</span>
			// 	</div>
			// )} 
			

			// {editing ? (
			// 	<div style={{ backgroundColor:"pink"}}>
			// 		<form onSubmit={onSubmit} className="container nweetEdit">
			// 			<input 
			// 				onChange={onChange} 
			// 				value={newNweet} 
			// 				required
			// 				placeholder="Edit your nweet"
			// 				autoFocus
			// 				className="formInput" 
			// 			/>
			// 			<input type="submit" value="Update Nweet" className="formBtn" />
			// 		</form>
			// 		<button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
			// 	</div>
			// ):(
			// 	<Link to="/profile">
			// 		<div style={{ backgroundColor:"pink"}}>
			// 			<h4>{nweetObj.text}</h4>

			// 			{nweetObj.attachmentUrl && (
			// 				<img 
			// 					src={nweetObj.attachmentUrl} 
			// 					width="100px" 
			// 					height="100px"
			// 					color="pink"
			// 				/>
			// 			)}
						
			// 			{isOwner && (
			// 				<div className="nweet__actions">
			// 					<span onClick={onDeleteClick}>
			// 						<FontAwesomeIcon icon={faTrash}/>
			// 					</span>
			// 					<span onClick={toggleEditing}>
			// 						<FontAwesomeIcon icon={faPencilAlt}/>
			// 					</span>
			// 				</div>
			// 			)}
			// 		</div>
			// 	</Link>
				
			// )}
	);
};

export default ProjectPage;