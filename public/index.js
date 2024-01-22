const menu = document.querySelector('.mobilemenu');

 
let isclicked = true;

let showmenu = function () {
    if (isclicked) {
        menu.style.display = 'block';
        isclicked = false;
    } else {
        menu.style.display = 'none';
        isclicked = true;
    }
};




