//---------------------- Récupération des données dans le local storage ---------------

let saveCart = JSON.parse(localStorage.getItem("cart"));
            console.log(saveCart);

// ---------- Afficher le panier --------------


let cartArea = document.getElementById('cart-area');
const bodyCart = document.querySelector('.body-cart');


//-------------------  Récupération des données pour le panier et création de la structure  ---------------

if (saveCart == null){
    
   cartArea.innerHTML="Mon panier est vide";

} else {
    console.log("Des articles dans le panier")

    for (let j = 0; j < saveCart.length; j++) {

    let newDiv = document.createElement('ul')
    let newProductTitle = document.createElement('li')
    let newProductOption = document.createElement('li')
    let newProductPrice = document.createElement('span') 
    
    newProductTitle.innerHTML = saveCart[j].productName;
    newProductOption.innerHTML = " Couleur:  " + saveCart[j].productOption;
    newProductPrice.innerHTML = saveCart[j].prix + " €";

    newDiv.appendChild(newProductTitle);
    newProductTitle.appendChild(newProductOption);
    newProductTitle.appendChild(newProductPrice);
    bodyCart.appendChild(newDiv);

    newProductTitle.setAttribute("class","list-group-item d-flex justify-content-between align-items-center")
    newProductPrice.setAttribute("class","badge badge-pill badge-info")
    newProductOption.setAttribute("class","list-group-item")
    };


    
}

//  --------------    vider le panier ---------------


let newDiv = document.createElement('div');
let btnPosition = document.createElement('div');
let clearAllCartBtn = document.createElement('button');
clearAllCartBtn.innerText = "Vider le panier";

newDiv.appendChild(btnPosition);
btnPosition.appendChild(clearAllCartBtn);
bodyCart.appendChild(newDiv);
clearAllCartBtn.setAttribute("id", "clear-all-cart");
clearAllCartBtn.setAttribute("class","btn btn-info")
btnPosition.setAttribute("class","d-flex flex-row-reverse mb-3")


clearAllCartBtn.addEventListener('click', (e)=>{



    e.preventDefault;

    const clearAllCart = document.querySelector("#clear-all-cart");
    console.log(clearAllCart);

    localStorage.removeItem("cart");

    alert("Les produits ont bien été supprimé du panier");

    // Redirection vers la page panier( vidée )

    window.location.href ="panier.html";
})


// ------------- total du panier ------------


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

displayTotalPrice.setAttribute("class","d-flex flex-row-reverse list-group-item p-3")


// ---------------------------- formulaire javascript ---------------------------------

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
    return true;
    }else{
        document.querySelector("#lastname-verification").textContent = "*Saisissez votre Nom";
        console.log("ko")
        return false;
    }
    };

function addressControl(){
    const theAddress = address.value; 
    if(/^[A-Za-z0-9\s]{8,80}$/.test(theAddress)){


    document.querySelector("#address-verification").textContent = "";
    return true;
    }else{
        document.querySelector("#address-verification").textContent = "*Saisissez votre adresse";
        console.log("ko")
        return false;
    }
    };


function cityControl(){
    const theCity = city.value; 
    if(/^[A-Za-z]{2,20}$/.test(theCity)){
        
    document.querySelector("#city-verification").textContent = "";
    return true;
     }else{
        document.querySelector("#city-verification").textContent = "*Saisissez votre ville";
        console.log("ko")
        return false;
        }
        };

function zipCodeControl(){
    const theZipCode = zipcode.value; 
    if(/^[0-9]{5}$/.test(theZipCode)){
                
    document.querySelector("#zipcode-verification").textContent = "";
    return true;
     }else{
        document.querySelector("#zipcode-verification").textContent = "*Saisissez votre code postale";
        console.log("ko")
        return false;
        }
        };

 function emailControl(){
     const theEmail = email.value; 
     if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(theEmail)){
           
    document.querySelector("#email-verification").textContent = "";
    return true;
     }else{
        document.querySelector("#email-verification").textContent = "*Saisissez votre email";
        console.log("ko")
        return false;
        }
        };

if (firstNameControl() && lastNameControl() && cityControl() && zipCodeControl() && emailControl() && addressControl()){

    localStorage.setItem("Total",JSON.stringify(totalPrice));
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

        // Récupérer l'ID 

        localStorage.setItem("responseID", response.orderId);
        

                //Confirmation de la commande et redirection vers la page confirmation

                window.location = "confirmation.html";
                
        })



        .catch((e) => {
            console.log(e);
        })
} else {

    console.log("Données non envoyées au serveur");
}

//----------- données envoyées


});