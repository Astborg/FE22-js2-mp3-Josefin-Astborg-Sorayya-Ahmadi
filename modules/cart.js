let products = [
  {
      id: 0,
      namn: 'Sneaker1',
      img: '1product',
      pris: 1500,
      lager: 10,
      inCart: 0
  },
  {
      id: 1,
      namn: 'Sneaker2',
      img: '2product',
      pris: 1500,
      lager: 10,
      inCart: 0
  },
  {
      id: 2,
      namn: 'Sneaker3',
      img: '3product',
      pris: 1500,
      lager: 10,
      inCart: 0
  },
  {
      id: 3,
      namn: 'Sneaker4',
      img: '4products',
      pris: 1500,
      lager: 10,
      inCart: 0
  },
  {
      id: 4,
      namn: 'Sneaker5',
      img: '5product',
      pris: 1500,
      lager: 10,
      inCart: 0
  }
]
function displayCart(){
let cartItems = localStorage.getItem('productsInCart')
cartItems = JSON.parse(cartItems)
let productGrid = document.querySelector('.grid')
let cartCost = localStorage.getItem('totalCost')
if(cartItems && productGrid){
  productGrid.innerHTML = ''
  Object.values(cartItems).map(item =>{
    productGrid.innerHTML += `
    <div class="product">
    <span>Produkt: ${item.namn}
    <div class="price">Pris: ${item.pris}kr</div>
    <div class="quantity">Antal: ${item.inCart}</div>
    <div class="total">Totalt: ${item.inCart * item.pris}kr</div>`
  })
  productGrid.innerHTML += 
  `<div class="cartTotal">Cart Total:${cartCost}</div>`
  productGrid.innerHTML += `<button onclick="emptyCart()">Empty cart</button>`
  productGrid.innerHTML += `<button onclick="checkout(id)">Checkout</button>`

  
}
}
function emptyCart(){
  let productGrid = document.querySelector('.grid')
  productGrid.innerHTML = ''
}

displayCart()



    //checkout
    function checkout(id){
            let cartItemsObj = localStorage.getItem('productsInCart')
            let garbo = JSON.parse(cartItemsObj)
            console.log(garbo)
            let index = ''
            let cartArray = Object.values(garbo)
            console.log(cartArray )
            let arrayIndex = Object.keys(garbo)
            
            index = cartArray.map(function(item){
                  item.id
              //console.log('DATA OBJ ID', index)
              
            })
            
           
          
            
      
      async function patchPost(obj){
        
        console.log(arrayIndex)
        const baseURL = `https://webstore-22fa4-default-rtdb.europe-west1.firebasedatabase.app/`
        const url = baseURL + `Products/${index}.json`
            const init = {
                method: 'PATCH',
                body: JSON.stringify({obj}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            };
        
            const response = await fetch(url, init)
            const data = await response.json()
            console.log(data)
            
        }
        
          let object = cartArray.map(item =>{
            
          let newLager = item.lager - item.inCart
          console.log(newLager)
          if(item.id !== id){
           
          }
            return{
              
              lager: newLager
            }
          
        }) 
     
        // let obj = cartArray.reduce(function(acc, cur, ndex) {
        //   acc[ndex] = cur;
        //   return acc[ndex];
        // }, {});
    
        patchPost(object)
        console.log(object)
       
        
      }