//hämta från firebase render in DOM
const wrapper = document.querySelector('.grid')
let lager = 10
let productsArray = []
let datavar = ''
async function getProducts(){
  try{
    const baseURL = 'https://webstore-22fa4-default-rtdb.europe-west1.firebasedatabase.app/'
    const url = baseURL + 'Products.json'
    const response = await fetch(url)
    let data = await response.json()
    console.log(data)
    productsArray.push(data)
    datavar = Object.keys(data)
    
  }catch(error){
    console.log(error)
  }
  

  }

getProducts()


let cartNr = document.getElementById('cartNr')
const lang1 = document.querySelector('.lang1')
cartNr = 1

let products = [
    {
        id: 0,
        namn: 'Sneaker1',
        img: 0,
        pris: 1500,
        lager: 10,
        inCart: 0
    },
    {
        id: 1,
        namn: 'Sneaker2',
        img: 1,
        pris: 1500,
        lager: 10,
        inCart: 0
    },
    {
        id: 2,
        namn: 'Sneaker3',
        img: 2,
        pris: 1500,
        lager: 10,
        inCart: 0
    },
    {
        id: 3,
        namn: 'Sneaker4',
        img: 3,
        pris: 1500,
        lager: 10,
        inCart: 0
    },
    {
        id: 4,
        namn: 'Sneaker5',
        img: 4,
        pris: 1500,
        lager: 10,
        inCart: 0
    }
]

const euro = document.querySelectorAll('.euro')


for(let i = 0; i < euro.length; i++ ){
    euro[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalCost(products[i])
        
         if(products[i].inCart >= 10){
            euro[i].disabled = true
        }
           
        
        
        
       
    })
}

    
         


  function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers')
    if(productNumbers){
        lang1.innerHTML = `<div id="cartNr">${cartNr = productNumbers}</div>`
    }

}

  function cartNumbers(product){
    console.log('the product clicked is', product)
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1)
        lang1.innerHTML = `<div id="cartNr">${cartNr = productNumbers +1}</div>`
    }
    else {
        localStorage.setItem('cartNumbers', 1 )
        lang1.innerHTML = `<div id="cartNr">${cartNr = 1}</div>`
    }
   
    setItems(product)
    
  }

  

  function setItems(product){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    console.log(cartItems) //funkar
    if(cartItems != null){
        if(cartItems[product.img] == undefined){
            cartItems = {
                ...cartItems,
                [product.img]: product
            }
            console.log(cartItems)
        }else {
        cartItems[product.img].inCart += 1
        console.log(cartItems) //funkar
        }
    }
    else{
        product.inCart = 1
        cartItems = {
            [product.img]: product
    }
    console.log(cartItems)//funkar
  
    }
    
    localStorage.setItem('productsInCart',JSON.stringify(cartItems))
    console.log(localStorage.getItem('productsInCart'))
}

  function totalCost(product){
    let cartCost = localStorage.getItem('totalCost')
    if(cartCost != null){
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost + product.pris)
    }
    else{
        localStorage.setItem('totalCost', product.pris)
    }
    
  }

  async function patchPost(obj){
    const baseURL = `https://webstore-22fa4-default-rtdb.europe-west1.firebasedatabase.app/`
    const url = baseURL + `Products.json`
        const init = {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        };
    
        const response = await fetch(url, init)
        const data = await response.json()
        console.log(data)
        
    }
     let obj = Object.values(products) 
    patchPost(obj)
    console.log(obj)

  onLoadCartNumbers()
