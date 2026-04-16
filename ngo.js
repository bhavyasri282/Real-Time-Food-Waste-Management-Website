auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

// Load donations
function loadData() {
  db.collection("donations").onSnapshot(snapshot => {
    const list = document.getElementById("list");
    list.innerHTML = "";

    snapshot.forEach(doc => {
      const d = doc.data();

      // 🔥 Show only available donations
      if (d.status !== "Available") return;

      list.innerHTML += `
        <div class="card">
          <p><b>Name:</b> ${d.name}</p>
          <p><b>Food:</b> ${d.food}</p>
          <p><b>Quantity:</b> ${d.quantity}</p>

          <!-- ✅ ADDRESS -->
          <p><b>Address:</b> ${d.address || "Not provided"}</p>

          <!-- ✅ MAP LINK -->
          <a href="https://www.google.com/maps?q=${d.lat},${d.lon}" target="_blank">
            View Location 📍
          </a>

          <br><br>

          <!-- ✅ ACCEPT BUTTON -->
          <button onclick="acceptDonation('${doc.id}')">Accept</button>
        </div>
      `;
    });
  });
}

// Accept donation
function acceptDonation(id) {
  db.collection("donations").doc(id).update({
    status: "Accepted"
  })
  .then(() => {
    alert("Donation Accepted ✅");
  })
  .catch(err => alert(err.message));
}

// 🔥 Start loading data
loadData();