import { pizza_info } from "../../../src/Pizza_List.js";

const pizzaList = document.getElementById("pizza-list");

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
                        <button>Купити</button>
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