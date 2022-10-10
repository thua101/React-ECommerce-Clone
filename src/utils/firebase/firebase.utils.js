// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'


import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtiSEWttH97h3wd-RQsHLhhXBo6aRNE64",
  authDomain: "react-clothing-1.firebaseapp.com",
  projectId: "react-clothing-1",
  storageBucket: "react-clothing-1.appspot.com",
  messagingSenderId: "548612370285",
  appId: "1:548612370285:web:5a32328db77a7c04d33464"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            })

        } catch (error) {
            console.log("error creating the user", error.message);
        }
    } 

    return userDocRef

    // if user data does not exist
    // create / set the document with data from userAuth in my collection

    // return userDocRef
}