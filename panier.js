
let saveCart = JSON.parse(localStorage.getItem("cart"));
            console.log(saveCart);

// Afficher le panier 


let cartArea = document.getElementById('cart-area');
const bodyCart = document.querySelector('.body-cart');


//Récupération des données pour le panier et création de la structure

if (saveCart === null){
    
   cartArea.innerHTML="Mon panier est vide";

} else {
    console.log("Des articles dans le panier")

    for (let j = 0; j < saveCart.length; j++) {

    let newDiv = document.createElement('div')
    let newProductTitle = document.createElement('p')
    let newProductOption = document.createElement('p')
    let newProductPrice = document.createElement('p')
    let clearCart = document.createElement('button')
    let newProductImg = document.createElement('img')
    
    
    newProductTitle.innerHTML = saveCart[j].productName;
    newProductOption.innerHTML = " Couleur:  " + saveCart[j].productOption;
    newProductPrice.innerHTML = saveCart[j].prix + " €";
    clearCart.innerText = "x" ;

    newDiv.appendChild(newProductImg);
    newDiv.appendChild(newProductTitle);
    newDiv.appendChild(newProductOption);
    newDiv.appendChild(newProductPrice);
    newDiv.appendChild(clearCart);
    bodyCart.appendChild(newDiv);


    newProductImg.setAttribute("src", saveCart[j].productImg);
    clearCart.setAttribute("class", "clear-button")
    };


    
}

// vider le panier


let newDiv = document.createElement('div');
let clearAllCartBtn = document.createElement('button');
clearAllCartBtn.innerText = "Vider le panier";
newDiv.appendChild(clearAllCartBtn);
bodyCart.appendChild(newDiv);
clearAllCartBtn.setAttribute("id", "clear-all-cart");





clearAllCartBtn.addEventListener('click', (e)=>{



    e.preventDefault;

    const clearAllCart = document.querySelector("#clear-all-cart");
    console.log(clearAllCart);

    localStorage.removeItem("cart");

    alert("Les produits ont bien été supprimé du panier");

    window.location.href ="panier.html";
})


//Panier total 


let totalPriceInCart = []

for ( let k = 0; k < saveCart.length; k++){

    let priceProductInCart = saveCart[k].prix;

// Push dans le panier 

totalPriceInCart.push(priceProductInCart)
    console.log(totalPriceInCart)
}

//total calculé 

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceInCart.reduce(reducer,0);
console.log(totalPrice);

let displayTotalPrice = document.createElement('p');
displayTotalPrice.innerText = "Total : " + totalPrice + " €";
newDiv.appendChild(displayTotalPrice);
bodyCart.appendChild(newDiv);


//formulaire javascript 

const form = document.getElementById('customerform');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const address = document.getElementById('address');
const zipcode = document.getElementById('zipcode');
const city = document.getElementById('city');
const btnSendForm = document.querySelector("#send-form");
console.log(btnSendForm);

//  --- envoyer les données du formulaire 

btnSendForm.addEventListener("click", (e)=>{

e.preventDefault();

let idProductSaveCart = []

for ( let l = 0; l < saveCart.length; l++){

    let arrayIdProduct = saveCart[l].productSelect; 

    idProductSaveCart.push(arrayIdProduct)
}


let  order = {

    contact : {

        firstName: firstname.value,
        lastName: lastname.value,
        address: address.value,
        city: city.value,
        email: email.value,

    },
    products : idProductSaveCart
    
};

console.log(JSON.stringify(order));

// ------- contrôle du formulaire --------


function firstNameControl(){
const theFirstName = firstname.value; 
if(/^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$/.test(theFirstName)){

document.querySelector("#firstname-verification").textContent = "";
console.log("ok");
return true;
}else{
    document.querySelector("#firstname-verification").textContent = "*Saisissez votre prénom";
    console.log("ko")
    return false;
}
};

function lastNameControl(){
    const theLastName = lastname.value; 
    if(/^[A-Za-z]{2,20}$/.test(theLastName)){

    document.querySelector("#lastname-verification").textContent = "";
    console.log("ok");
    return true;
    }else{
        document.querySelector("#lastname-verification").textContent = "*Saisissez votre Nom";
        alert("le nom ne marche pas !")
        console.log("ko")
        return false;
    }
    };

function addressControl(){
    const theAddress = address.value; 
    if(/^[A-Za-z0-9\s]{8,80}$/.test(theAddress)){


    document.querySelector("#address-verification").textContent = "";
    console.log("ok");
    return true;
    }else{
        document.querySelector("#address-verification").textContent = "*Saisissez votre adresse";
        alert("l'adresse ne marche pas")
        console.log("ko")
        return false;
    }
    };


function cityControl(){
    const theCity = city.value; 
    if(/^[A-Za-z]{2,20}$/.test(theCity)){
        
    document.querySelector("#city-verification").textContent = "";
    console.log("ok");
    return true;
     }else{
        document.querySelector("#city-verification").textContent = "*Saisissez votre ville";
        alert("la ville ne marche pas !")
        console.log("ko")
        return false;
        }
        };

function zipCodeControl(){
    const theZipCode = zipcode.value; 
    if(/^[0-9]{5}$/.test(theZipCode)){
                
    document.querySelector("#zipcode-verification").textContent = "";
    console.log("ok");
    return true;
     }else{
        document.querySelector("#zipcode-verification").textContent = "*Saisissez votre code postale";
        alert("le code postale ne marche pas !")
        console.log("ko")
        return false;
        }
        };

 function emailControl(){
     const theEmail = email.value; 
     if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(theEmail)){
           
    document.querySelector("#email-verification").textContent = "";
    console.log("ok");
    return true;
     }else{
        document.querySelector("#email-verification").textContent = "*Saisissez votre email";
        alert("l'email ne marche pas' !")
        console.log("ko")
        return false;
        }
        };

if (firstNameControl() && lastNameControl() && cityControl() && zipCodeControl() && emailControl() && addressControl()){

    localStorage.setItem("contact", JSON.stringify(order));
    let sendToServer =   fetch("http://localhost:3000/api/teddies/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(order),
        })
        .then(response => response.json())
        .then(response => {
            
            console.log(response.orderId + " ORDER ID");
        })
} else {

    console.log("Données non envoyées au serveur");
}

//----------- données envoyées

 /*let sendToServer =   fetch("http://localhost:3000/api/teddies/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(order),
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
    */




});





// local storage 

/*localStorage.setItem("contact", JSON.stringify(order));
localStorage.setItem("product", JSON.stringify(idProductSaveCart))


console.log(JSON.stringify(sendToServer));
postOrder(JSON.stringify(sendToServer));*/

// envoyer au serveur 
