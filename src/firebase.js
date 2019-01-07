import firebase from 'firebase';
import uuid from 'uuid/v4';

const config = {
    apiKey: "AIzaSyDVIbEWC8rKRxT-zPv-e9jGukkFIJMnnZA",
    authDomain: "reduxfun-86dd1.firebaseapp.com",
    databaseURL: "https://reduxfun-86dd1.firebaseio.com",
    projectId: "reduxfun-86dd1",
    storageBucket: "reduxfun-86dd1.appspot.com",
    messagingSenderId: "1001812301900"
};

firebase.initializeApp(config);

const database = firebase.database();

export default database;

export const addTaskToFirebase = (task) => {

    const id = uuid();

    database.ref(`/${id}`).set({

        task, id
    });
};

export const removeTaskFromFirebase = (id) => {
    database.ref(`/${id}`).remove();
}