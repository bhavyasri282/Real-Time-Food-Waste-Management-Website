auth.onAuthStateChanged(user => {
  if (!user) window.location.href = "index.html";
});

const listContainer = document.getElementById("list");

function loadData() {
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  db.collection("donations")
    .where("status", "==", "Available")
    .onSnapshot(snapshot => {
      listContainer.innerHTML = "";

      // Filter out donations created by the currently logged-in user
      const availableOtherDonations = snapshot.docs.filter(doc => {
        const data = doc.data();
        return data.donorUid !== currentUserId; // 🔒 Security check: Hide donor's own posts
      });

      if (availableOtherDonations.length === 0) {
        listContainer.innerHTML = `
          <div class="card" style="text-align:center;">
            <p><b>No available donations from other users right now.</b></p>
            <p>Check back later or ask a friend to post a donation to test!</p>
          </div>
        `;
        return;
      }

      availableOtherDonations.forEach(doc => {
        const d = doc.data();
        const card = document.createElement("div");
        card.className = "card";

        const phoneNum = sanitize(d.phone);

        card.innerHTML = `
          <p><b>Donor Name:</b> ${sanitize(d.name)}</p>
          <p><b>Contact Phone:</b> <a href="tel:${phoneNum}" style="color: #64ffda; text-decoration: underline;">${phoneNum} 📞</a></p>
          <p><b>Food Items:</b> ${sanitize(d.food)}</p>
          <p><b>Quantity:</b> ${sanitize(d.quantity)}</p>
          <p><b>Address:</b> ${sanitize(d.address)}</p>
          <p>
            <a href="https://www.google.com/maps?q=${d.lat},${d.lon}" target="_blank" rel="noopener">
              View Location on Google Maps 📍
            </a>
          </p>
          <button style="background: linear-gradient(45deg,#34a853,#2ecc71);" onclick="acceptDonation('${doc.id}', '${d.donorUid}')">
            Accept Pickup Request
          </button>
        `;

        listContainer.appendChild(card);
      });
    }, err => {
      console.error("Firestore snapshot error:", err);
    });
}

function acceptDonation(id, donorUid) {
  const currentUserId = auth.currentUser.uid;

  // 🔒 Extra Security Layer: Block acceptance if IDs match
  if (donorUid === currentUserId) {
    alert("Security Alert: You cannot accept your own donation! ❌");
    return;
  }

  db.collection("donations").doc(id).update({
    status: "Accepted",
    claimedBy: currentUserId,
    claimedAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => alert("Donation Accepted! Please call or reach out to pick up the food. ✅"))
  .catch(err => alert("Error: " + err.message));
}

function sanitize(str) {
  if (!str) return "Not provided";
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

loadData();