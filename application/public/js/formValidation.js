// function validateUserName(userName){
//     var format = /^[a-zA-Z]/
//         if (format.test(userName)){
//             document.querySelector("div > p > img").src = "../css/images/check\ icon.png"
//             if (userName.length >= 3) {
//                 document.querySelector("div > p > img").src = "../css/images/check\ icon.png"
//                 return true;
//             }
//         }
//     return false;
// }

var validPasssword = false;
var validConfirmPass = false;
var validUsername = false;


function validatePassword(password){
    var specialChars = /[*-+!@#$^&~[\]]+/
    var upperCase = /[A-Z]+/
    var numbers = /[0-9]+/

    //console.log(password)

    if (password.length >= 8 && specialChars.test(password)
        && upperCase.test(password) && numbers.test(password)){
        return true;
    }
    return false;
}

// username
document.getElementById('userName').addEventListener('focusout', (ev) => {
    document.getElementsByClassName('req-username')[0].style.display = "none";
})
document.getElementById('userName').addEventListener('focusin', (ev) => {
    document.getElementsByClassName('req-username')[0].style.display = "block";
})
document.getElementById('userName').addEventListener('input', (ev) => {
    
    document.getElementsByClassName('req-username')[0].style.display = "block";
    let userInput = ev.currentTarget
    let username = userInput.value
    
    var format = /^[a-zA-Z]/
    if (format.test(username)){
        document.querySelector("div > p > img.first").src = "../css/images/check\ icon.png"
        if (username.length >= 3) {
            document.querySelector("div > p > img.second").src = "../css/images/check\ icon.png"

            userInput.classList.add("class", "valid-text");
            userInput.classList.remove("class", "invalid-text");
            validUsername = true;
        }
        else{
            document.querySelector("div > p > img.second").src = "../css/images/cross\ icon.png"
        }

    }
    else{
        validUsername = false;
        document.querySelector("div > p > img.first").src = "../css/images/cross\ icon.png"
       
        userInput.classList.remove("class", "valid-text");
        userInput.classList.add("class", "invalid-text");
    }
    
    
})

// password checking
document.getElementById('reg-password').addEventListener('focusin', (ev) => {
    document.getElementsByClassName('req-pass')[0].style.display = "block";
})
document.getElementById('reg-password').addEventListener('focusout', (ev) => {
    document.getElementsByClassName('req-pass')[0].style.display = "none";
})
document.getElementById('reg-password').addEventListener('input', (ev) => {
    
    var specialChars = /[*-+!@#$^&~[\]]+/
    var upperCase = /[A-Z]+/
    var numbers = /[0-9]+/
    let passInput = ev.currentTarget;
    let password = passInput.value;

    
    if (upperCase.test(password)){
        document.querySelector("div.req-pass > p > img.first").src = "../css/images/check\ icon.png"
    } else {
        document.querySelector("div.req-pass > p > img.first").src = "../css/images/cross\ icon.png"
    }
    
    if (numbers.test(password)){
        document.querySelector("div.req-pass > p > img.second").src = "../css/images/check\ icon.png"
    } else {
        document.querySelector("div.req-pass > p > img.second").src = "../css/images/cross\ icon.png"
    }

    if (specialChars.test(password)){
        document.querySelector("div.req-pass > p > img.third").src = "../css/images/check\ icon.png"
    } else {
        document.querySelector("div.req-pass > p > img.third").src = "../css/images/cross\ icon.png"
    }

    if (password.length >= 8){
        document.querySelector("div.req-pass > p > img.fourth").src = "../css/images/check\ icon.png"
    } else {
        document.querySelector("div.req-pass > p > img.fourth").src = "../css/images/cross\ icon.png"
    }

    if(validatePassword(password)) {
        console.log("correct format");
        passInput.classList.add("class", "valid-text");
        passInput.classList.remove("class", "invalid-text");
        validPasssword = true;
    }
    else {
        validPasssword = false;
        console.log("incorrect format");
        passInput.classList.remove("class", "valid-text");
        passInput.classList.add("class", "invalid-text");
    }
})

// confirm password
document.getElementById('conf-pass').addEventListener('focusin', (ev) => {
    document.getElementsByClassName('confirm-pass')[0].style.display = "block";
})
document.getElementById('conf-pass').addEventListener('focusout', (ev) => {
    document.getElementsByClassName('confirm-pass')[0].style.display = "none";
})
document.getElementById('conf-pass').addEventListener('input', (ev) => {
    let conPassInput = ev.currentTarget;
    let conPassword = conPassInput.value;

    console.log(document.getElementById('reg-password').value);
    let password = document.getElementById('reg-password').value;
    if (conPassword == password){
        document.querySelector("div.confirm-pass > p > img.first").src = "../css/images/check\ icon.png"
        conPassInput.classList.add("class", "valid-text");
        conPassInput.classList.remove("class", "invalid-text");
        validConfirmPass = true;
    } else {
        document.querySelector("div.confirm-pass > p > img.first").src = "../css/images/cross\ icon.png"
        conPassInput.classList.remove("class", "valid-text");
        conPassInput.classList.add("class", "invalid-text");
        validConfirmPass = true;
    }
    

    
})


document.getElementById("reg-form").addEventListener('submit', (ev) => {
    ev.preventDefault();
    console.log(ev.currentTarget.password.value)
    console.log("submited");

    if(validConfirmPass && validPasssword && validUsername){
        ev.currentTarget.submit()
    } else{
        
        return;
    }

    
})