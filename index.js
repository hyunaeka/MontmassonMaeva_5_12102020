// Selection de la classeou injecter le code

const article = document.querySelector(".article");

// Récupération des données serveurs

fetch("http://localhost:3000/api/teddies")
  .then((response) => {
    console.log("Data ok");
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status);
    }
  })

  .then((data) => {
    for (const element of data) {
      console.log(element);
    }

    // Récupération des données pour chaque élément (ours en peluche) + affichage des éléments

    for (i = 0; i < data.length; i++) {
        
      // Création de l'architecture

      let newDiv = document.createElement("div");
      let newProductImg = document.createElement("img");
      let newTitreCarte = document.createElement("h4");
      let newPriceCarte = document.createElement("p");
      let newButtonMore = document.createElement("a");
      let newButtonCart = document.createElement("a");
      let containerCard = document.createElement("div");
      let bodyCard = document.createElement("div");

      // Affichagedes données serveurs

      newTitreCarte.innerText = data[i].name;
      newPriceCarte.innerHTML = data[i].price / 100 + " €";
      newButtonCart.innerText = "Ajouter au Panier";
      newButtonMore.innerText = "Voir plus";

      // Mise en forme 

      article.appendChild(newDiv);
      newDiv.appendChild(containerCard);
      containerCard.appendChild(newProductImg);
      containerCard.appendChild(bodyCard);
      bodyCard.appendChild(newTitreCarte);
      bodyCard.appendChild(newPriceCarte);
      bodyCard.appendChild(newButtonMore);


      newDiv.setAttribute("class", "col-12 col-md-6 col-lg-4  mb-4");
      newProductImg.setAttribute("src", data[i].imageUrl);
      newButtonMore.setAttribute("href", "productpage.html?id=" + data[i]._id);
      newButtonCart.setAttribute("href", "panier.html");
      containerCard.setAttribute("class", "card h-100");
      newProductImg.setAttribute("class", "card-img-top ");
      bodyCard.setAttribute("class", "card-body");
      newTitreCarte.setAttribute("class", "card-title");
      newButtonMore.setAttribute("class", "btn btn-info");
      newPriceCarte.setAttribute("class", "card-text");
    }
  });
