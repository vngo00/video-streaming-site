function validateUserName(userName){
    var format = /^[a-zA-Z]/
        if (userName.length >= 3 && format.test(userName)){
        return true;
    } 
    return false;
}


function validatePassword(password){
    var specialChars = /[*-+!@#$^&~[\]]+/
    var upperCase = /[A-Z]+/
    var numbers = /[0-9]+/

    console.log(password)

    if (password.length >= 8 && specialChars.test(password)
        && upperCase.test(password) && numbers.test(password)){
        return true;
    }
    return false;
}

document.getElementById('userName').addEventListener('input', (ev) => {
    let userInput = ev.currentTarget
    let username = userInput.value
    

    if ( validateUserName(username)){
        console.log("correct format");
        userInput.classList.add("class", "valid-text");
        userInput.classList.remove("class", "invalid-text");
    }
    else {
        console.log("incorrect format");
        userInput.classList.remove("class", "valid-text");
        userInput.classList.add("class", "invalid-text");
    }
})


document.getElementById('reg-password').addEventListener('input', (ev) => {
    let passInput = ev.currentTarget;
    let password = passInput.value;

    if(validatePassword(password)) {
        console.log("correct format");
        passInput.classList.add("class", "valid-text");
        passInput.classList.remove("class", "invalid-text");
    }
    else {
        console.log("incorrect format");
        passInput.classList.remove("class", "valid-text");
        passInput.classList.add("class", "invalid-text");
    }
})


document.getElementById("reg-form").addEventListener('submit', (ev) => {
    ev.preventDefault();
    console.log(ev.currentTarget.password.value)
    console.log("submited");

    // if(isBad){
    //     return;
    // }
    // else{
    //     ev.currentTarget.submit();
    // }
})