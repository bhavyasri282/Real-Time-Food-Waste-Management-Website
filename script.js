// Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Contact form
const contactForm = document.getElementById("contactForm");
if(contactForm){
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        db.collection("contacts").add({ name, email, message })
        .then(() => {
            document.getElementById("contactStatus").innerText = "Message sent!";
            contactForm.reset();
        })
        .catch(err => {
            document.getElementById("contactStatus").innerText = "Error! " + err;
        });
    });
}

// Donor form
const donorForm = document.getElementById("donorForm");
if(donorForm){
    donorForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const donorName = document.getElementById("donorName").value;
        const foodItem = document.getElementById("foodItem").value;
        const quantity = document.getElementById("quantity").value;

        db.collection("donations").add({ donorName, foodItem, quantity })
        .then(() => {
            document.getElementById("donorStatus").innerText = "Donation recorded!";
            donorForm.reset();
        })
        .catch(err => {
            document.getElementById("donorStatus").innerText = "Error! " + err;
        });
    });
}