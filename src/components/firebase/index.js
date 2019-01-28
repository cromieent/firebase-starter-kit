import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

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

export const getMemberFromFirebase = (facebookId) => {
    if (facebookId) {
        db.collection("members").where("facebookId", "==", facebookId)
            .get()
            .then(function (querySnapshot) {
                console.log(querySnapshot);
                if (querySnapshot.size > 0) {
                    const theDocs = [];
                    querySnapshot.forEach(function (doc) {
                        const { id, created, facebookId, firstname, lastname, updated } = doc.data();
                        theDocs.push({ id, created, facebookId, firstname, lastname, updated });
                    });
                    return theDocs;
                } else {
                    console.log('Could not find a record for ' + facebookId);
                    //need to create a member with the facebook data.
                    const member = {
                        id: uuid(),
                        facebookId,
                        firstname: '',
                        lastname: ''
                    };
                    addMemberToFirebase(member);
                }
            })
            .catch(function (error) {
                console.log("Error getting information for user with Facebook Id " + facebookId);
                console.log(error);
            });
    }
}

export const addMemberToFirebase = (member) => {
    if (member) {
        let { firstname, lastname, facebookId, id } = member;
        if (!id) {
            id = uuid();
        }

        const dtNow = new Date().valueOf();

        db.collection("members").doc(`/${id}`).set({
            id,
            facebookId,
            firstname,
            lastname,
            updated: dtNow,
            created: dtNow
        });
    }
};

export const updateExercises = (memberId, activityRecord) => {
    const handleSuccess = result => {
        console.log('It worked! The Document Id is ' + result.id);
        return result.id;
    };
    const handleReject = rejection => console.log('There was a problem: ' + rejection.error);

    if (activityRecord.length > 0) {
        const exerciseCollectionRef = db.collection("members");
        return exerciseCollectionRef.doc(`/${memberId}`)
            .collection("exercise")
            .add(activityRecord[0].values)
            .then(handleSuccess, handleReject);
    };
};

export const removeMemberFromFirebase = (memberId) => {
    db.collection("members").doc(`/${memberId}`).remove();
}

export const removeExerciseRecordFromFirebase = async (memberId, docId) => {
    return db.collection("members")
        .doc(`/${memberId}`)
        .collection("exercise")
        .doc(`/${docId}`)
        .delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.log("Error removing document: ", error);
        });
};

export const getAllExercise = (memberId) => {
    return db.collection("members").doc(`/${memberId}`).collection("exercise").get()
        .then((snapshot) => {
            const exerciseData = [];
            snapshot.forEach((doc) => {
                exerciseData.push(doc);
            });
            return exerciseData;
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
            return [{ error }];
        });
}

/**
 * LISTENERS
 */

export const watchExercises = (memberId) => {
    db.collection("members").doc(`/${memberId}`).collection("exercise").onSnapshot((querySnapshot) => {
        var exercises = [];
        querySnapshot.forEach(function (doc) {
            exercises.push(doc.data());
        });
        return exercises;
    });
    return [];
};

export default db;


