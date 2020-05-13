$(document).ready(function () {
	mostrarDatosAnteriores();
});

function guardarDatos(texto, palabra, parrafo, caracter) {
	var objeto = {
		tex: texto,
		pal: palabra,
		parr: parrafo,
		car: caracter,
	};
	var aGuardar = JSON.stringify(objeto);

	var index = localStorage.getItem("indice");
	if (index == null) localStorage.setItem("indice", 0);
	var i = parseInt(localStorage.getItem("indice"));

	i = (i + 1) % 5;
	localStorage.setItem("indice", i);
	localStorage.setItem("texto" + i, aGuardar);
	mostrarDatosAnteriores();
}

function mostrarDatosAnteriores() {
	var indice = localStorage.getItem("indice");
	for (var n = 0; n < 5; n++) {
		var i = (indice - n + 6) % 5;
		popDatos(n, i);
	}
}

function popDatos(n, i) {
	var t = $("textarea#TextoIngresado" + n);
	var words = $("textarea#palabras" + n);
	var paragraphs = $("textarea#parrafos" + n);
	var chars = $("textarea#caracteres" + n);

	var json = localStorage.getItem("texto" + i);
	if (json != null) {
		var obj = JSON.parse(json);

		t.val(obj.tex);
		words.val(obj.pal);
		paragraphs.val(obj.parr);
		chars.val(obj.car);
	}
}

function reAnalizar(i) {
	var t = $("textarea#TextoIngresado" + i).val();
	$("textarea#TextoIngresado").val(t);
	contar();
}
