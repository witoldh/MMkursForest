const menuToggle = document.querySelector('.menu');
const navbox = document.querySelector('.navbox');
const allNavItem = document.querySelectorAll('.navbox__item');

const navToggle = () => {
	navbox.classList.toggle('navbox--hidden')
	menuToggle.classList.toggle('opened')
	allNavItem.forEach(item => {
		item.addEventListener('click', () => {
			navbox.classList.add('navbox--hidden');
			menuToggle.classList.toggle('opened')
		})
	})
}

menuToggle.addEventListener('click', navToggle);
// onclick="this.classList.toggle('opened');this.setAttribute('aria-expanded', this.classList.contains('opened'))"