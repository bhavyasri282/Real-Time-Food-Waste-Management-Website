auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

let lat = "", lon = "";

function getLocation() {
  navigator.geolocation.getCurrentPosition((pos) => {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    document.getElementById("locText").innerText = "Location captured ✅";
  });
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!lat) {
    alert("Please share location first 📍");
    return;
  }

  db.collection("donations").add({
    name: document.getElementById("name").value,
    food: document.getElementById("food").value,
    quantity: document.getElementById("quantity").value,
    
    // 🔥 NEW ADDRESS FIELD
    address: document.getElementById("address").value,

    lat,
    lon,
    status: "Available"
  })
  .then(() => {
    alert("Stored ✅");
    document.getElementById("form").reset();
  })
  .catch(err => alert(err.message));
});