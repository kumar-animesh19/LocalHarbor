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
var timeOut = 2000;
var slideIndex = 0;
var autoOn = true;

autoSlides();

function autoSlides() {
    timeOut = timeOut - 20;
    if (autoOn == true && timeOut < 0) {
        showSlides();
    }
    setTimeout(autoSlides, 20);
}
function prevSlide() {
    timeOut = 2000;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slideIndex--;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    if (slideIndex == 0) {
        slideIndex = 3
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
function showSlides() {
    timeOut = 2000;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

const products = document.getElementById('products');
window.onload = ()=>{
    fetch(url + "/fetchProducts")
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        if(data.Auth == "Success"){
            const  product = data.Data
            for(let i=0;i<product.length;i++){
                let pro_img = product[i].product_image
                let pro_brand = product[i].product_brand
                let pro_name = product[i].product_name
                if(pro_name.length>50){
                    pro_name = pro_name.substring(0,45)+'...';
                }
                let sell_price = product[i].selling_price
                let mrp = product[i].mrp
                let discount = product[i].discount
                let div_product = document.createElement("div");
                div_product.className = "product";
                div_product.setAttribute("product_id",product[i]._id)

                    let div_image = document.createElement("img")
                    div_image.src = '../uploads/'+pro_img
                    div_image.setAttribute("product_id",product[i]._id)
                    div_product.appendChild(div_image)

                    let div_desc = document.createElement("div")
                    div_desc.className = "pro-desc"
                    div_desc.setAttribute("product_id",product[i]._id)

                        let div_brand = document.createElement("div")
                        div_brand.className ="brand"
                        div_brand.setAttribute("product_id",product[i]._id)
                        div_brand.innerHTML = pro_brand
                        div_desc.appendChild(div_brand)
                        
                        let div_product_name = document.createElement("div")
                        div_product_name.className ="product-name"
                        div_product_name.setAttribute("product_id",product[i]._id)
                        div_product_name.innerHTML = pro_name
                        div_desc.appendChild(div_product_name)

                        let div_product_price = document.createElement("div")
                        div_product_price.setAttribute("product_id",product[i]._id)
                            
                            let div_selling_price = document.createElement("span")
                            div_selling_price.className ="selling-price"
                            div_selling_price.setAttribute("product_id",product[i]._id)
                            div_selling_price.innerHTML = "₹"+sell_price
                            div_product_price.appendChild(div_selling_price)

                            let div_mrp = document.createElement("span")
                            div_mrp.className ="mrp"
                            div_mrp.setAttribute("product_id",product[i]._id)
                            div_mrp.innerHTML = "<del>₹"+mrp+"</del>"
                            div_product_price.appendChild(div_mrp)

                            let div_discount = document.createElement("span")
                            div_discount.className ="discount"
                            div_discount.setAttribute("product_id",product[i]._id)
                            div_discount.innerHTML = "("+discount+"% off)"
                            div_product_price.appendChild(div_discount)

                        div_desc.appendChild(div_product_price)
                    
                    div_product.appendChild(div_desc)

                products.appendChild(div_product);
            }
        }
    })
}

products.addEventListener("click", (event)=>{
    window.location.href = url + "/product.html?product_id=" + event.target.getAttribute('product_id')
})
