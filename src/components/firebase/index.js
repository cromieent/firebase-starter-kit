import firebase from 'firebase';
import uuid from 'uuid/v4';
//ONLY DO OPERATIONS ***TO*** FIREBASE HERE; Query elsewhere
/**
 * Initialization information
 */
const config = {
    apiKey: "AIzaSyA6MRnU_HjgXBjmrDLD0gRfaikQMQ4bGzc",
    authDomain: "baritracker-75261.firebaseapp.com",
    databaseURL: "https://baritracker-75261.firebaseio.com",
    projectId: "baritracker-75261",
    storageBucket: "baritracker-75261.appspot.com",
};

firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

/**
 * Loads all members into memory.  Watch this for the future.
db.collection("members").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const { firstname, lastname } = doc.data();
        console.log(`id=${doc.id}\r\nfirstname=${firstname}\r\nlastname=${lastname}`);
    });
});
*/

export const addMemberToFirebase = (member) => {
    if (member) {
        const { firstname, lastname } = member;
        const id = uuid();
        const dtNow = new Date().valueOf();

        db.collection("members").doc(`/${id}`).set({
            id,
            firstname: firstname.value,
            lastname: lastname.value,
            updated: dtNow,
            created: dtNow
        });
    }
};

export const removeMemberFromFirebase = (id) => {
    db.collection("members").doc(`/${id}`).remove();
}


export default db;