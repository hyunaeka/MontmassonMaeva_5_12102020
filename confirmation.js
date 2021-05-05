// Récupération de l'ID du serveur

const orderID = localStorage.getItem("responseID");
console.log("orderID");
console.log(orderID);

//Affichage du numéro de commande
document.querySelector("#order-id").textContent = orderID;

// Récupération du prix total de la commande

const TotalOrderPrice = localStorage.getItem("Total");
console.log(TotalOrderPrice);

document.querySelector("#order-total").textContent = TotalOrderPrice + "€";

// Vide le localStorage 

function resetItems(key){
    localStorage.removeItem(key);

};
resetItems("cart");
resetItems("Total");
resetItems("responseID");

