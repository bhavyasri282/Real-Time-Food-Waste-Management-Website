// Sample demo donations (replace with real-time database later)
const donations = [
  { donorName: "Alice", foodType: "Bread", quantity: 20, location: "City Center", expiry: "2026-04-10" },
  { donorName: "Bob", foodType: "Rice", quantity: 10, location: "Downtown", expiry: "2026-04-08" }
];

const donationList = document.getElementById("donationList");

function displayDonations() {
  donationList.innerHTML = "";
  donations.forEach((d, index) => {
    const card = document.createElement("div");
    card.classList.add("donation-card");
    card.innerHTML = `
      <h3>${d.foodType} (${d.quantity})</h3>
      <p>Donor: ${d.donorName}</p>
      <p>Location: ${d.location}</p>
      <p>Expiry: ${d.expiry}</p>
      <button onclick="acceptDonation(${index})" class="btn btn-secondary">Accept Donation</button>
    `;
    donationList.appendChild(card);
  });
}

function acceptDonation(index) {
  alert(`Donation of ${donations[index].foodType} accepted!`);
  donations.splice(index, 1); // remove donation after accepting
  displayDonations();
}

// Initial display
displayDonations();