let productArray = ["печиво","помідори","сир"]; // помідори
let tempNameLabel = "";
const addField = document.querySelector(".search-field");
const addButton = document.querySelector(".button-add");

function renameProduct(modifiedLabel, modifiedValue) {
    let temp = [];
    for (let i = 0; i < productArray.length; i++) {
        if (productArray[i] !== tempNameLabel.toLowerCase()) {
            temp.push(productArray[i]);
        }
    }
    modifiedValue = modifiedValue.trim().toLowerCase();
    productArray = temp;
    productArray.push(modifiedValue); // pushing new name in array
    modifiedValue = modifiedValue.charAt(0).toUpperCase() + modifiedValue.slice(1) + " "; // modifying name


    let statisticElement = getStatisticElement(tempNameLabel);
    let amount = statisticElement.children[0];

    modifiedLabel.textContent = modifiedValue.slice(0,-1);
    statisticElement.textContent = modifiedValue;
    statisticElement.appendChild(amount);

}
document.addEventListener('click', event => {
    let element = event.target;

    if (element.tagName === 'BUTTON') {
        if (element.className === "button button-red") {
            let text;
            let next = element.nextSibling;
            if (next.className === "amount") {
                text = next.textContent--;
            } else {
                next = element.nextSibling.nextSibling;
                text = next.textContent--;
            }

            const name = element.parentElement.parentElement.children[0].textContent;
            const statisticElement = getStatisticElement(name);
            statisticElement.children[0].textContent = next.textContent;

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

            const name = element.parentElement.parentElement.children[0].textContent;
            const statisticElement = getStatisticElement(name);
            statisticElement.children[0].textContent = next.textContent;

            if (text == '1') {
                if (!minusButton.classList.contains("button")) {
                    minusButton = minusButton.previousSibling.previousSibling;
                }
                makeButtonActive(minusButton);
            }
        } else if (element.className === "button button-remove") {       // TODO REMOVE BUTTON
            productArray = deleteElementFromArray(element);

            const name = element.parentElement.parentElement.children[0].textContent;
            const statisticElement = getStatisticElement(name);
            statisticElement.remove();
            console.log(name);
            element.parentElement.parentElement.remove();

        } else if (element.className === "button button-buy") {          // TODO BUY BUTTON

            let section = element.parentElement.parentElement;

            const name = element.parentElement.parentElement.children[0].textContent;
            let statisticElement;

            if (section.classList.contains("in-list-product")) {
                section.classList.remove("in-list-product");
                section.classList.add("bought-product");
                element.textContent = "Не куплено";

                statisticElement = getStatisticElement(name);
                statisticElement.remove();
                document.querySelector(".buy-list").children[3].appendChild(statisticElement);
            } else {
                console.log(name);
                section.classList.remove("bought-product");
                section.classList.add("in-list-product");
                element.textContent = "Куплено";

                statisticElement = getStatisticElement(name,3);
                statisticElement.remove();
                document.querySelector(".buy-list").children[1].appendChild(statisticElement);
                // let section = document.querySelector(".buy-list").children[1];
                // section.appendChild(statisticElement);
            }
        }
    } else if (element.tagName === 'LABEL') {
        const focusedLabel = event.target;
        tempNameLabel = focusedLabel.textContent;
        // Perform actions when the label receives focus
        console.log('Focused Label:', tempNameLabel);
    }
});

document.addEventListener("focusout", event => {
    let element = event.target;
    if (element.tagName === 'LABEL') {

        let modifiedValue = element.textContent;

        // renameProduct(modifiedLabel, modifiedValue);
        if (modifiedValue.localeCompare(tempNameLabel)) {
            renameProduct(element, modifiedValue);
        }
        // Perform actions with the modified label value
        console.log('Modified Label:', modifiedValue);
    }
})


/**
 * Remove statistic element by specified name
 * @param name of element to remove
 * @param sectionIndex
 */
function getStatisticElement(name, sectionIndex = 1) {
    const section = document.querySelector(".buy-list").children[sectionIndex];
    for (let i = 0; i < section.children.length; i++) {
        let numberLength = section.children[i].children[0].textContent.length;
        let temp = section.children[i].textContent.slice(0,-1-numberLength);   // removing last 2 chars of amount (getting a name)
        console.log(temp); // getting a number
        if (temp === name) {
            return section.children[i];
        }
    }
}
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

    string = string.charAt(0).toUpperCase() + string.slice(1) + " ";
    addField.value = "";
    let element = document.createElement("span");
    //element.setAttribute("margin-left","5px");
    element.classList.add("product-item");


    element.appendChild(document.createTextNode(string));

    let counter = document.createElement("span");
    counter.classList.add("amount");
    counter.appendChild(document.createTextNode("1"));

    element.appendChild(counter);

    document.querySelector(".buy-list").children[1].appendChild(element);

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

    document.body.querySelector(".input-list").appendChild(element);
}

