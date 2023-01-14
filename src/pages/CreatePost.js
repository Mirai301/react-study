import React, { useEffect, useState } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [Mouse, setMouse] = useState("");
    const [Keyboard, setKeyboard] = useState("");
    const [Monitor, setMonitor] = useState("");
    const [Earphone, setEarphone] = useState("");

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();

    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title,
            postText,
            peripheral: { mouse: Mouse, keyboard: Keyboard, monitor: Monitor, earphone: Earphone },
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
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
                <h1>投稿する</h1>
                <div className="inputGp">
                    <label> 投稿タイトル</label>
                    <input
                        placeholder="タイトルを入力"
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label> 投稿内容</label>
                    <textarea
                        placeholder="投稿内容を入力"
                        onChange={(event) => {
                            setPostText(event.target.value);
                        }}
                    />

                </div>
                <div className="inputGp">
                    <label>周辺機器はこちら</label>
                    <input
                        placeholder="使用しているマウスを入力"
                        onChange={(event => {
                            setMouse(event.target.value);
                        })}
                    />
                    <input
                        placeholder="使用しているキーボードを入力"
                        onChange={(event => {
                            setKeyboard(event.target.value);
                        })}
                    />
                    <input
                        placeholder="使用しているモニタを入力"
                        onChange={(event => {
                            setMonitor(event.target.value);
                        })}
                    />
                    <input
                        placeholder="使用しているイヤホン･ヘッドホン製品を入力"
                        onChange={(event => {
                            setEarphone(event.target.value);
                        })}
                    />
                </div>
                <button onClick={createPost}>投稿</button>
            </div>
        </div>
    );
}

export default CreatePost;