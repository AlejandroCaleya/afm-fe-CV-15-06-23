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

function obtenerValor(json, key) {
	if (json.hasOwnProperty(key)) {
		return json[key];
	} else {
		return null; // o algún valor por defecto si la clave no existe en el JSON
	}
}

// Función para procesar los datos importados
function procesarDatos(datos) {
	let header = document.createElement("header");

	let nombre = document.createElement("h1");
	nombre.textContent = datos.nombre;
	header.appendChild(nombre);

	let titulo = document.createElement("h2");
	titulo.textContent = datos.titulo;
	header.appendChild(titulo);

	document.body.appendChild(header);

	let caja = document.createElement("div");

	caja.classList.add("caja");

	document.body.appendChild(caja);

	let tabla = document.createElement("table");
	let row = document.createElement("tr");
	let th1 = document.createElement("th");
	th1.textContent = "Institución";
	row.appendChild(th1);

	let th2 = document.createElement("th");
	th2.textContent = "Titulo";
	row.appendChild(th2);

	let th3 = document.createElement("th");
	th3.textContent = "Fecha";
	row.appendChild(th3);
	tabla.appendChild(row);

	datos.educacion.forEach((element) => {
		let row = document.createElement("tr");
		let td1 = document.createElement("td");
		td1.textContent = element.institucion;
		row.appendChild(td1);

		let td2 = document.createElement("td");
		td2.textContent = element.titulo;
		row.appendChild(td2);

		let td3 = document.createElement("td");
		td3.textContent = element.fecha;
		row.appendChild(td3);
		tabla.appendChild(row);
	});

	caja.appendChild(tabla);
}

// Llamada a la función de lectura del archivo JSON
leerArchivoJSON("data.json").then(procesarDatos);
