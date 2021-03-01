const serchDrink = () => {
    const letter = document.getElementById("selectLetter").value;
    const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + letter;
    fetch(url, {
        method: "get"
    })
        .then(response => response.json())
        .then(
            data => {
                getInfo(data);
            }
        )
        .catch(error => {
            console.error(error);
        })
}

const getInfo = (data) => {
    const drink = data.drinks;
    const Information = [];

    drink.forEach(element => {
        the_ingredients = [];
        ingredients = [
            element.strIngredient1,
            element.strIngredient2,
            element.strIngredient3,
            element.strIngredient4,
            element.strIngredient5,
            element.strIngredient6,
            element.strIngredient7,
            element.strIngredient8,
            element.strIngredient9,
            element.strIngredient10,
            element.strIngredient11,
            element.strIngredient12,
            element.strIngredient13,
            element.strIngredient14,
            element.strIngredient15,
        ]
        ingredients.forEach(element => {
            if (element != null) {
                the_ingredients.push(element)
            }
        });
        information = {
            id: element.idDrink,
            nombre: element.strDrink,
            categoria: element.strCategory,
            imagen: element.strDrinkThumb,
            vaso: element.strGlass,
            tags: element.strTags,
            instrucciones: element.strInstructions,
            ingredientes: the_ingredients,
        }
        Information.push(information);
    });

    order(Information);
    console.log(Information)
    show_cards(Information)
}

const order = (Information) => {
    Information.sort(function (a, b) {
        if (a.nombre < b.nombre) {
            return -1;
        }
        if (a.nombre > b.nombre) {
            return 1;
        }
        return 0;
    });
}
const show_cards = (Information) => {
    let cards = "";
    Information.forEach(element => {
        cards = cards +
            `<div class="accordion col-md-4" id="accordionExample">
            <div class="card m-3">
              <div class="card-header" id="headingOne">
              <h2 class="card-body text-center">${element.nombre}</h2> 
              <img src="${element.imagen}"  class="card-img-top" alt="${element.id}">              
                  <button class="btn btn-link btn-block text-center" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <p class="mb-0"> ${element.categoria}</p>
                  </button>              
              </div>         
              <div id="collapseOne" class="show" aria-labelledby="headingOne" data-parent="#accordionExample">              
                <p class="card-body"><i class="fa fa-glass" aria-hidden="true"></i>&nbsp;${element.vaso}</p>  
                <p class="card-body"><i class="fa fa-list" aria-hidden="true"></i>&nbsp;${element.instrucciones}</p>
                <p class="card-body">${element.tags}</p>  
                <p class="card-body"><b>Ingredientes:</b> ${element.ingredientes}</p>                            
              </div>
            </div>
        </div>`;
    });
    document.getElementById("cardDetail").innerHTML = cards;
}