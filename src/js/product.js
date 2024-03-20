const profile = document.getElementById('profile')
const sub_navbar = document.getElementById('sub-navbar')
const login_sub_navbar = document.getElementById('login_sub-navbar')
const arrow = document.getElementById('arrow')
const user = document.getElementById('user')

const name = localStorage.getItem('name')
const token = localStorage.getItem('token')

if(name ==  null || token == null){
    profile.addEventListener('mouseover',()=>{
        login_sub_navbar.style.display = 'block';
        arrow.classList.remove('fa-angle-down')
        arrow.classList.add('fa-angle-up')
    })
}
else{
    profile.addEventListener('mouseover',()=>{
        user.innerHTML = name;
        sub_navbar.style.display = 'block';
        arrow.classList.remove('fa-angle-down')
        arrow.classList.add('fa-angle-up')
    })
}
profile.addEventListener('mouseout',()=>{
    sub_navbar.style.display = 'none';
    login_sub_navbar.style.display = 'none';
    arrow.classList.remove('fa-angle-up')
    arrow.classList.add('fa-angle-down')
})

const url = window.location.origin;

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

const urlParams = new URLSearchParams(document.location.search);
const product_id = urlParams.get('product_id');

const size = document.getElementById("size");
const color = document.getElementById("color");
const quantity = document.getElementById("quantity");

window.onload = ()=>{
    fetch(url + "/fetchProductDetails",{
        method : 'GET',
        headers:{
            product_id : product_id
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        document.getElementById("product-image").src = "../uploads/"+data.Data.product_image;
        document.getElementById("brand").innerHTML= data.Data.product_brand;
        document.getElementById("product-name").innerHTML= data.Data.product_name;
        document.getElementById("selling-price").innerHTML= "₹"+data.Data.selling_price;
        document.getElementById("mrp").innerHTML = "<del>₹"+ data.Data.mrp + "</del>"
        document.getElementById("discount").innerHTML = "(" + data.Data.discount + "% off)"

        if(data.Data.size != ""){
            size.style.display="block";
            size.innerHTML = "Size:&emsp;" +data.Data.size;
        }
        if(data.Data.color != ""){
            color.style.display="block";
            color.innerHTML = "Color:&emsp;" +data.Data.color;
        }
        if(data.Data.quantity != ""){
            quantity.style.display="block";
            quantity.innerHTML = "Quantity:&emsp;" +data.Data.quantity;
        }
        document.getElementById("description").innerHTML = "Description:&emsp;" +data.Data.description;
    })

    if(token != null){
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
                const cart = data.Data.cart
                for(let i=0; i<cart.length; i++){
                    if(cart[i]._id == product_id){
                        document.getElementById("add-to-cart-btn").style.display = "none"
                        document.getElementById("go-to-cart").style.display ="block"
                    }
                }
            }
        })
    }
}

document.getElementById("add-to-cart-btn").addEventListener("click", ()=>{
    if(name ==  null || token == null){
        sessionStorage.setItem('redirectUrl', window.location.href);
        window.location.href = url + "/login.html"
    }
    else{
        fetch(url + "/addToCart",{
            method: 'PUT',
            headers:{
                authorization : token,
                product_id : product_id
            },
        })
        .then((res)=>{
            return  res.json()
        })
        .then((data)=>{
            if(data.Auth == "Decline User"){
                alert(data.Msg);
                localStorage.removeItem("name")
                localStorage.removeItem("token");
                window.location.href = url
            }
            if(data.Auth == "Success"){
                window.location.reload()
            }
        })
    }
})