let result = document.getElementById("result");
let searchBtn = document.getElementById("searchBtn");
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let getInfo = () => {
    let userInp = document.getElementById("userInp").value;
    if (userInp.length == 0) {
        document.querySelector('.inputs').style.display = "none";
        document.querySelector('.container > p').style.display = "none";
        result.innerHTML = `
        <h3 class="msg">The input field cannot be empty</h3>
        <button onclick="location.reload()">Search Again</button>
        `;
    } else {
        fetch(url + userInp)
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("userInp").value = "";
                document.querySelector('.inputs').style.display = "none";
                document.querySelector('.container > p').style.display = "none";
                document.querySelector('.container > h1').style.marginBottom = "10px";
                console.log(data);
                console.log(data.drinks[0]);
                let myDrink = data.drinks[0];
                console.log(myDrink.strDrink);
                console.log(myDrink.strDrinkThumb);
                console.log(myDrink.strInstructions);
                let count = 1;
                let ingredients = [];
                for (let i in myDrink) {
                    let ingredient = "";
                    let measure = "";
                    if (i.startsWith("strIngredient") && myDrink[i]) {
                        ingredient = myDrink[i];
                        if (myDrink[`strMeasure` + count]) {
                            measure = myDrink[`strMeasure` + count];
                        } else {
                            measure = "";
                        }
                        count += 1;
                        ingredients.push(`${measure} ${ingredient}`);
                    }
                }
                console.log(ingredients);
                result.innerHTML = `
                    <img src=${myDrink.strDrinkThumb}>
                    <h2>${myDrink.strDrink}</h2>
                    <h3>Ingredients:</h3>
                    <ul class="ingredients"></ul>
                    <h3>Instructions:</h3>
                    <p>${myDrink.strInstructions}</p>
                    <button onclick="location.reload()">Search Again</button>
                `;
                let ingredientsCon = document.querySelector(".ingredients");
                ingredients.forEach((item) => {
                    let listItem = document.createElement("li");
                    listItem.innerText = item;
                    ingredientsCon.appendChild(listItem);
                });
            })
            .catch(() => {
                result.innerHTML = `
                <h3 class="msg">Please enter a valid input</h3>
                <button onclick="location.reload()">Search Again</button>
                `;
            });
    }
};

searchBtn.addEventListener("click", getInfo);