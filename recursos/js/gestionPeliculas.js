// ===============================================================
//  SOLUCIÓN SIMULACRO — js/gestionPeliculas.js
// ===============================================================

let peliculas = [];
let idPelicula = 0;

// Función constructora con parámetro REST: ...generos recoge todos los
// argumentos que vengan después de fecha en un array (vacío si no hay).
function Pelicula(titulo, duracion, fecha, ...generos) {
    this.titulo = titulo;

    // typeof "100" es "string" -> no es número -> 0
    // (Number.isNaN descarta NaN, que también es de tipo "number")
    this.duracion = (typeof duracion === "number" && !Number.isNaN(duracion) && duracion >= 0)
        ? duracion
        : 0;

    // Date.parse devuelve NaN si la fecha no es válida (o es undefined)
    const ts = Date.parse(fecha);
    this.fecha = Number.isNaN(ts) ? Date.now() : ts;

    // ----- métodos -----
    this.mostrarFecha = function () {
        return new Date(this.fecha).toLocaleDateString();
    };

    this.mostrarPelicula = function () {
        return `Película "${this.titulo}" (${this.duracion} min), estrenada el ${this.mostrarFecha()}`;
    };

    this.anyadirGeneros = function (...nuevos) {
        for (const g of nuevos) {
            if (!this.generos.includes(g)) {
                this.generos.push(g);
            }
        }
    };

    this.borrarGenero = function (genero) {
        const pos = this.generos.indexOf(genero);
        if (pos !== -1) {
            this.generos.splice(pos, 1); // splice(posición, cuántos borrar)
        }
    };

    // Reutilizamos anyadirGeneros para no meter repetidos
    this.generos = [];
    this.anyadirGeneros(...generos); // spread: pasa el array como argumentos sueltos
}

function listarPeliculas() {
    return peliculas;
}

function anyadirPelicula(pelicula) {
    pelicula.id = idPelicula;
    idPelicula++;
    peliculas.push(pelicula);
}

function borrarPelicula(id) {
    const pos = peliculas.findIndex(p => p.id === id);
    if (pos !== -1) {
        peliculas.splice(pos, 1);
    }
    // Alternativa: peliculas = peliculas.filter(p => p.id !== id);
    // (funciona porque listarPeliculas() siempre devuelve la variable actual)
}

function calcularDuracionTotal() {
    // reduce(función(acumulador, elemento), valorInicial)
    return peliculas.reduce((total, p) => total + p.duracion, 0);
}

// Desestructuración del objeto de filtros: las propiedades que no vengan
// quedan como undefined y esa condición no se aplica.
function filtrarPeliculas({ duracionMinima, duracionMaxima, genero } = {}) {
    return peliculas.filter(p => {
        if (duracionMinima !== undefined && p.duracion < duracionMinima) return false;
        if (duracionMaxima !== undefined && p.duracion > duracionMaxima) return false;
        if (genero !== undefined) {
            const buscado = genero.toLowerCase();
            if (!p.generos.some(g => g.toLowerCase() === buscado)) return false;
        }
        return true;
    });
}

function vaciarPeliculas() {
    peliculas = [];
    idPelicula = 0;
}

export {
    Pelicula,
    listarPeliculas,
    anyadirPelicula,
    borrarPelicula,
    calcularDuracionTotal,
    filtrarPeliculas,
    vaciarPeliculas
};
