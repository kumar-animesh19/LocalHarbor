const form = document.querySelector('form');

window.onload = ()=>{
    const category_list = ["Fashion","Electronics","Grocery","Beauty","Furniture"]
    category_list.forEach((item)=>{
        const option = document.createElement('option')
        option.text =  item
        option.value = item
        form.category.add(option)
    })
}

const category = form.category
const sub_category = document.getElementById('sub-category_label')
const sub__category = form.sub_category

category.addEventListener("change",()=>{ 
    if(category.value != "") {
        sub_category.classList.remove('hidden')
        for(let i=sub__category.options.length-1;i>0;i--){
            sub__category.remove(i)
        }
        if(category.value == "Fashion"){
            const sub_category_list = ["Clothing","Accessories","Footwear"]
            sub_category_list.forEach((item)=>{
                const option = document.createElement('option')
                option.text =  item
                option.value = item
                sub__category.add(option)
            })
        }
        if(category.value == "Electronics"){
            const sub_category_list = ["Gadgets","Appliances","Accessories"]
            sub_category_list.forEach((item)=>{
                const option = document.createElement('option')
                option.text = item
                option.value = item
                sub__category.add(option)
            })
        }
        if(category.value == "Grocery"){
            const sub_category_list = ["Dairy and eggs","Bakery","Snacks","Vegetables","Spices"]
            sub_category_list.forEach((item)=>{
                const option = document.createElement('option')
                option.text =  item
                option.value = item
                sub__category.add(option)
            })
        }
        if(category.value == "Beauty"){
            const sub_category_list = ["Skincare","Haircare","Cosmetics"]
            sub_category_list.forEach((item)=>{
                const option = document.createElement('option')
                option.text =  item
                option.value = item
                sub__category.add(option)
            })
        }
        if(category.value == "Furniture"){
            const sub_category_list = ["Office","Home"]
            sub_category_list.forEach((item)=>{
                const option = document.createElement('option')
                option.text =  item
                option.value = item
                sub__category.add(option)
            })
        }
        if(category.value == "Fashion"){
            document.getElementById("gender_label").classList.remove('hidden')
        }
        else{
            document.getElementById("gender_label").classList.add('hidden')
        }
    }
    else{
        document.getElementById('sub-category_label').classList.add('hidden')
        document.getElementById("gender_label").classList.add('hidden')
        document.getElementById("for-all").classList.add('hidden') 
        document.getElementById("quantity_label").classList.add('hidden')
        document.getElementById("size_label").classList.add('hidden')
        document.getElementById("color_label").classList.add('hidden')
        document.getElementById("description_label").classList.add('hidden')
        document.getElementById("image_label").classList.add('hidden')
        document.getElementById("image_preview").classList.add('hidden')
        document.getElementById("btn").classList.add('hidden')
    }
})

sub__category.addEventListener("change",()=>{
    if(sub__category.value != ""){
        document.getElementById("for-all").classList.remove('hidden')
        if(category.value == "Fashion" || sub__category.value == "Furniture"){
            if(sub__category.value == "Accessories"){
                document.getElementById("quantity_label").classList.add('hidden')
                document.getElementById("size_label").classList.add('hidden')
                document.getElementById("color_label").classList.remove('hidden')
            }
            else{
                document.getElementById("quantity_label").classList.add('hidden')
                document.getElementById("size_label").classList.remove('hidden')
                document.getElementById("color_label").classList.remove('hidden')
            }
        }
        if(category.value == "Grocery" || category.value == "Beauty"){
            document.getElementById("quantity_label").classList.remove('hidden')
            document.getElementById("size_label").classList.add('hidden')
            document.getElementById("color_label").classList.add('hidden')
        }
        if(category.value == "Electronics"){
            document.getElementById("quantity_label").classList.add('hidden')
            document.getElementById("size_label").classList.add('hidden')
            document.getElementById("color_label").classList.remove('hidden')
        }
        document.getElementById("description_label").classList.remove('hidden')
        document.getElementById("image_label").classList.remove('hidden')
        document.getElementById("btn").classList.remove('hidden')
    }
    else{
        document.getElementById("for-all").classList.add('hidden')
        document.getElementById("quantity_label").classList.add('hidden')
        document.getElementById("size_label").classList.add('hidden')
        document.getElementById("color_label").classList.add('hidden')
        document.getElementById("description_label").classList.add('hidden')
        document.getElementById("image_label").classList.add('hidden')
        document.getElementById("image_preview").classList.add('hidden')
        document.getElementById("btn").classList.add('hidden')
    }
})

const mrp = form.mrp
const selling_price = form.selling_price
const discount = form.discount

selling_price.addEventListener("input",()=>{
    if(mrp.value == ""){
        alert("Enter MRP first")
        selling_price.value= ""
        discount.value= ""
    }
    else if(Number(selling_price.value)>Number(mrp.value)){
        alert("Selling price cannot be greater than MRP")
        selling_price.value = ""
        discount.value=""
    }
    else{
        if(selling_price.value != "")
            discount.value = Math.floor((mrp.value-selling_price.value)/mrp.value*100)
        else
            discount.value = ""
    }
})
discount.addEventListener("input",()=>{
    if(mrp.value == ""){
        alert("Enter MRP first")
        selling_price.value= ""
        discount.value= ""
    }
    else if(discount.value>100 || discount.value<0){
        alert("Discount should be between 0% and 100%")
        selling_price.value= ""
        discount.value=""
    }
    else{
        if(discount.value != "")
            selling_price.value = Math.floor(mrp.value-(discount.value/100*mrp.value))
        else
            selling_price.value = ""
    }
})

form.product_image.addEventListener("change", (event)=>{
    if(event.target.files.length == 0 ) {
        return;
    }
    const tempUrl = URL.createObjectURL(event.target.files[0]);
    document.getElementById("image_preview").setAttribute("src",tempUrl);
    document.getElementById("image_preview").classList.remove('hidden')
})

const url = window.location.origin;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const gender = form.gender.value
    const product_name = form.product_name.value
    const product_brand = form.product_brand.value
    const size = form.size.value
    const color = form.color.value
    const quantity = form.quantity.value
    const description = form.description.value
    const product_image = form.product_image.files[0]

    const formData = new FormData()

    formData.append('category', category.value)
    formData.append('sub_category', sub__category.value)
    formData.append('gender', gender)
    formData.append('product_name', product_name)
    formData.append('product_brand', product_brand)    
    formData.append('mrp', mrp.value)  
    formData.append('selling_price', selling_price.value)
    formData.append('discount', discount.value)
    formData.append('size', size)
    formData.append('color', color)
    formData.append('quantity', quantity)
    formData.append('description', description)
    formData.append('product_image', product_image)

    fetch(url + "/addProduct",{
        method: 'POST',
        headers:{
            authorization : localStorage.getItem("seller_token")
        },
        body: formData    
    })
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        if(data.Auth == "Decline User"){
            alert(data.Msg)
            localStorage.removeItem("seller_name")
            localStorage.removeItem("seller_token")
            window.location.href= '/seller/login.html'
        }
        if(data.Auth == "Decline"){
            alert(data.Msg)
        }
        if(data.Auth == "Success"){
            alert(data.Msg)
            window.location.reload()
        }
    })
})