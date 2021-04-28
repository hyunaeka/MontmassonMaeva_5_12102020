// Selection de la classeou injecter le code

const article = document.querySelector('.article');

// Récupération des données serveurs

fetch('http://localhost:3000/api/teddies')
    .then(response => { 
        console.log("Data ok") 
        if (response.ok) {
            return response.json();
        } else { return Promise.reject(response.status);
        }})

.then(data => {


    for (const element of data) {
        console.log(element);}
    
// Récupération des données pour chaque élément (ours en peluche) + affichage des éléments

    for( i = 0; i < data.length; i++ ) {


        // Création de l'architecture

        let newDiv = document.createElement('div');
        let newProductImg = document.createElement("img")
        let newTitreCarte = document.createElement('h2');
        let newPriceCarte = document.createElement('h3');
        let newButtonMore = document.createElement('a');
        let newButtonCart = document.createElement('a');

        // Affichagedes données serveurs

        newTitreCarte.innerText = data[i].name;
        newPriceCarte.innerHTML = data[i].price/100 + " €";
        newButtonCart.innerText = "Ajouter au Panier";
        newButtonMore.innerText = "Voir plus";
        

        newDiv.appendChild(newTitreCarte);
        newDiv.appendChild(newPriceCarte);
        newDiv.appendChild(newProductImg);
        newDiv.appendChild(newButtonCart);
        newDiv.appendChild(newButtonMore);
        article.appendChild(newDiv);

        newProductImg.setAttribute("src", data[i].imageUrl);
        newButtonMore.setAttribute("href", "productpage.html?id=" + data[i]._id);
        newButtonCart.setAttribute("href", "panier.html");

    }
})
