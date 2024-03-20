const profile = document.getElementById('profile')
const sub_navbar = document.getElementById('sub-navbar')
const arrow = document.getElementById('arrow')
const user = document.getElementById('user')

const url = window.location.origin;

const name = localStorage.getItem('name')
const token = localStorage.getItem('token')

if(name == null || token == null){
    window.location.href = url + '/login.html'
}
profile.addEventListener('mouseover',()=>{
    user.innerHTML = name;
    sub_navbar.style.display = 'block';
    arrow.classList.remove('fa-angle-down')
    arrow.classList.add('fa-angle-up')
})
profile.addEventListener('mouseout',()=>{
    sub_navbar.style.display = 'none';
    arrow.classList.remove('fa-angle-up')
    arrow.classList.add('fa-angle-down')
})

document.getElementById('logout').addEventListener('click',()=>{
    localStorage.removeItem("name")
    localStorage.removeItem("token");
    window.location.href = url
})
document.getElementById('orders').addEventListener('click',()=>{
    window.location.href = url + "/order.html"
})
document.getElementById("my_profile").addEventListener( 'click', ()=> {
    window.location.href=url+"/profile.html"
})

const products = document.getElementById('products')
const price_title  = document.getElementById('price_title')
const price_val = document.getElementById('price_val')
const dis_val = document.getElementById('dis_val')
const total_val = document.getElementById('total_val')


let cart = []
window.onload = ()=>{
    fetch(url + "/fetchCart",{
        method : "GET",
        headers : {
            authorization : token
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        if(data.Auth == "Decline User"){
            alert(data.Msg);
            localStorage.removeItem("name")
            localStorage.removeItem("token");
            window.location.href = url
        }
        if(data.Auth == "Success"){
            let totalPrice = 0;
            let totalAmount = 0;
            let totalitems = 0;
            cart = data.Data.cart
            if(cart.length == 0){
                document.getElementById("empty_cart").style.display = "block"
            }
            else{
                document.getElementById("total_amount").style.display = "block"
                for(let i=0; i<cart.length; i++){

                    totalPrice += parseInt(cart[i].mrp)
                    totalAmount += parseInt(cart[i].selling_price)
                    totalitems++

                    let div_product = document.createElement("div")
                    div_product.className = "product";

                    let div_image = document.createElement("img")
                    div_image.src = "../uploads/"+cart[i].product_image
                    div_product.appendChild(div_image)

                    let div_desc = document.createElement("div")
                    div_desc.className = "pro-desc"

                        let div_product_name = document.createElement("div")
                        div_product_name.className ="product-name"
                        div_product_name.innerHTML = cart[i].product_name
                        div_desc.appendChild(div_product_name)

                        let div_selected = document.createElement("div")

                            let div_size = document.createElement("span")
                            div_size.className = "size"
                            div_size.innerText = "Size: "+cart[i].size
                            div_selected.appendChild(div_size)

                            let div_color = document.createElement("span")
                            div_color.className = "color"
                            div_color.innerText = " | Color: "+cart[i].color
                            div_selected.appendChild(div_color)

                        div_desc.appendChild(div_selected)

                        let div_product_price = document.createElement("div")
                            
                            let div_selling_price = document.createElement("span")
                            div_selling_price.className ="selling-price"
                            div_selling_price.innerHTML = "₹"+cart[i].selling_price
                            div_product_price.appendChild(div_selling_price)

                            let div_mrp = document.createElement("span")
                            div_mrp.className ="mrp"
                            div_mrp.innerHTML = "<del>₹"+cart[i].mrp+"</del>"
                            div_product_price.appendChild(div_mrp)

                            let div_discount = document.createElement("span")
                            div_discount.className ="discount"
                            div_discount.innerHTML = "("+cart[i].discount+"% off)"
                            div_product_price.appendChild(div_discount)

                        div_desc.appendChild(div_product_price)

                        let rmv_btn = document.createElement("button")
                        rmv_btn.className = "rmv_btn" 
                        rmv_btn.setAttribute("product-id",cart[i]._id)
                        rmv_btn.innerHTML = 'Remove<i class="fa-solid fa-trash-arrow-up"></i>'
                        div_desc.appendChild(rmv_btn)

                    div_product.appendChild(div_desc)
                    
                    products.appendChild(div_product);
                }
            }
            if(totalitems == 1)
                price_title.innerHTML = "Price("+totalitems+" item)"
            else
                price_title.innerHTML = "Price("+totalitems+" items)"
            price_val.innerHTML = "₹"+totalPrice
            dis_val.innerHTML = "₹"+(totalPrice-totalAmount)
            total_val.innerHTML  = "₹"+totalAmount;
        }
    }) 
    
}

document.getElementById("cart_item").addEventListener('click', (event)=>{
    if(event.target.classList.contains('rmv_btn')){
        fetch(url + "/removeCartProduct",{
            method : 'DELETE',
            headers :{
                authorization : token,
                product_id : event.target.getAttribute('product-id')
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            if(data.Auth == "Decline User"){
                alert(data.Msg);
                localStorage.removeItem("name")
                localStorage.removeItem("token");
                window.location.href = url
            }
            if(data.Auth == "Success"){
                alert(data.Msg);
                window.location.reload();
            }
        })
    }
})

document.getElementById("place_order_btn").addEventListener('click', ()=>{
    fetch(url + "/payment",{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            authorization : token
        },
        body:  JSON.stringify({
            items:cart,
            url:url
        })
    })
    .then((res)=>{
        return res.json()
    })
    .then((url)=>{

        location.href = url
    })
})