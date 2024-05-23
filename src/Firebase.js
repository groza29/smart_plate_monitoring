// firebase.js
import {
    initializeApp
} from "firebase/app";
import {
    getDatabase
} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBG4JKDiU2go2muyWQKQG_0Y9-dC_bfAcw",
    authDomain: "proiectiotca-c6666.firebase",
    databaseURL: "https://proiectiotca-c6666-default-rtdb.firebaseio.com/",
    projectId: "proiectiotca-c6666",
    storageBucket: "proiectiotca-c6666.appsport.com",
    messagingSenderId: "web",
    appId: "proiectiotca-c6666",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {
    database
};