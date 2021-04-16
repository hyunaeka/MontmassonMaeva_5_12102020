/*fetch('https://ab-p5-api.herokuapp.com/api/teddies')
    .then(response => { 
        console.log("Data ok") 
        if (response.ok) {
            return response.json();
        } else { return Promise.reject(response.status);
        }})
        .then(data => console.log(data));
*/


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
        let newButtonCart = document.createElement('a');
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
        selectOption.setAttribute("id", "option_product");

//Mise en place des options


        
        let newOption = data.colors;

        console.log(newOption);


        for( i = 0; i < data.length; i++ ) { 

            let option = data.colors;

            //selectOption.innerHTML = "<option value="+ data + ">" + option + "</option>";
        }    



    })

