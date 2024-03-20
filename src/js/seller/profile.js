const profile = document.getElementById("profile");
const sub_navbar = document.getElementById("sub-navbar");
const arrow = document.getElementById("arrow");
const user = document.getElementById("user");

profile.addEventListener("mouseover", () => {
  user.innerHTML = localStorage.getItem("seller_name");
  sub_navbar.style.display = "block";
  arrow.classList.remove("fa-angle-down");
  arrow.classList.add("fa-angle-up");
});
profile.addEventListener("mouseout", () => {
  sub_navbar.style.display = "none";
  arrow.classList.remove("fa-angle-up");
  arrow.classList.add("fa-angle-down");
});

const url = window.location.origin;

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("seller_name");
  localStorage.removeItem("seller_token");
  window.location.href = url + "/seller/become_a_seller.html";
});

document.getElementById("my_profile").addEventListener( 'click', ()=> {
    window.location.reload()
})

window.onload = ()=>{
  fetch(url + "/fetchSellerDetails",{
    method:"GET",
    headers:{
      authorization : localStorage.getItem("seller_token")
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
      document.getElementById("name").innerHTML= "Name : "+data.Data.name
      document.getElementById("shop_name").innerHTML= "Shop Name : "+ data.Data.shop_name
      document.getElementById('email').innerHTML="Email : "+ data.Data.email
      document.getElementById("contact").innerHTML="Contact No. : "+ data.Data.number
      document.getElementById("gstin").innerHTML="GSTIN : "+ data.Data.gstin
    }
  })
}