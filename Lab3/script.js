
let productArray = ["печиво","помідори","сир"]; // помідори

const addField = document.querySelector(".search-field");
const addButton = document.querySelector(".button-add");


//let minus = document.getElementsByClassName(".button-red");

document.addEventListener('click', event => {
    let element = event.target;

    if (element.tagName === 'BUTTON') {
        if (element.className === "button button-red") {
            let next = element.nextSibling;
            let text;
            if (next.className === "amount") {
                text = next.textContent--;
            } else {
                next = element.nextSibling.nextSibling;
                text = next.textContent--;
            }

            if (text == '2') {
                makeButtonInactive(element);
            }

        } else if (element.className === "button button-green") {
            let next = element.previousSibling;
            let minusButton = element.previousSibling.previousSibling;
            let text;

            if (next.className === "amount") {
                text = next.textContent++;
            } else {
                next = element.previousSibling.previousSibling;
                text = next.textContent++;
            }

            if (text == '1') {
                if (!minusButton.classList.contains("button")) {
                    minusButton = minusButton.previousSibling.previousSibling;
                }
                makeButtonActive(minusButton);
            }
        } else if (element.className === "button button-remove") {
            // alert("Remove working");

            productArray = deleteElementFromArray(element);
            element.parentElement.parentElement.remove();
        } else if (element.className === "button button-buy") {

            let section = element.parentElement.parentElement;
        //    console.log(element);
            if (section.classList.contains("in-list-product")) {
                section.classList.remove("in-list-product");
                section.classList.add("bought-product");
                element.textContent = "Не куплено";
            } else {
                section.classList.remove("bought-product");
                section.classList.add("in-list-product");
                element.textContent = "Куплено";
            }
        }
    }

});

function deleteElementFromArray(element) {
    let temp = [];
    let label = element.parentElement.parentElement.children[0].textContent.toLowerCase();
    console.log(element.parentElement.parentElement.children[0].textContent);
    for (let i = 0; i < productArray.length; i++) {
        if (productArray[i] !== label) {
            temp.push(productArray[i]);
            console.log(productArray[i]);
        }
    }
    return temp;
}
function makeButtonInactive(button) {
    button.classList.add("button-inactive");
    button.setAttribute("disabled","true");
}

function makeButtonActive(button) {
    button.classList.remove("button-inactive");
    button.removeAttribute("disabled","true");
}


function addStatisticElement() {
    let string = addField.value;
    string = string.trim().toLowerCase();
 //   if (!productArray.includes(string)) {
        string = string.charAt(0).toUpperCase() + string.slice(1);
        addField.value = "";
        //margin-left: 5px;
        let element = document.createElement("span");
        //element.setAttribute("margin-left","5px");
        element.classList.add("product-item");

        element.appendChild(document.createTextNode(string));

        let counter = document.createElement("span");
        counter.classList.add("amount");
        counter.appendChild(document.createTextNode("1"));

        element.appendChild(counter);

        document.querySelector(".buy-list").children[1].appendChild(element);
  //  }
}

addButton.addEventListener("click", function () {
    addProductAndStatistics();
});

addField.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        addProductAndStatistics();
    }
})

function addProductAndStatistics() {
    if (addField.value.length === 0) {
        return;
    }
    let string = addField.value.trim().toLowerCase();
    if (!productArray.includes(string)) {
        addProduct();
        addStatisticElement();
    } else {
        addField.value = "";
        alert("Product " + string +  " already in list!");
    }
}
function addProduct() {

    let string = addField.value;

    string = string.trim().toLowerCase();
    productArray.push(string);
    string = string.charAt(0).toUpperCase() + string.slice(1);

    //let fieldContent = document.createTextNode(string.charAt(0).toUpperCase() + string.slice(1));

    // if (fieldContent.length === 0) {
    //     return;
    // }

    //if (!productArray.includes(string)) {
    // } else {
    //     alert("Product " + string +  " already in list!");
    //     return;
    // }

    let element = document.createElement("section");
    element.classList.add("in-list-product");

    element.innerHTML = `<label contenteditable="true">${string}</label>

            <div style="display: flex">
                <button class="button button-red button-inactive" disabled data-tooltip="minus">–</button>
                <label class="amount">1</label>
                <button class="button button-green" data-tooltip="add">+</button>
            </div>

            <div class="side-buttons">
                <button class="button button-buy" data-tooltip="buy">Куплено</button>
                <button class="button button-remove" data-tooltip="remove">✖</button>
            </div>`;

    addField.focus();
    //
    // let label = document.createElement('label');
    // label.setAttribute("contenteditable","true");
    // label.appendChild(fieldContent);
    //
    //
    // let midButtons = document.createElement("div");
    // midButtons.setAttribute("style","display: flex");
    //
    // let minusButton = document.createElement("button");
    // minusButton.classList.add("button");
    // minusButton.classList.add("button-red");
    // minusButton.classList.add("button-inactive");
    // minusButton.setAttribute("data-tooltip","minus");
    // minusButton.setAttribute("disabled", "");
    // minusButton.appendChild(document.createTextNode("–"));
    //
    // let amountLabel = document.createElement("label");
    // amountLabel.classList.add("amount");
    // amountLabel.appendChild(document.createTextNode("1"));
    //
    // let plusButton = document.createElement("button");
    // plusButton.classList.add("button");
    // plusButton.classList.add("button-green");
    // plusButton.setAttribute("data-tooltip","add");
    // plusButton.appendChild(document.createTextNode("+"));
    //
    // let sideButtons = document.createElement("div");
    // sideButtons.classList.add("side-buttons");
    // midButtons.setAttribute("style","display: flex");
    //
    // let buyButton = document.createElement("button");
    // buyButton.classList.add("button");
    // buyButton.classList.add("button-buy");
    // buyButton.setAttribute("data-tooltip","buy");
    // buyButton.appendChild(document.createTextNode("Куплено"));
    //
    // let removeButton = document.createElement("button");
    // removeButton.classList.add("button");
    // removeButton.classList.add("button-remove");
    // removeButton.setAttribute("data-tooltip","remove");
    // removeButton.appendChild(document.createTextNode("✖"));
    //
    // midButtons.appendChild(minusButton);
    // midButtons.appendChild(amountLabel);
    // midButtons.appendChild(plusButton);
    //
    // sideButtons.appendChild(buyButton);
    // sideButtons.appendChild(removeButton);
    //
    // element.appendChild(label);
    // element.appendChild(midButtons);
    // element.appendChild(sideButtons);

    document.body.querySelector(".input-list").appendChild(element);
}



// < section
// className = "in-list-product" >
//
//     < label
// contentEditable = "true" > Печиво < /label>
//
// <div style="display: flex">
//     <button className="button button-red" data-tooltip="minus">–</button>
//     <label className="amount">2</label>
//     <button className="button button-green" data-tooltip="add">+</button>
// </div>
//
// <div className="side-buttons">
//     <button className="button button-buy" data-tooltip="buy">Куплено</button>
//     <button className="button button-remove" data-tooltip="remove">✖</button>
// </div>
//
// </section>