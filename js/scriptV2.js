function leerArchivoJSON(nombreArchivo) {
	return fetch(nombreArchivo)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Error al leer el archivo JSON.");
			}
			return response.json();
		})
		.catch((error) => {
			console.error(error);
		});
}

// Función para crear elementos con atributos
function createElement(element, textContent, attributes, parent) {
	var el = document.createElement(element);
	el.textContent = textContent;

	// Agregar atributos al elemento
	for (var key in attributes) {
		el.setAttribute(key, attributes[key]);
	}

	parent.appendChild(el);
}
function obtenerValor(json, key) {
	if (json.hasOwnProperty(key)) {
		return json[key];
	} else {
		return null; // o algún valor por defecto si la clave no existe en el JSON
	}
}

function createTable(arr, nameTable) {
	let arrKeys = Object.keys(arr[0]);

	createElement("table", "", {}, document.getElementById(nameTable));

	//Tabla titulo
	createElement(
		"tr",
		"",
		{},
		document.querySelector("#" + nameTable + " table")
	);
	arrKeys.forEach((element) => {
		createElement(
			"th",
			element,
			{},
			document.querySelector("#" + nameTable + " table tr")
		);
	});

	for (var i = 0; i < arr.length; i++) {
		createElement(
			"tr",
			"",
			{},
			document.querySelector("#" + nameTable + " table")
		);
		for (var j = 0; j < arrKeys.length; j++) {
			createElement(
				"td",
				obtenerValor(arr[i], arrKeys[j]),
				{},
				document.querySelector("#" + nameTable + " table tr:last-child")
			);
		}
	}
}
// Función para procesar los datos importados
function procesarDatos(datos) {
	// Hacer algo con los datos importados
	// {
	//     'class': 'mi-clase',
	//     'id': 'mi-id',
	//     'data-custom': 'valor personalizado'
	//   }

	createElement("header", "", {}, document.body);

	createElement(
		"h1",
		datos.nombre,
		{},
		document.getElementsByTagName("header")[0]
	);
	createElement(
		"h2",
		datos.titulo,
		{},
		document.getElementsByTagName("header")[0]
	);
	createElement(
		"h2",
		datos.resumen,
		{},
		document.getElementsByTagName("header")[0]
	);

	//Formación
	createElement("div", "", { class: "caja", id: "formacion" }, document.body);

	createElement("h1", "Formación", {}, document.getElementById("formacion"));

	createTable(datos.educacion, "formacion");

	//Formación
	createElement("div", "", { class: "caja", id: "works" }, document.body);

	createElement("h1", "Experiencias", {}, document.getElementById("works"));

	createTable(datos.experiencia, "works");

	//Habilidades
	createElement("div", "", { class: "caja", id: "skills" }, document.body);

	createElement("h1", "Soft skills", {}, document.getElementById("skills"));

	createElement("ul", "", {}, document.getElementById("skills"));

	datos.habilidades.forEach((element) => {
		createElement("li", element, {}, document.querySelector("#skills ul"));
	});
}

// Llamada a la función de lectura del archivo JSON
leerArchivoJSON("data.json").then(procesarDatos);
