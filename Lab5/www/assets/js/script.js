import { pizza_info } from "../../../src/Pizza_List.js";

const pizzaList = document.getElementById("pizza-list");
const pizzaCart = document.getElementsByClassName("order-list")[0];
const filterLabel = document.getElementById("filter");
let displayedPizzas = [];
let orderList = [];
let currIndex = 0;
console.log(pizzaList);
console.log(pizza_info);
pizza_info.forEach(drawPizza);
function drawPizza(pizzaData) {
    let buyOptions = ``;

    if (pizzaData.small_size !== undefined) {
        buyOptions += `<div>
                        <div class="pizza-parameter"><img src="assets/images/size-icon.svg"/>${pizzaData.small_size.size}
                        </div>
                        <div class="pizza-parameter"><img src="assets/images/weight.svg"/>${pizzaData.small_size.weight}
                        </div>
                        <div class="pizza-price">
                        ${pizzaData.small_size.price}
                        <p>грн.</p>
                        </div>
                        <button id="${currIndex}">Купити</button>
                       </div>
                    `;
    }
    if (pizzaData.big_size !== undefined) {
        buyOptions += `<div>
                        <div class="pizza-parameter"><img src="assets/images/size-icon.svg"/>${pizzaData.big_size.size}
                        </div>
                        <div class="pizza-parameter"><img src="assets/images/weight.svg"/>${pizzaData.big_size.weight}
                        </div>
                        <div class="pizza-price">
                        ${pizzaData.big_size.price}
                        <p>грн.</p>
                        </div>
                        <button>Купити</button>
                       </div>
                    `;
    }

    let labels = "";
    if (pizzaData.is_new) {
        labels += `<label style="color: white; border-radius: 5px; background-color: #cc3a33; font-size: 1.7rem; padding-right: 10px; padding-left: 10px; padding-top: 3px; height: 30px;
                            box-sizing: border-box">Нова</label>`;
    }
    if (pizzaData.is_popular) {
        labels += `<label style="color: white; border-radius: 5px; background-color: #49a649; font-size: 1.7rem; padding-right: 10px; padding-left: 10px; padding-top: 3px; margin-left: 5px">Популярна</label>`;
    }
    let upperLabel = `<div style="position: relative">
                        <div style="position: absolute; top: -15px; right: -15px; display: flex; justify-content: flex-end;">
                           ${labels}                          
                        </div>
                       </div>`;

    let pizza = `<div class="col-sm-6 col-md-4 resize">
                    <div class="thumbnail pizza-card">
                        ${upperLabel}
                        <img src=${pizzaData.icon}>
                        <div class="caption"><h3>${pizzaData.title}</h3>
                            <p class="description">${pizzaData.type}</p>
                            <p class="content">${getPizzaContent(pizzaData.content)}</p>
    
                            <div class="buy-options">
                                ${buyOptions}
                            </div>
                        </div>
                    </div>
                </div>`;
    pizzaList.innerHTML += pizza;
   // pizzaList.appendChild(pizza);
    console.log(pizza);
}

function getPizzaContent(pizzaContent) {
    let allContent = [].concat(...Object.values(pizzaContent));

    console.log(allContent);
    return allContent.join(", ");
}

function drawPizzaCart(pizza) {
    let label;
    let size;
    let weight;
    let price;

    if (pizza.isSmallSize) {
        label = pizza.pizzaInfo.title + " (Мала)" ;
        size = pizza.pizzaInfo.small_size.size ;
        weight = pizza.pizzaInfo.small_size.weight ;
        price = pizza.pizzaInfo.small_size.price * pizza.amount;
    } else {
        label = pizza.pizzaInfo.title + " (Велика)" ;
        size = pizza.pizzaInfo.big_size.size ;
        weight = pizza.pizzaInfo.big_size.weight ;
        price = pizza.pizzaInfo.big_size.price * pizza.amount;
    }

    const order = `<div class="order-item">
                    <div class="item-info">
                        <label>${label}
                        </label>
                        <div>
                            <img src="assets/images/size-icon.svg"/>${size}
                            <img src="assets/images/weight.svg"/>${weight}
                        </div>
                        <div>
                            <h4>${price} грн</h4>
                            <button class="button-red">–</button>
                            <label class="counter">${pizza.amount}</label>
                            <button class="button-green">+</button>
                            <button class="remove-button">✖</button>
                        </div>
                    </div>
                    <div class="item-image">
                        <img src="${pizza.pizzaInfo.icon}"/>
                    </div>
                </div>`

    pizzaCart.innerHTML += order;
}

