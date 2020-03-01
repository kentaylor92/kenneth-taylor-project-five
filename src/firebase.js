import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBo7XjqmSIw1ycVlFHRA-QVQxnUPJf4bA0",
    authDomain: "kenneth-taylor-project-five.firebaseapp.com",
    databaseURL: "https://kenneth-taylor-project-five.firebaseio.com",
    projectId: "kenneth-taylor-project-five",
    storageBucket: "kenneth-taylor-project-five.appspot.com",
    messagingSenderId: "843337778614",
    appId: "1:843337778614:web:649c43dfcf9394c1ef6d17"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;