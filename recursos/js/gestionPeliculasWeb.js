// ===============================================================
//  SOLUCIÓN SIMULACRO — js/gestionPeliculasWeb.js
// ===============================================================

// Importación con nombre (también valdría: import * as gp from "./gestionPeliculas.js")
import {
    Pelicula,
    listarPeliculas,
    anyadirPelicula,
    borrarPelicula,
    calcularDuracionTotal
} from "./gestionPeliculas.js";

// Pequeña ayuda para no repetir createElement + className + textContent
function crear(etiqueta, clase, texto = "") {
    const el = document.createElement(etiqueta);
    el.className = clase;
    el.textContent = texto;
    return el;
}

function repintar() {
    const capa = document.getElementById("peliculas");
    capa.innerHTML = "";

    for (const peli of listarPeliculas()) {
        const div = crear("div", "pelicula");

        div.append(
            crear("div", "pelicula-titulo", peli.titulo),
            crear("div", "pelicula-duracion", peli.duracion),
            crear("div", "pelicula-fecha", peli.mostrarFecha())
        );

        const divGeneros = crear("div", "pelicula-generos");
        for (const g of peli.generos) {
            divGeneros.append(crear("span", "pelicula-genero", g));
        }
        div.append(divGeneros);

        const boton = crear("button", "pelicula-borrar", "Borrar");
        boton.type = "button";
        // Objeto manejador: cada botón tiene SU objeto con SU película
        const manejador = new BorrarHandle();
        manejador.pelicula = peli;
        boton.addEventListener("click", manejador);
        div.append(boton);

        capa.append(div);
    }

    document.getElementById("total").textContent =
        `Duración total: ${calcularDuracionTotal()} min`;
}

function anyadirPeliculaWeb(evento) {
    evento.preventDefault();
    const form = evento.currentTarget;

    const titulo = form.elements.titulo.value;
    const duracion = Number(form.elements.duracion.value); // "148" -> 148
    const fecha = form.elements.fecha.value;               // "aaaa-mm-dd"
    const generos = form.elements.generos.value
        .split(",")             // "a, b,,c" -> ["a", " b", "", "c"]
        .map(g => g.trim())     // quita espacios
        .filter(g => g !== ""); // quita vacíos (los repetidos los quita el constructor)

    anyadirPelicula(new Pelicula(titulo, duracion, fecha, ...generos));

    form.reset();
    repintar();
}

// Función constructora de objetos manejadores de eventos.
// addEventListener acepta un objeto con método handleEvent; dentro, `this`
// es el propio objeto manejador, así que tenemos acceso a this.pelicula.
function BorrarHandle() {
    this.handleEvent = function (evento) {
        borrarPelicula(this.pelicula.id);
        repintar();
    };
}

document.getElementById("crearpelicula").addEventListener("submit", anyadirPeliculaWeb);

repintar(); // para que #total muestre "Duración total: 0 min" desde el principio
