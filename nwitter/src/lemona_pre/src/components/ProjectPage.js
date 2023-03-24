import { useParams, Link } from "react-router-dom";
import { dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faAlignLeft } from "@fortawesome/free-solid-svg-icons";

const ProjectDPage = ({userObj}) => {
	const {id} = useParams();
	const projectId = parseInt(id);
	const [projectItem, setProjectItem] = useState({id:"", url:"", title:"1", member:"", text:"", hashtag:""});
	const [projectOwner, setProjectOwner] = useState(false);
	const [detailEditing, setDetailEditing] = useState(false);

	const [newUrl, setNewUrl] = useState(projectItem.url);
	const [newTitle, setNewTitle] = useState(projectItem.title);
	const [newMember, setNewMember] = useState(projectItem.member);
	const [newText, setNewText] = useState(projectItem.text);
	const [newHashtag, setNewHashtag] = useState(projectItem.hashtag);

	useEffect(async () => {
		dbService
			.collection("nweets")
			.where("projectNum", "==", projectId)
			.get()
			.then(function(querySnapshot) {
				const newArray = querySnapshot.docs.map((document) => ({
					id: document.id,
					...document.data()
				}));

				setProjectItem({
					id:newArray[0].id, 
					url:newArray[0].attachmentUrl, 
					title: newArray[0].title, 
					member: newArray[0].member,
					text: newArray[0].text,
					hashtag: newArray[0].hashtag
				});

				setNewUrl(newArray[0].attachmentUrl);
				setNewTitle(newArray[0].title);
				setNewMember(newArray[0].member);
				setNewText(newArray[0].text);
				setNewHashtag(newArray[0].hashtag);
				
				if (newArray[0].creatorId == userObj.uid){
					setProjectOwner(true);
				}
				else{
					setProjectOwner(false);
				}
			})
			
			.catch(function(error) {
				console.log("Error getting documents: ", error);
			});
	}, []);

	const onDeleteClick = async () => {
		const ok = window.confirm("삭제하시겠습니까?");

		if (ok){
			await dbService.doc(`nweets/${projectItem.id}`).delete();
			if (projectItem.url !== ""){
				await storageService.refFromURL(projectItem.url).delete();
			}
			window.location.replace("/");
		}
	};

	const toggleEditing = () => setDetailEditing((prev) => !prev);

	// const onChangeUrl = (event) => {
	// 	const {
	// 		target: {value}
	// 	} = event;
	// 	setNewUrl(value);
	// }
	const onChange = (event) => {
		const {
			target: {value}
		} = event;

		if (event.target.id === "titleInput")
			setNewTitle(value);

		else if (event.target.id === "memberInput")
			setNewMember(value);

		else if (event.target.id === "textInput")
			setNewText(value);

		else if (event.target.id === "hashtagInput")
				setNewHashtag(value);

	}

	const onChangeTitle = (event) => {
		const {
			target: {value}
		} = event;
		setNewTitle(value);
	}
	const onChangeMem = (event) => {
		const {
			target: {value}
		} = event;
		setNewMember(value);
	}
	const onChangeText = (event) => {
		const {
			target: {value}
		} = event;
		setNewText(value);
	}
	const onChangeHashtag = (event) => {
		const {
			target: {value}
		} = event;
		setNewHashtag(value);
	}

	const onSubmit = async (event) => {
		event.preventDefault();
		console.log(projectItem.id);
		await dbService.doc(`nweets/${projectItem.id}`).update({
			// attachmentUrl: newUrl,
			title: newTitle,
			member: newMember,
			text: newText,
			hashtag: newHashtag
		});
		setDetailEditing(false);
		window.location.reload();
		console.log("111");
	};

	return(
		<div className="update_container" style={{backgroundColor:"pink"}}>
			
			<>
				{detailEditing ? (
					<>
						<form onSubmit={onSubmit}>
							<div className="detail_container">
								<div>
									<img src={`${projectItem.url}`}/>
								</div>

								<div className="detail_contents" >
									<span>제목</span>
									<input 
										onChange={onChange} 
										value={newTitle} 
										required
										placeholder="Edit Title"
										autoFocus
										id="titleInput"
									/>
								</div>

								<div className="detail_contents">
									<span>멤버</span>
									<input 
										onChange={onChange} 
										value={newMember} 
										required
										placeholder="Edit Member"
										autoFocus
										id="memberInput"
									/>
								</div>

								<div className="detail_contents">
									<span>한줄소개</span>
									<input 
										onChange={onChange} 
										value={newText} 
										required
										placeholder="Edit Text"
										autoFocus
										id="textInput"
									/>
								</div>

								<div className="detail_contents">
									<span>해시태그</span>
									<input 
										onChange={onChange} 
										value={newHashtag} 
										required
										placeholder="Edit Hashtag"
										autoFocus
										id="hashtagInput"
									/>
								</div>
							</div>
							<input type="submit" value="Update Project" className="formBtn" />
						</form>
						<div>
						<button onClick={toggleEditing} className="formBtn">Cancel</button>
						</div>
						
					</>
				) : (
					<>
							
						<div className="detail_container">
							 
							<div>
								<img src={`${projectItem.url}`}/>
							</div>
							 
							<div className="detail_contents">
								<span>제목</span>
								<div>{`${projectItem.title}`}</div>
							</div>
							 
							<div  className="detail_contents">
								<span>멤버</span>
								<div>{`${projectItem.member}`}</div>
							</div>
							 
							<div className="detail_contents">
								<span>한줄소개</span>
								<div>{`${projectItem.text}`}</div>
							</div>
							 
							<div className="detail_contents">
								<span>해시태그</span>
								<div>{`${projectItem.hashtag}`}</div>
							</div>
						</div >

						{projectOwner && (
							<div style={{ paddingBottom:"20px"}}>
								<span onClick={onDeleteClick}>
									<FontAwesomeIcon icon={faTrash} size="2x" style={{ padding:"10px"}}/>
								</span>
								<span onClick={toggleEditing}>
									<FontAwesomeIcon icon={faPencilAlt} size="2x" style={{ padding:"10px"}}/>
								</span>
							</div>
						)}

					</>	
				)}
			</>
		</div>
		
	);
};

export default ProjectDPage;