// product quantity
let productQuantity = 1;

const productQuantityValue = document.querySelector('#countValue');
const incrementBtn = document.querySelector('#increment');
const decrementBtn = document.querySelector('#decrement');

// To increment the value of productQuantity
incrementBtn.addEventListener('click', () => {
    productQuantity++;
    productQuantityValue.innerHTML = productQuantity;
});

// To decrement the value of productQuantity
decrementBtn.addEventListener('click', () => {
    if (productQuantity > 1) {
        productQuantity--;
        productQuantityValue.innerHTML = productQuantity;
    }
});

let cartCount = document.querySelector("#cartCount"); // badge next to the cart img
let arr = JSON.parse(localStorage.getItem("cartItems")) || [];

let formBtn = document.querySelector(".form-btn");  // submit button
const cartList = document.querySelector('.offcanvas-body');  //off-canvas body

formBtn.addEventListener("click", () => {
    let title = document.querySelector(".title").value;
    let color = document.querySelector(".color").value;
    const selectedRadioButton = document.querySelector('input[name="size"]:checked');  // selecting the checked size
    let size = selectedRadioButton.value;
    let price = document.querySelector(".price").value;

    let data = {
        title,
        color,
        size,
        price,
        productQuantity
    }

    arr.push(data);
    localStorage.setItem("cartItems", JSON.stringify(arr));
    location.reload();
    console.log(data);
});

let bag = 0;   //counting the total number of products in the bag

function addData() {
    let cartTotal = 0;
    arr.map((val, index) => {
        if (val.title === "" || val.color === "" || val.size === "" || val.price === "") {
            document.querySelector("#error").innerHTML = "Please fill in all fields!";
            return;
        }

        bag++; // counting the number of products

        let productTotal = val.price * val.productQuantity; // Calculate product total
        cartTotal = cartTotal + productTotal; // Add product total to cartTotal

        const newItem = document.createElement('p');
        newItem.innerHTML =
            `<div class="card mb-3" style="max-width: 540px; background-color:#FDF4F5; ">
             <div class="row g-0">
                <div class="col-md-4">
                    <img src="empty.jpg" class="img-fluid rounded-start" style="width: 100px;"> 
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" style="text-transform: uppercase;">${val.title}</h5>
                        <p class="card-text" style="font-size: 16px;">Color : ${val.color} </p>
                        <div id="size" style="font-size: 16px;">Size : ${val.size}</div>

                        <div class="countDown d-flex mb-2">
                        <button id="increment" class="btn btn-dark rounded-circle">+</button>
                        <div id="countValue" class="d-flex align-items-center px-3">${val.productQuantity}</div>
                        <button id="decrement" class="btn btn-dark rounded-circle">-</button>
                        </div>

                        <div class="card-text"><small class="text-body-secondary" style="font-size: 16px;"><b>Rs. ${val.price}</b>
                        </small></div>    

                        <button onclick="deleteData(${index})" style="border: 0px; display:flex; justify-content:end;">
                        <img src="trash.png" style="width: 20px;"/>
                        </button>
                    </div>
                </div>
            </div>
            </div>`;

        cartList.appendChild(newItem);
        const cartTotalDisplay = document.getElementById('cartTotalDisplay');
        cartTotalDisplay.innerHTML = `<h6><b>Total Amount : Rs. ${cartTotal}</b></h6>`;  // total bill
    });

}
addData();

cartCount.innerHTML = `${bag}`;  // total number of products in the bag

function deleteData(index) {
    arr.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(arr));
    location.reload();
}

const ClearAll = () => {
    localStorage.removeItem('cartItems');
    location.reload();
    console.log(localStorage);
}

function refreshPage() {
    window.location.href = window.location.href; // Redirects to the current URL
}