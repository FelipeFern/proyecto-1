var caracter = 0;
var parrafo = 0;
var palabra = 0;
var consonante = 0;
var vocal = 0;
var tilde = 0;
var vowels = [97, 101, 105, 111, 117, 225, 233, 237, 243, 250];

function contar(element) {
	var texto = $("textarea#TextoIngresado").val();
	texto = texto.toLowerCase();

	for (var i = 0; i < texto.length; i++) {
		var c = texto.charCodeAt(i);
		contarVocalTildeConsonante(c);
		contarPalabras(c, texto.charCodeAt(i - 1));
	}

	contarParrafos(texto);
	contarPalabra(texto, "hol ");

	if (c != "32" && c != "10") palabra++;

	mostrarResultados();
	reiniciarVariables();
}

//Agregarla al boton cuando se quiera buscar algo.
//Ya te devuelve el arreglo con todos los indices donde esta el elemento. Subrayarlos o marcarlos en el texto faltaria.
function contarPalabra(texto, palabra) {
	var reg = new RegExp(palabra, "g");
	var n = 0;
	if (texto.includes(palabra)) n = texto.match(reg).length;
	console.log(n);
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
	console.log(indexesOf(palabra).in(texto));
}

function contarVocalTildeConsonante(c) {
	if (vowels.includes(c)) {
		vocal += 1;
		if (c > 224) tilde += 1;
	}
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
	vocales = 0;
	tilde = 0;
}
