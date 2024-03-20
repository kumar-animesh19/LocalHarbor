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
  showHiddenPass('password','register-eye')

  const url = window.location.origin;

  document.getElementById("email_btn").addEventListener('click', ()=>{
    const email = document.getElementById('email').value

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
            document.getElementById("email_div").style.display = "none"
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
                            document.getElementById("verify").style.display = "none"
                            document.getElementById("reset_pass").style.display = "block"

                            document.getElementById("pass_btn").addEventListener( 'click', ()=>{
                                const password = document.getElementById("password").value;

                                fetch(url + "/resetPassword",{
                                    method:"PUT",
                                    headers:{
                                        email: email,
                                        password: password
                                    }
                                })
                                .then((res)=>{
                                    return res.json()
                                })
                                .then((data)=>{
                                    if(data.Auth == "Success"){
                                        alert(data.Msg)
                                        window.location.href = url + "/login.html";
                                    }
                                })
                            })
                        }
                        else{
                            alert("Invalid OTP! Please try again..")
                        }
                    })
                }
            })
        }
        if(data.Auth == "Success"){
            alert("User doesn't exist");
        }
    })
})