var username = document.querySelector('#username');
var password = document.querySelector('#password');
var form = document.querySelector('form');


function showError(input, message) {
	var formControl = input.parentElement
	formControl.className = 'form-control error'
	var small = formControl.querySelector('small')
	small.innerText = message
}

// Show success outline
function showSuccess(input) {
	var formControl = input.parentElement
	formControl.className = 'form-control success'
    var small = formControl.querySelector('small')
	small.innerText = ''
}

function checkEmptyError(listInput){
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim()
        if (!input.value)
        {
            isEmptyError = true;
            showError(input, 'Không được để trống !')
        } 
    });	
    return isEmptyError;
}

function checkLengthErrorUsername(input,min,max){
    input.value = input.value.trim();
    if (input.value.length<min){
        showError(input,`Tên đăng nhập phải có ít nhất ${ min} ký tự !`);
        return true;
    }
    if(input.value.length>max){
        showError(input,`Tên đăng nhập không được vượt quá ${ max } ký tự !`);
        return true;
    }
	showSuccess(input);
    return false;
    
}

function checkLengthErrorPassword(input,min,max){
    input.value = input.value.trim();
    if (input.value.length<min){
        showError(input,`Mật khẩu phải có ít nhất ${ min} ký tự !`);
        return true;
    }
    if(input.value.length>max){
        showError(input,`Mật khẩu không được vượt quá ${ max } ký tự !`);
        return true;
    }
	showSuccess(input);
    return false;
    
}

function CheckUserData(){
    var usernameValue = document.querySelector('#username').value;   // lấy ra giá trị
    var passwordValue = document.querySelector('#password').value;
    var user = localStorage.getItem(usernameValue)           // Lấy giá trị đã lưu trong Json
    var data = JSON.parse(user);                             // phiên dịch lại giá trị ban đầu

    if (user == null)
    {
        const modalfail = document.querySelector('.modalNoExist');
        setTimeout(function()
        {
             modalfail.classList.add('activeNoExist');
        },1000)
    }
    else if(usernameValue == data.username && passwordValue == data.password)
    {
        const modalsucess = document.querySelector('.modalSuccess');
        setTimeout(function()
        {
             modalsucess.classList.add('active');
        },1000)
    }
    else{
       if(usernameValue != data.username || passwordValue != data.password)
       {
        const modalfail = document.querySelector('.modalfail');
        setTimeout(function()
        {
             modalfail.classList.add('activefail');
        },1000)
       }
    }
}
const login = document.querySelector('.seou--login');
login.addEventListener('submit',function(e){
	let isPasswordLengthError = checkLengthErrorPassword(password,6,20); 
	let isUserNameLengthError = checkLengthErrorUsername(username,7,20);    
	let isEmptyError = checkEmptyError([username,password]);
    e.preventDefault();
	if( !isEmptyError && !isPasswordLengthError && !isUserNameLengthError)
	{
		CheckUserData();
	}
})



       