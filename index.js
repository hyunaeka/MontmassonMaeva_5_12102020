const article = document.querySelector('.article');

// url http://localhost:3000/api/teddies  https://ab-p5-api.herokuapp.com/api/teddies

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
    

    for( i = 0; i < data.length; i++ ) {

        let newDiv = document.createElement('div');
        let newProductImg = document.createElement("img")
        let newTitreCarte = document.createElement('h2');
        let newPriceCarte = document.createElement('h3');
        let newButtonMore = document.createElement('a');
        let newButtonCart = document.createElement('a');

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

    }
})



//        let newId = [data[i]._id];
//console.log(newId);