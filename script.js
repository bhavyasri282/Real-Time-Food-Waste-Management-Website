// 1️⃣ Firebase configuration (replace with your own Firebase project config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 2️⃣ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3️⃣ Handle form submission
const foodForm = document.getElementById("foodForm");
foodForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const donorName = document.getElementById("donorName").value;
  const foodType = document.getElementById("foodType").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);
  const expiryDate = document.getElementById("expiryDate").value;

  // Add to Firestore
  db.collection("foodDonations").add({
    donorName,
    foodType,
    quantity,
    location: { latitude, longitude },
    expiryDate,
    pickedUp: false,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    foodForm.reset();
    alert("Food donation added!");
  }).catch((error) => {
    console.error("Error adding donation: ", error);
  });
});

// 4️⃣ Real-time listener for donations
const donationList = document.getElementById("donationList");
db.collection("foodDonations").where("pickedUp", "==", false)
  .orderBy("timestamp", "desc")
  .onSnapshot((snapshot) => {
    donationList.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      li.textContent = `${data.foodType} (${data.quantity}) by ${data.donorName} - Location: ${data.location.latitude}, ${data.location.longitude} - Expiry: ${data.expiryDate}`;
      donationList.appendChild(li);
    });
  });