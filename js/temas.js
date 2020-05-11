function setTheme(themeName) {
	localStorage.setItem("tema", themeName);
	document.documentElement.className = themeName;
}

(function () {
	if (localStorage.getItem("tema") === "tema-secundario") {
		setTheme("tema-secundario");
	} else {
		setTheme("tema-primario");
	}
})();
