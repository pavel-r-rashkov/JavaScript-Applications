if(!sessionStorage['visitCount']) {
    sessionStorage['visitCount'] = 0;
}
sessionStorage['visitCount'] = parseInt(sessionStorage['visitCount']) + 1;

if(!localStorage['visitCount']) {
    localStorage['visitCount'] = 0;
}
localStorage['visitCount'] = parseInt(localStorage['visitCount']) + 1;

if(localStorage['name']) {
    document.body.innerHTML = 'Hello, ' + localStorage['name'] + '!';
} else {
    localStorage['name'] = prompt('Enter your name: ');
}

document.body.innerHTML += '<br />Session visits = ' + sessionStorage['visitCount'];
document.body.innerHTML += '<br />Total visits = ' + localStorage['visitCount'];


