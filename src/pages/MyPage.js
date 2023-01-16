import { db, auth } from '../firebase-config';
import React, { useEffect, useState } from "react";
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function MyPage({ isAuth }) {
    // const userDoc = doc(db, "users", auth.currentUser.uid);
    const userDoc = doc(db, "users/9aSiwaIiAofbsYFG3Kj3XygUqmC2")
    const [name, setName] = useState("");
    let navigate = useNavigate();

    // Firestore にユーザー用のドキュメントが作られていなければ作る
    // usersテーブルに任意の名前 + UIDを追加
    const myPage = () => {
        console.log(userDoc);
        if (!userDoc.exists) {
            setDoc(userDoc, {
                screen_name: auth.currentUser.uid,
                display_name: name,
                created_at: Timestamp.now()
            });
            navigate("/");
        };
    }

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
                <button onClick={myPage}>保存</button>
            </div>
        </div>
    );
}

export default MyPage;