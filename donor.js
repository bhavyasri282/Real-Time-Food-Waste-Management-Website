const foodForm = document.getElementById("foodForm");
const confirmation = document.getElementById("confirmation");

foodForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const donorName = document.getElementById("donorName").value;
  const foodType = document.getElementById("foodType").value;
  const quantity = document.getElementById("quantity").value;

  confirmation.textContent = `Thank you, ${donorName}! Your donation of ${quantity} ${foodType} has been recorded.`;
  foodForm.reset();
});