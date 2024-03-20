const profile = document.getElementById('profile')
const sub_navbar = document.getElementById('sub-navbar')
const arrow = document.getElementById('arrow')
const user = document.getElementById('user')

profile.addEventListener('mouseover',()=>{
    user.innerHTML = localStorage.getItem("seller_name");
    sub_navbar.style.display = 'block';
    arrow.classList.remove('fa-angle-down')
    arrow.classList.add('fa-angle-up')
})
profile.addEventListener('mouseout',()=>{
    sub_navbar.style.display = 'none';
    arrow.classList.remove('fa-angle-up')
    arrow.classList.add('fa-angle-down')
})

const url = window.location.origin;

document.getElementById('logout').addEventListener('click',()=>{
    localStorage.removeItem("seller_name")
    localStorage.removeItem("seller_token");
    window.location.href = url + "/seller/become_a_seller.html"
})
const products = document.getElementById('products')
window.onload = ()=>{
    fetch(url + "/fetchSellerProducts",{
        method: "GET",
        headers: {
            authorization : localStorage.getItem('seller_token') 
        }
    })
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        if(data.Auth == "Decline User"){
            alert(data.Msg);
            localStorage.removeItem("seller_name")
            localStorage.removeItem("seller_token");
            window.location.href = url + "/seller/become_a_seller.html"
        }
        if(data.Auth == "Success"){
            const  product = data.Data.products
            for(let i=0;i<product.length;i++){
                let pro_img = product[i].product_image
                let pro_brand = product[i].product_brand
                let pro_name = product[i].product_name
                let sell_price = product[i].selling_price
                let mrp = product[i].mrp
                let discount = product[i].discount
                let category = product[i].category
                let sub_category = product[i].sub_category
                let gender = product[i].gender
                let color = product[i].color
                let size = product[i].size
                let quantity = product[i].quantity
                let description = product[i].description

                let div_product = document.createElement("div");
                div_product.className = "product";

                    let div_image = document.createElement("img")
                    div_image.src = '../../uploads/'+pro_img
                    div_product.appendChild(div_image)

                    let div_desc = document.createElement("div")
                    div_desc.className = "pro-desc"

                        let div_brand = document.createElement("div")
                        div_brand.className ="brand"
                        div_brand.innerHTML = pro_brand
                        div_desc.appendChild(div_brand)
                        
                        let div_product_name = document.createElement("div")
                        div_product_name.className ="product-name"
                        div_product_name.innerHTML = pro_name
                        div_desc.appendChild(div_product_name)

                        let div_product_price = document.createElement("div")
                            
                            let div_selling_price = document.createElement("span")
                            div_selling_price.className ="selling-price"
                            div_selling_price.innerHTML = "₹"+sell_price
                            div_product_price.appendChild(div_selling_price)

                            let div_mrp = document.createElement("span")
                            div_mrp.className ="mrp"
                            div_mrp.innerHTML = "<del>₹"+mrp+"</del>"
                            div_product_price.appendChild(div_mrp)

                            let div_discount = document.createElement("span")
                            div_discount.className ="discount"
                            div_discount.innerHTML = "("+discount+"% off)"
                            div_product_price.appendChild(div_discount)

                        div_desc.appendChild(div_product_price)
                        
                        let div_category = document.createElement("div")
                        div_category.innerHTML = "Category: "+category
                        div_desc.appendChild(div_category)

                        let div_sub_category = document.createElement("div")
                        div_sub_category.innerHTML = "Sub-Category: "+sub_category
                        div_desc.appendChild(div_sub_category)

                        if(gender != ""){
                            let div_gender = document.createElement("div")
                            div_gender.innerHTML = "Gender: "+gender
                            div_desc.appendChild(div_gender)
                        }

                        if(size != ""){
                            let div_size = document.createElement("div")
                            div_size.innerHTML = "Size: "+size
                            div_desc.appendChild(div_size)
                        }

                        if(color != ""){
                            let div_color = document.createElement("div")
                            div_color.innerHTML = "Color: "+color
                            div_desc.appendChild(div_color)
                        }

                        if(quantity != ""){
                            let div_quantity = document.createElement("div")
                            div_quantity.innerHTML = "Quantity: "+quantity
                            div_desc.appendChild(div_quantity)
                        }

                        let div_description = document.createElement("div")
                        div_description.innerHTML = "Description: "+description
                        div_desc.appendChild(div_description)

                    div_product.appendChild(div_desc)

                    let div_btn =  document.createElement("div")
                    div_btn.className = "btn"

                        let edit_btn = document.createElement("button")
                        edit_btn.className = "edit_btn"
                        edit_btn.setAttribute("product-id",product[i]._id)
                        edit_btn.innerHTML = 'Edit <i class="fa-solid fa-pen-to-square"></i>'
                        div_btn.appendChild(edit_btn)

                        let remove_btn = document.createElement("button")
                        remove_btn.className = "remove_btn"
                        remove_btn.setAttribute("product-id",product[i]._id)
                        remove_btn.innerHTML = 'Remove <i class="fa-solid fa-trash-arrow-up"></i>'
                        div_btn.appendChild(remove_btn)

                    div_product.appendChild(div_btn)

                products.appendChild(div_product);
            }
        }
    })
}

products.addEventListener('click', (event)=>{
    if(event.target.classList.contains('edit_btn')){
        console.log(event.target.getAttribute('product-id'));
    }
    if(event.target.classList.contains('remove_btn')){
        fetch(url + "/removeProduct",{
            method : 'DELETE',
            headers :{
                authorization : localStorage.getItem('seller_token'),
                product_id : event.target.getAttribute('product-id')
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            if(data.Auth == "Decline User"){
                alert(data.Msg);
                localStorage.removeItem("seller_name")
                localStorage.removeItem("seller_token");
                window.location.href = url + "/seller/become_a_seller.html"
            }
            if(data.Auth == "Success"){
                alert(data.Msg);
                window.location.reload();
            }
        })
    }
})

document.getElementById("my_profile").addEventListener( 'click', ()=> {
    window.location.href = url+"/seller/profile.html"
})