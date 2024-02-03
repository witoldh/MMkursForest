
const hamburgerToggle = document.querySelector('.hamburger-btn');
const navbox = document.querySelector('.navbox');
const allNavItem = document.querySelectorAll('.navbox__item')

const navToggle = () => {
    navbox.classList.toggle('navbox--active');
    allNavItem.foreach( item => {item.addEventListener('click', () => {navbox.classList.remove('nabox--active')})})
};

console.log(navbox)
hamburgerToggle.addEventListener('click', console.log(hamburgerToggle))