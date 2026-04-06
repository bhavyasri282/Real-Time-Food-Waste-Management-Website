// Firebase config (same as script.js)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// NGO request form
const ngoForm = document.getElementById("ngoForm");
if(ngoForm){
    ngoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const ngoName = document.getElementById("ngoName").value;
        const foodRequest = document.getElementById("foodRequest").value;
        const quantityRequest = document.getElementById("quantityRequest").value;

        db.collection("ngoRequests").add({ ngoName, foodRequest, quantityRequest })
        .then(() => {
            document.getElementById("ngoStatus").innerText = "Request submitted!";
            ngoForm.reset();
        })
        .catch(err => {
            document.getElementById("ngoStatus").innerText = "Error! " + err;
        });
    });
}

// Display all requests
const requestsList = document.getElementById("requestsList");
db.collection("ngoRequests").onSnapshot(snapshot => {
    requestsList.innerHTML = "";
    snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.innerText = `${doc.data().ngoName} needs ${doc.data().quantityRequest} of ${doc.data().foodRequest}`;
        requestsList.appendChild(li);
    });
});