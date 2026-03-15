// Funcionalidad de tema
function initTheme() {
	const theme = localStorage.getItem('theme') || 'light';
	document.documentElement.setAttribute('data-theme', theme);
	console.log('Tema inicializado:', theme);
	
	const themeToggle = document.getElementById('theme-toggle');
	console.log('Botón tema encontrado:', !!themeToggle);
	if (themeToggle) {
		themeToggle.addEventListener('click', toggleTheme);
	}
}

function toggleTheme() {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
	
	document.documentElement.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme);
	console.log('Tema cambiado a:', newTheme);
}

// Funcionalidad de idioma
function initLanguage() {
	const lang = localStorage.getItem('language') || 'es';
	// Usar html-root para idioma y portfolio-container para ventana de código
	const htmlRoot = document.getElementById('html-root');
	const portfolioContainer = document.querySelector('.portfolio-container');
	console.log('Idioma inicializado:', lang);
	console.log('HTML Root encontrado:', !!htmlRoot);
	console.log('Portfolio Container encontrado:', !!portfolioContainer);
	
	if (htmlRoot) {
		htmlRoot.setAttribute('lang', lang);
	}
	if (portfolioContainer) {
		portfolioContainer.setAttribute('data-current-lang', lang);
	}
	
	updateContent(lang);
	
	const langToggle = document.getElementById('lang-toggle');
	console.log('Botón idioma encontrado:', !!langToggle);
	if (langToggle) {
		langToggle.addEventListener('click', toggleLanguage);
	}
}

function toggleLanguage() {
	const htmlRoot = document.getElementById('html-root');
	const portfolioContainer = document.querySelector('.portfolio-container');
	const currentLang = htmlRoot?.getAttribute('lang') || 'es';
	const newLang = currentLang === 'es' ? 'en' : 'es';
	
	console.log('Cambiando idioma de', currentLang, 'a', newLang);
	
	if (htmlRoot) {
		htmlRoot.setAttribute('lang', newLang);
	}
	if (portfolioContainer) {
		portfolioContainer.setAttribute('data-current-lang', newLang);
	}
	
	localStorage.setItem('language', newLang);
	updateContent(newLang);
}

function updateContent(lang) {
	const elements = document.querySelectorAll('[data-lang-es][data-lang-en]');
	elements.forEach(element => {
		const content = lang === 'es' ? element.getAttribute('data-lang-es') : element.getAttribute('data-lang-en');
		if (content && element instanceof HTMLElement) {
			element.textContent = content;
		}
	});

	// Actualizar botón de idioma
	const langButton = document.getElementById('lang-toggle');
	if (langButton) {
		langButton.textContent = lang === 'es' ? 'EN' : 'ES';
	}

	// Actualizar ventana de código
	updateCodeWindow(lang);

	// Agregar atributo al contenedor para CSS
	const portfolioContainer = document.querySelector('.portfolio-container');
	if (portfolioContainer) {
		portfolioContainer.setAttribute('data-current-lang', lang);
	}
}

function updateCodeWindow(lang) {
	const codeWindows = document.querySelectorAll('.code-window[data-lang]');
	console.log('Ventanas de código encontradas:', codeWindows.length);
	codeWindows.forEach(window => {
		const windowLang = window.getAttribute('data-lang');
		console.log('Ventana idioma:', windowLang, 'Idioma actual:', lang);
		if (windowLang === lang) {
			window.style.display = 'block';
			console.log('Mostrando ventana', windowLang);
		} else {
			window.style.display = 'none';
			console.log('Ocultando ventana', windowLang);
		}
	});
}

// Navegación smooth scroll
function initSmoothScroll() {
	const navLinks = document.querySelectorAll('a[href^="#"]');
	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const href = link.getAttribute('href');
			if (href && href !== '#') {
				if (href === '#top') {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				} else {
					const target = document.querySelector(href);
					if (target) {
						target.scrollIntoView({ behavior: 'smooth' });
					}
				}
			}
		});
	});
}

// Inicialización cuando el DOM se carga
if (typeof document !== 'undefined') {
	document.addEventListener('DOMContentLoaded', () => {
		setTimeout(() => {
			initTheme();
			initLanguage();
			initSmoothScroll();
		}, 100);
	});
}
