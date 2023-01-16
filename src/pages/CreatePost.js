import React, { useEffect, useState } from "react";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, auth, storage } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

function CreatePost({ isAuth }) {
    const [progresspercent, setProgresspercent] = useState(0);
    const [imgUrl, setImgUrl] = useState("");
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [Mouse, setMouse] = useState("");
    const [Keyboard, setKeyboard] = useState("");
    const [Monitor, setMonitor] = useState("");
    const [Earphone, setEarphone] = useState("");

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();

    const uploadImage = (e) => {
        const file = e.target.files[0]; // ファイル取得方法を変更する必要あり
        console.log(file);
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // ランダム文字列の生成
        // const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        // const N = 16;
        // const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        // 画像アップロード処理
        uploadTask.on("state_changed", (snapshot) => {
            // 処理状況の確認
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
        }, // エラー処理
            (error) => {
                alert(error);
            }, // ステートにアップロードした画像URLをセットする
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL);
                });
        });
    }
 
    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title,
            imgUrl,
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
                <div className="inputImg">
                    <form className="form">
                        <input type='file' id="image" 
                            onChange={(event) => uploadImage(event)}
                        />
                    </form>
                </div>
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