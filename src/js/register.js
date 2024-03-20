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

   const name = form.user.value;
   const email = form.email.value;
   const number = form.number.value;
   const password = form.password.value;

   fetch(url+ "/checkUser",{
      method: 'GET',
      headers: {
         email: email
      }
   })
   .then((res)=>{
      return res.json();
   })
   .then((data)=>{
      if(data.Auth == "Decline"){
         alert(data.Msg)
      }
      if(data.Auth == "Success"){
         document.getElementById("register").style.display = "none"
         document.getElementById("verify").style.display = "block"

         const code = String(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000)

         fetch(url + "/verifyEmail",{
            method: "POST",
            headers:{
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               email : email,
               otp : code
            })
         })
         .then((res)=>{
            return res.json()
         })
         .then((data)=>{
            if(data.Auth == "Success"){
               document.getElementById("verify_btn").addEventListener('click', ()=>{
                  const userInput = document.getElementById("otp").value
                  if(userInput == code){
                     fetch(url +"/customerRegistration",{
                        method: "POST",
                        headers: {
                           "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                           name: name,
                           email: email,
                           number: number,
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
                           window.location.href = url + "/login.html"
                        }
                     })
                  }
                  else{
                     alert("Invalid OTP! Please try again..")
                  }
               })
            }
         })
      }
   })
})