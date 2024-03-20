/*=============== SHOW HIDDEN - PASSWORD ===============*/
const showHiddenPass = (loginPass, loginEye) =>{
    const input = document.getElementById(loginPass),
          iconEye = document.getElementById(loginEye)
 
    iconEye.addEventListener('click', () =>{
       // Change password to text
       if(input.type === 'password'){
          // Switch to text
          input.type = 'text'
 
          // Icon change
          iconEye.classList.add('fa-eye')
          iconEye.classList.remove('fa-eye-slash')
       } else{
          // Change to password
          input.type = 'password'
 
          // Icon change
          iconEye.classList.remove('fa-eye')
          iconEye.classList.add('fa-eye-slash')
       }
    })
 }
 
showHiddenPass('login-pass','login-eye')

const url = window.location.origin;

document.getElementById('login-button').addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;

    fetch(url +"/sellerLogin",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    })
    .then((res)=>{
        return res.json()
    })
    .then((data) => {
        if(data.Auth == "Decline"){
            alert(data.Msg)
        }
        if(data.Auth == "Success"){
            localStorage.setItem("seller_name",  data.Name);
            localStorage.setItem("seller_token", data.Token);
            window.location.href = url+"/seller/home.html"
        }
    })
})