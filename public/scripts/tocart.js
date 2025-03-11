const addToCartButtons = document.getElementsByClassName("addToCartBtn");

const selectedParts = [];
// this is just so that we can press nothing and view cart. to view cart, we need two inputs.
// This is mad cringe ngl. This is only so it WORKS right now.
selectedParts.push(-1);
sessionStorage.setItem("selectedParts", JSON.stringify(selectedParts));

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", function (event) {
    const partId = this.parentElement.id;
    if (!selectedParts.includes(partId)) {
      selectedParts.push(partId);
      sessionStorage.setItem("selectedParts", JSON.stringify(selectedParts));
    }
    console.log(selectedParts);
  });
}

const cartButton = document.getElementById("cartButton");
cartButton.addEventListener("click", function (event) {
  event.preventDefault();
  const selectedParts = JSON.parse(sessionStorage.getItem("selectedParts"));
  console.log("Sending selected parts to server:", selectedParts);
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "/cart";
  selectedParts.forEach((partId) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "partIds";
    input.value = partId;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
});
