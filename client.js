
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB3wXY4KGvxLgke5WqUgb4pbkrZzkmYT30",
    authDomain: "multiviewer-8fb8c.firebaseapp.com",
    projectId: "multiviewer-8fb8c",
    storageBucket: "multiviewer-8fb8c.appspot.com",
    messagingSenderId: "1031915716340",
    appId: "1:1031915716340:web:2e043dc466d17c3c1328a1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

// Query Firebase and Store the results in local storage
function ReadData(record){
    db.collection(record).get().then((querySnapshot) => {
        let Arr = []
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            Arr.push(data)
        })
        localStorage.setItem(record, JSON.stringify(Arr))
    });
}




