import React, { useEffect, useContext, useState } from "react";
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from "../context/auth";
import { arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Post({ postData, userData }) {

    const { user } = useContext(AuthContext);
    const [like, setLike] = useState(false);
    console.log(postData  + " postData");


    useEffect(() => {
        if (postData.likes.includes(user.uid)) {
            setLike(true);
        } else {
            setLike(false);
        }
    }, [postData])

    const handleLike = async () => {
        if (!like) {
            console.log("ID -------> ",postData.postId);
            await updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayUnion(user.uid)
            })
        } else {
            await updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayRemove(user.uid)
            })
        }
    }

    return (
        <div className="post-container">
            <video src={postData.postUrl} />

            <div className="video-info">
                <div className="avatar-info">
                    <Avatar sx={{ margin: "0.5rem" }} src={postData?. profileUrl} alt='img' />
                    <p>{postData.profileName}</p>
                </div>

                <div className="like-info">
                    <FavoriteIcon onClick={handleLike} style={like ? { color: "red" } : { color: "white" }} />
                    {
                        postData.likes.length > 0 && postData.likes.length
                    }
                </div>

            </div>
        </div>
    );
}

export default Post;
