const menu = document.getElementById("menu")
const cartbtn = document.getElementById("cart-btn")
const cartmodal = document.getElementById("cart-modal")
const cartitens = document.getElementById("cart-items")
const carttotal = document.getElementById("cart-total")
const checkoutbtn = document.getElementById("checkout-btn")
const closemodalbtn = document.getElementById("close-modal-btn")
const cartcounter = document.getElementById("cart-count")
const addressinput = document.getElementById("address")
const addresswarn = document.getElementById("address-warn")

let cart =[];

// TENTATIVA 2 CARRINHO
cartbtn.addEventListener("click", function() {
    updateCartModal();
    cartmodal.style.display = "flex" 
})

//fechar modal
cartmodal.addEventListener("click", function(event){
    if(event.target === cartmodal){
        cartmodal.style.display = "none"
    }
})

//botão de fechar modal
closemodalbtn.addEventListener("click", function(){
    cartmodal.style.display = "none"
})

//add carrinho
menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-card-btn")
    
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
        
    }

})


//function add to cart
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
     existingItem.quantity += 1 
    
    }else{

    cart.push({
        name,
        price,
        quantity: 1,
    })

    }   

    updateCartModal()

}


// atualiza o carrinho
function updateCartModal(){
    cartitens.innerHTML = "";
    let total = 0; 

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity} </p>
                <p class="font-medium mt-2">${item.price.toFixed(2)} </p>
            </div>

            <button class="remove-btn" data-name="${item.name}">
                Remover
            </button>

        </div>
        `

        total += item.price * item.quantity

        cartitens.appendChild(cartItemElement)

    })


    carttotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });

    cartcounter.innerHTML = cart.length;

}



///remover item do carrinho
cartitens.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
          item.quantity -= 1;
          updateCartModal();
          return;
        }


        cart.splice(index, 1);
        updateCartModal(); 
         
    }

}


addressinput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressinput.classList.remove("border-red-500")
        addresswarn.classList.add("hidden")
    }
})

checkoutbtn.addEventListener("click", function(){

   // const isOpen = checkopen();
   // if(!isOpen){
   //     alert(" O RESTAURANTE ESTA FECHADO NO MOMENTO!!!")
   //     return;
   // }

    if(cart.length === 0) return;
    if(addressinput.value === ""){
        addresswarn.classList.remove("hidden")   
        addressinput.classList.add("border-red-500")
    }

    const cartItems = cart.map((item) => {
        return(
            `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "4991947122"

    window.open(`https://wa.me/${phone}?text=${message} endereço: ${addressinput.value}`, "_blank")

    cart = [];
    updateCartModal();
})

// verificar horario
function checkopen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("data-span")
const isOpen = checkopen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}