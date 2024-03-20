/*=============== SHOW HIDDEN - PASSWORD ===============*/ 
const showHiddenPass = (registerPass, registerEye) =>{
    const input = document.getElementById(registerPass)
    const iconEye = document.getElementById(registerEye)
  
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
showHiddenPass('register-pass','register-eye')
  
const url = window.location.origin;

const form = document.querySelector('form');

form.addEventListener('submit', (event)=>{
   event.preventDefault();

   const name = form.seller.value;
   const shop_name =  form.shop_name.value;
   const email = form.email.value;
   const number = form.number.value;
   const gstin = form.gstin.value;
   const password = form.password.value;

   fetch(url +"/sellerRegistration",{
      method: "POST",
      headers: {
         "Content-Type": "application/json",
       },
      body: JSON.stringify({
         name: name,
         shop_name : shop_name,
         email: email,
         number: number,
         gstin : gstin,
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
         alert(data.Msg)
         window.location.reload()
      }
   })
})