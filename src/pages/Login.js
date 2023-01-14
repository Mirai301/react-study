import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
    let navigate = useNavigate();

    // Twitter認証
    const signInWithTwitter = () => {
        signInWithPopup(auth, provider).then((result) => {
            console.log(result);

            // Home画面へ遷移
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        });
    };

        return (
            <div className="loginPage">
            <h1>Twitterアカウントで登録</h1>
            <button className="login-with-google-btn" onClick={signInWithTwitter}>Signin with Twitter</button>
            </div>
        );
    }

export default Login;