auth.onAuthStateChanged(user => {
  if (!user) window.location.href = "index.html";
});

let lat = null, lon = null;

function getLocation() {
  const locText = document.getElementById("locText");
  if (!navigator.geolocation) {
    locText.innerText = "Geolocation not supported by browser ❌";
    return;
  }
  
  locText.innerText = "Fetching position...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      locText.innerText = "Location Captured ✅";
    },
    (err) => {
      locText.innerText = "Location denied/failed ❌";
      alert("Could not get location: " + err.message);
    }
  );
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!lat || !lon) {
    alert("Please click 'Share Live Location 📍' before submitting.");
    return;
  }

  db.collection("donations").add({
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    food: document.getElementById("food").value,
    quantity: document.getElementById("quantity").value,
    address: document.getElementById("address").value || "Not provided",
    lat: lat,
    lon: lon,
    status: "Available",
    donorUid: auth.currentUser.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("Donation Listed Successfully! 🎉");
    document.getElementById("form").reset();
    document.getElementById("locText").innerText = "";
    lat = null;
    lon = null;
  })
  .catch(err => alert("Error: " + err.message));
});