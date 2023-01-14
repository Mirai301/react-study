import { db, auth } from '../firebase-config';
import { getAuth, updateProfile } from "firebase/auth";

function MyProfile({ isAuth }) {
    console.log("認証できている")
    updateProfile(auth.currentUser, {
        displayName: "mirai" 
    }).then(() => {
        // Profile updated!
        // ...
    }).catch((error) => {
        // An error occurred
        // ...
    });
}

export default MyProfile;