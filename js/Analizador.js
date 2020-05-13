var caracter = 0;
var parrafo = 0;
var palabra = 0;
var consonante = 0;
var vocal = 0;
var tilde = 0;
var vowels = [97, 101, 105, 111, 117, 225, 233, 237, 243, 250];

function contar() {
	var textoNormal = $("textarea#TextoIngresado").val();

	textoMinuscula = textoNormal.toLowerCase();

	for (var i = 0; i < textoMinuscula.length; i++) {
		var c = textoMinuscula.charCodeAt(i);
		contarVocalTilde(c);
		contarConsonanteCaracter(c);
		contarPalabras(c, textoMinuscula.charCodeAt(i - 1));
	}
	if (c != "32" && c != "10" && textoMinuscula.length > 0) palabra++;

	contarParrafos(textoMinuscula);

	mostrarResultados();
	guardarDatos(textoNormal, palabra, parrafo, caracter);
	reiniciarVariables();
}

function contarVocalTilde(c) {
	if (vowels.includes(c)) {
		vocal += 1;
		if (c > 224) tilde += 1;
	}
}

function contarConsonanteCaracter(c) {
	if (c > 96 && c < 123 && !vowels.includes(c)) consonante += 1;
	if (c != "32" && c != "10") caracter = caracter + 1;
}

function contarPalabras(c1, c2) {
	if (
		(c1 == "32" && c2 != "32" && c2 != "10") ||
		(c1 == "10" && c2 != "10" && c2 != "32")
	)
		palabra++;
}

function contarParrafos(texto) {
	var vacio = true;
	for (var i = 0; i < texto.length; i++) {
		var c = texto.charCodeAt(i);
		if (c != "32" && c != "10" && vacio) {
			vacio = false;
		} else if (c == "10")
			if (!vacio) {
				parrafo++;
				vacio = true;
			}
	}
	if (!vacio) parrafo++;
}

function mostrarResultados() {
	$("#vocales").val(vocal);
	$("#consonantes").val(consonante);
	$("#tildes").val(tilde);
	$("#caracteres").val(caracter);
	$("#palabras").val(palabra);
	$("#parrafos").val(parrafo);
}

function reiniciarVariables() {
	caracter = 0;
	parrafo = 0;
	palabra = 0;
	consonante = 0;
	vocal = 0;
	tilde = 0;
}

function buscarPalabra() {
	var texto = $("textarea#TextoIngresado").val().toLowerCase();
	var palabra = $("textarea#aBuscar").val().toLowerCase();
	var resultado = $("textarea#cantidad");

	if (palabra == "") resultado.val("");
	else {
		var reg = new RegExp(palabra, "g");
		var n = 0;

		const length = (x) => x.length;
		const sum = (a, b) => a + b;

		const indexesOf = (substr) => ({
			in: (str) =>
				str
					.split(substr)
					.slice(0, -1)
					.map(length)
					.map((_, i, lengths) =>
						lengths.slice(0, i + 1).reduce(sum, i * substr.length)
					),
		});

		resultado.val(indexesOf(palabra).in(texto).length);
		presentar(indexesOf(palabra).in(texto), texto, palabra.length);
	}
}

function presentar(apariciones, texto, largo) {
	var modificado = "";
	var i = 0;
	var n = 25;
	while (i <= apariciones.length - 1) {
		modificado += "Aparicion " + (i + 1) + ": ";
		if (apariciones[i] - n > 0) modificado += "...";
		modificado += texto.substring(
			apariciones[i] - n,
			apariciones[i] + n + largo
		);
		if (apariciones[i] + n < texto.length) modificado += "..." + "\n";
		else modificado += "\n";
		i++;
	}

	$("#respuestas").val(modificado);
}
