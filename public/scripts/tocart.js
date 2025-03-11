const addToCartButtons = document.querySelectorAll(".addToCartBtn")

const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closePopup');
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

const deleteButtons = document.querySelectorAll(".deleteBtn");
/*console.log(deleteButtons);*/

deleteButtons.forEach(button => {
  button.addEventListener('click', function () {
    alert("Item deleted!");
  })
});

const selectedParts = [];
// this is just so that we can press nothing and view cart. to view cart, we need two inputs.
// This is mad cringe ngl. This is only so it WORKS right now.
// Also, everyone will have a -1 product in their cart. Womp Womp.
selectedParts.push(-1, -1);
sessionStorage.setItem("selectedParts", JSON.stringify(selectedParts));

// All the 'add to cart' buttons grab the id their parents are associated with
// and then give that id to the selectedParts array.
// its sick af when I dont use dumb ids and use the actual part id amen baby
addToCartButtons.forEach(button => {
  button.addEventListener('click', function () {
      popup.style.display = 'flex';
      
      const partId = this.parentElement.id;
      if (!selectedParts.includes(partId)) {
          selectedParts.push(partId);
          sessionStorage.setItem("selectedParts", JSON.stringify(selectedParts));
      }
      console.log(selectedParts);
  });
});


// This sends all the buttons we pressed to the server. I couldn't
// figure out how to send the data to the server individually. I clump
// them all together, wrap em in a form, and send it to the server.
// LOL
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

