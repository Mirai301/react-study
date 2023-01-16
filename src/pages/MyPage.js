import { db, auth } from '../firebase-config';
import React, { useEffect, useState } from "react";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function MyPage({ isAuth }) {
    const usersCollection = collection(db, "users");
    const [name, setName] = useState("");
    let navigate = useNavigate();

    // usersテーブルに任意の名前 + UIDを追加
    const myPage = async () => {
        await addDoc(usersCollection, {
            displayName: name,
            id: auth.currentUser.uid
        });
        navigate("/");
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [])

    return (
        <div className="createPostPage">
        <div className="cpContainer">
            <h1>プロフィールを編集する</h1>
            <div className="inputGp">
                <label> プロフィール名</label>
                <input
                    placeholder="名前を入力"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
            </div>
            <button onClick={myPage}>投稿</button>
        </div>
    </div>
    );
}

export default MyPage;