pizzaList.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        const pizzaName = event.target.parentElement.parentElement.parentElement.children[0].innerText;
        const pizzaRadius = event.target.parentElement.children[0].innerText;
        // console.log(pizzaRadius);
        const pizzaInfo = pizza_info.find(pizza => pizza.title === pizzaName);
        // console.log(pizzaInfo);
        addPizzaDataToCart(pizzaInfo,pizzaRadius);

    }
})

function createPizzaDataObj(pizzaInfo, pizzaRadius) {
    let isSmallSize = false;
    let isBigSize = false;
    let amount = 1;
  //  let amountBig = 0;

    if (pizzaInfo.small_size !== undefined && pizzaInfo.small_size.size == pizzaRadius) {
        isSmallSize = true;
    }
    // if (pizzaInfo.big_size !== undefined && pizzaInfo.big_size.size == pizzaRadius) {
    //     isBigSize = true;
    //     amountBig++;
    // }

    return {pizzaInfo, isSmallSize, amount};
}

function addPizzaDataToCart(pizzaInfo, pizzaRadius) {
    const pizzaDataObj = createPizzaDataObj(pizzaInfo, pizzaRadius);
    console.log(pizzaDataObj);

    const pizzaInList = orderList.find(pizzaInfo => pizzaInfo.pizzaInfo.title === pizzaDataObj.pizzaInfo.title && pizzaInfo.isSmallSize === pizzaDataObj.isSmallSize);

    // console.log(pizzaInList === undefined);
    if (pizzaInList) {
        // if (pizzaInList.pizzaInfo.caption === pizzaDataObj.pizzaInfo.caption) {
        //     if (pizzaInList.isSmallSize && pizzaDataObj.isSmallSize) {
        //         pizzaInList.amountSmall++;
        //     } else if (pizzaInList.isBigSize && pizzaDataObj.isBigSize) {
        //         pizzaInList.amountBig++;
        //     } else if (pizzaInList.isSmallSize && pizzaDataObj.isBigSize) {
        //         pizzaInList.isBigSize = true;
        //         pizzaInList.amountBig++;
        //     } else {
        //         pizzaInList.isSmallSize = true;
        //         pizzaInList.amountSmall++;
        //     }
        // }
        pizzaInList.amount++;
    } else {
         orderList.push(pizzaDataObj);
    }

    console.log(orderList);
    pizzaCart.innerHTML = "";
    orderList.forEach(drawPizzaCart);
}


function getPizzaInfo(name) {
    const pizzaWeight = element.closest(".pizza-parameter");
    console.log(pizzaWeight.innerHTML);
}

document.getElementById("all-pizzas").addEventListener("click", drawAllPizza);
document.getElementById("meat-pizza").addEventListener("click", drawMeatPizza);
document.getElementById("pineapple-pizza").addEventListener("click", drawPineapplePizza);
document.getElementById("mushroom-pizza").addEventListener("click", drawMushroomPizza);
document.getElementById("sea-pizza").addEventListener("click", drawSeaPizza);
document.getElementById("vegan-pizza").addEventListener("click", drawVeganPizza);

function drawPizzaWithFilter(pizzaFilter, filterName) {
    document.querySelector(".active-filter").classList.remove("active-filter");

    pizzaList.innerHTML = "";
    const pizzas = pizza_info.filter(pizzaFilter);

    filterLabel.innerHTML = `${filterName} <span class="filter-amount" id="amount_in_filter">${pizzas.length}</span>`;

    pizzas.forEach(drawPizza);
}
function drawAllPizza() {
    document.querySelector(".active-filter").classList.remove("active-filter");
    pizzaList.innerHTML = "";
    filterLabel.innerHTML = `Усі піци <span class="filter-amount" id="amount_in_filter">${pizza_info.length}</span>`;
    pizza_info.forEach(drawPizza);
    this.classList.add("active-filter");
}
function drawMeatPizza() {
    drawPizzaWithFilter(pizza => pizza.content.meat !== undefined, "М'ясні");
    this.classList.add("active-filter");
}

function drawPineapplePizza() {
    drawPizzaWithFilter(pizza => pizza.content.pineapple !== undefined, "З ананасом");
    this.classList.add("active-filter");
}
function drawMushroomPizza() {
    drawPizzaWithFilter(pizza => pizza.content.mushroom !== undefined, "З грибами");
    this.classList.add("active-filter");
}

function drawSeaPizza() {
    drawPizzaWithFilter(pizza => pizza.content.ocean !== undefined, "З морепродуктами");
    this.classList.add("active-filter");
}

function drawVeganPizza() {
    drawPizzaWithFilter(pizza => pizza.content.ocean === undefined && pizza.content.meat === undefined
                                                                            && pizza.content.chicken === undefined, "Вега");
    this.classList.add("active-filter");
}


