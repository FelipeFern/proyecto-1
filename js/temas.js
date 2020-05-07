// function to set a given theme/color-scheme
function setTheme(themeName) {
	localStorage.setItem("tema", themeName);
	document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function CambiarTema() {
	if (localStorage.getItem("tema") === "tema-secundario") {
		setTheme("tema-primario");
	} else {
		setTheme("tema-secundario");
	}
}
// Immediately invoked function to set the theme on initial load
(function () {
	if (localStorage.getItem("tema") === "tema-secundario") {
		setTheme("tema-secundario");
	} else {
		setTheme("tema-primario");
	}
})();
