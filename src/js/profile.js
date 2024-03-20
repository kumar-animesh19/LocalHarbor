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
    window.location.reload()
})

window.onload = ()=>{
    fetch(url + "/fetchDetails",{
        method: "GET",
        headers: {
            authorization : token
        }
    })
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        if(data.Auth == "Decline User"){
            alert(data.Msg);
            localStorage.removeItem("name")
            localStorage.removeItem("token");
            window.location.href = url
        }
        if(data.Auth == "Success"){
            document.getElementById("name").value = data.Data.name
            document.getElementById("email").value = data.Data.email
            document.getElementById("contact").value = data.Data.number
        }
    })
}

document.getElementById("edit_name").addEventListener("click", ()=>{
    document.getElementById("cancel_edit_name").style.display = "block"
    document.getElementById("edit_name").style.display = "none"
    document.getElementById("update_name").style.display = "block"
    document.getElementById("name").disabled = false;
})

document.getElementById("cancel_edit_name").addEventListener("click", ()=>{
    document.getElementById("edit_name").style.display = "block"
    document.getElementById("cancel_edit_name").style.display = "none"
    document.getElementById("update_name").style.display = "none"
    document.getElementById("name").disabled = true;
})

document.getElementById("edit_email").addEventListener("click", ()=>{
    document.getElementById("cancel_edit_email").style.display = "block"
    document.getElementById("edit_email").style.display = "none"
    document.getElementById("update_email").style.display = "block"
    document.getElementById("email").disabled = false;
})

document.getElementById("cancel_edit_email").addEventListener("click", ()=>{
    document.getElementById("edit_email").style.display = "block"
    document.getElementById("cancel_edit_email").style.display = "none"
    document.getElementById("update_email").style.display = "none"
    document.getElementById("email").disabled = true;
})

document.getElementById("edit_contact").addEventListener("click", ()=>{
    document.getElementById("cancel_edit_contact").style.display = "block"
    document.getElementById("edit_contact").style.display = "none"
    document.getElementById("update_contact").style.display = "block"
    document.getElementById("contact").disabled = false;
})

document.getElementById("cancel_edit_contact").addEventListener("click", ()=>{
    document.getElementById("edit_contact").style.display = "block"
    document.getElementById("cancel_edit_contact").style.display = "none"
    document.getElementById("update_contact").style.display = "none"
    document.getElementById("contact").disabled = true;
})

document.getElementById("update_name").addEventListener("click", ()=>{
    const new_name = document.getElementById("name").value
    fetch(url + "/updateName",{
        method: 'PUT',
        headers:{
            authorization: token,
            name: new_name
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
            localStorage.setItem('name', data.Name)
            window.location.reload();
        }
    })
})
document.getElementById("update_email").addEventListener("click", ()=>{
    const new_email = document.getElementById("email").value
    fetch(url + "/updateEmail",{
        method: 'PUT',
        headers:{
            authorization: token,
            email: new_email
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
            localStorage.setItem('token', data.Token)
            window.location.reload();
        }
    })
})
document.getElementById("update_contact").addEventListener("click", ()=>{
    const new_contact = document.getElementById("contact").value
    fetch(url + "/updateContact",{
        method: 'PUT',
        headers:{
            authorization: token,
            contact: new_contact
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
            window.location.reload();
        }
    })
})

document.getElementById("del_acc").addEventListener("click", ()=>{
    const confirmResult = confirm("Are you sure you want to delete account?");
    if(confirmResult)
    {
        fetch(url + "/deleteAccount",{
            method:'DELETE',
            headers:{
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
                alert(data.Msg)
                localStorage.removeItem("name")
                localStorage.removeItem("token");
                window.location.href = url
            }
        })
    }
})