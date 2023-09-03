$('body').append(`<div class="--tagline"><a href="https://danielpsrb.blogspot.com/">#danpsrb</a></div>`);
function showRegForm(){
    $('.--login_form').addClass('hide');
    $('.--register_form').removeClass('hide');
    $('.--register_form').addClass('show');
    $('#loginBtn').removeClass('hide');
    $('#registerBtn').addClass('hide');
    $('.logo img').attr('src', 'logo-2.png');
}

function showLoginForm(){
    $('.--login_form').removeClass('hide');
    $('.--register_form').addClass('hide');
    $('.--register_form').removeClass('show');
    $('#loginBtn').addClass('hide');
    $('#registerBtn').removeClass('hide');
    $('.logo img').attr('src', 'logo.png');
}

$('#registerBtn').on('click', function(e){
    e.preventDefault();
    showRegForm();
});

$('#loginBtn').on('click', function(e){
    e.preventDefault();
    showLoginForm();
});
let regStatus = localStorage.getItem('status');
let regError = localStorage.getItem('error_login');

if(regStatus){
    $('.--cuy_notify').removeClass('hide');
    $('.--cuy_notify p').html(regStatus);
}
if(regError){
    $('.--cuy_notify-error').removeClass('hide');
    $('.--cuy_notify-error p').html(regError);
}

$('.--cuy_notify').on('click', function(){
    localStorage.removeItem('status');
    $('.--cuy_notify').addClass('hide');
});
$('.--cuy_notify-error').on('click', function(){
    localStorage.removeItem('error_login');
    $('.--cuy_notify-error').addClass('hide');
});
$('#submitRegister').on('click', function(){
    let uname = $('#regUname').val();
    let pw = $('#regPW').val();
    let pwrepeat = $('#regPWRepeat').val();
    let role = $('#regRole').val();
    let old = localStorage.getItem('userlist');
    let finduser = JSON.parse(old);
    let findstat = 'not-found';
    $.each(finduser, function(i, v){
        let olduser = JSON.parse(v);
        if(uname == olduser.username){
            findstat = 'found';
        }
    });
    if(findstat != 'found'){
        if(pw != pwrepeat){
            $('.--error_reg-pw').addClass('show');
        } else {
            if(role != null){
                let user = `{"username":"${uname}", "password":"${convertToHash(pw)}", "role":"${role}"}`;
        
                if(old != null){
                    let oldusers = JSON.parse(old);
                    oldusers.push(user)
                    localStorage.setItem('userlist', JSON.stringify(oldusers));
                } else {
                    let arr = [];
                    arr.push(user);
                    localStorage.setItem('userlist', JSON.stringify(arr));
                }
                localStorage.setItem('status', `Registrasi berhasil, silahkan gunakan username <b>${uname}</b> untuk login. <i>Click untuk menutup pesan ini</i>`);
                location.reload();
            } else {
                $('.--error_reg-role').addClass('show');
            }
        }
    } else {
      $('.--error_reg-user').addClass('show');
    }
});

$('#submitLogin').on('click', function(){
    let uname = $('#loginUname').val();
    let passw = $('#loginPW').val();
    let userList = localStorage.getItem('userlist');
    let userarr = JSON.parse(userList);
    let finduser = 'not-found';
    localStorage.removeItem('status');
    $.each(userarr, function(i, v){
        let user = JSON.parse(v);
        if(uname == user.username){
            finduser = 'found';
            $('.--error_login-nouser').removeClass('show');
            if(convertToHash(passw) == user.password){
                $('.--error_login-pw').removeClass('show');
                if(user.role == 'Admin'){
                    location.href = '/admin.html';
                }
                if(user.role == 'Driver'){
                    location.href = '/driver.html';
                }
                if(user.role == 'CSR'){
                    location.href = '/cs.html';
                }
                if(user.role == 'Customer'){
                    location.href = '/customer.html';
                }
                
                localStorage.setItem('login_status', 'success');
                localStorage.setItem('login_username', user.username);
                localStorage.setItem('login_role', user.role);
                localStorage.removeItem('error_login');
            } else {
                $('.--error_login-pw').addClass('show');
            }
        }
    })

    if(finduser == 'not-found'){
        $('.--error_login-nouser').addClass('show');
    }
});
$('.--btn_pink').on('click', function(){
    localStorage.removeItem('login_status');
    localStorage.removeItem('login_username');
    localStorage.removeItem('login_role');
    location.href = '/';
});
function convertToHash (str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; 
    }
    return hash;
}
let noticeStat = localStorage.getItem('notice');

if(noticeStat){
    $('.--notice').addClass('hide');
}
$('.close-notice a').on('click', function(){
    $('.--notice').addClass('hide');
    localStorage.setItem('notice', 'close');
});
$('.fab-notice a').on('click', function(){
    $('.--notice').removeClass('hide');
    localStorage.removeItem('notice');
});