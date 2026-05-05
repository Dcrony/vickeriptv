function scrollToPricing() {
  document.getElementById("pricing").scrollIntoView({
    behavior: "smooth"
  });
}

function buyPlan(plan) {
  alert("You selected: " + plan);
}

function contact() {
  window.location.href = "https://wa.me/234XXXXXXXXXX";
}