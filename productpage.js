// Récupération de l'ID produit via l'URL avec la méthode queryString

const queryString_url_id = window.location.search;
console.log(queryString_url_id); 

const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

// Récupération des données serveur pour afficher les données du produit sur la page

fetch('http://localhost:3000/api/teddies/'+ id)
    .then(response => { 
        console.log("Data produit ok") 
        if (response.ok) {
            return response.json();
        } else { return Promise.reject(response.status);
        }})

    .then(data => {
        console.log(data);

// Création de la fiche produit 

        const article = document.querySelector('.article-produit')   

        let newDiv = document.createElement('div');
        let newProductImg = document.createElement("img")
        let newTitreCarte = document.createElement('h2');
        let newPriceCarte = document.createElement('h3');
        let newDescription = document.createElement('p');
        let newButtonCart = document.createElement('button');
        let selectOption = document.createElement("select");
        
        

        newTitreCarte.innerText = data.name;
        newPriceCarte.innerHTML = data.price/100 + " €";
        newButtonCart.innerText = "Ajouter au Panier";
        newDescription.innerText = data.description;
        

        newDiv.appendChild(newTitreCarte);
        newDiv.appendChild(newPriceCarte);
        newDiv.appendChild(newProductImg);
        newDiv.appendChild(newDescription);
        newDiv.appendChild(selectOption);
        newDiv.appendChild(newButtonCart);
        article.appendChild(newDiv);

        newProductImg.setAttribute("src", data.imageUrl);
        selectOption.setAttribute("label", "option_product");
        selectOption.setAttribute("id", "color");
        newButtonCart.setAttribute("id", "cart_btn")
        newButtonCart.setAttribute("type", "submit")
        newButtonCart.setAttribute("name", "cart_btn")


// Mise en place des options en récupérant les données serveurs

        
        let newOption = data.colors;
        console.log(newOption);

        for( i = 0; i < newOption.length; i++ ) { 

                let option = newOption[i];

            selectOption.innerHTML += "<option value="+ newOption[i] + ">" + option + "</option>";

        }    

                 //---------------------- Gestion données du panier --------------------------

//récupération des données - selection de l'id formulaire et de l'option 

        const idSelect = document.querySelector("#color")
        console.log(idSelect);

        const submitCart = document.querySelector("#cart_btn");
        console.log(submitCart);


// Envoie vers le panier des données de l'article et création de l'événement 

        submitCart.addEventListener("click", (e)=>{

            e.preventDefault();

        const customerChoice = idSelect.value;

            let ProductChoice = { 

                productName: data.name,
                productSelect: data._id,
                productOption: customerChoice,
                productQuantite: 1,
                productImg: data.imageUrl,
                prix: data.price/100
            }
            console.log(ProductChoice);

//Variable pour récupérer les clés et valeurs dans le local storage

             let saveCart = JSON.parse(localStorage.getItem("cart"));

// Création de la Fonction pour ajouter les données de la variable SaveCart dans localStorage 

const localStorageFonction = () => {     

    saveCart.push(ProductChoice);
    localStorage.setItem("cart",JSON.stringify(saveCart));

}

//Condition pour enregistrer les produits dans le local storage : if ( s'il y a un produit enregistré dans le local storage)

            if(saveCart){

            localStorageFonction();

            }
// Else ( s'il n'y a pas de produit d'enregistré dans le local storage )
            else {

                saveCart=[];
                localStorageFonction();

            } 
        })

    })






