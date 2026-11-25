# Chuleta DWEC: 1ª evaluación (versión completa)

Índice
1. Orden de trabajo en el examen
2. Fundamentos: variables, tipos y operadores
3. Strings
4. Números y Math
5. Arrays (crear, recorrer, modificar, buscar, transformar)
6. Objetos
7. Funciones
8. Condicionales, bucles y errores
9. Fechas
10. Función constructora, `this`, prototipos y clases
11. Módulos (import / export)
12. DOM: seleccionar y crear HTML desde JS
13. Eventos
14. Formularios
15. Node, npm y tests
16. Git y GitHub
17. Errores típicos
18. Documentación

---

## 1. Orden de trabajo en el examen
1. `git clone URL` → `cd carpeta` → `npm install` → `npm run test`
2. **Lee lo que piden los tests**: el mensaje de error te dice qué falta.
3. Haz primero la lógica (`js/xxx.js`), después el HTML y por último la parte web (`js/xxxWeb.js`).
4. Haz `git add . && git commit -m "..." && git push` **después de cada apartado** y otra vez al final. Comprueba en la web de GitHub que los cambios están subidos.
5. Los tests valen 8 puntos y la calidad del código 2: nombres claros, nada de código repetido, `const` y `let` (no `var`) y sin `console.log` de prueba.

---

## 2. Fundamentos

### Variables
```js
const PI = 3.14;      // no se puede reasignar (pero un array u objeto const SÍ se puede modificar por dentro)
let contador = 0;     // se puede reasignar
contador = contador + 1;   contador++;   contador += 5;
// var: antigua, no la uses
```
Regla: usa `const` siempre, y `let` solo si la variable va a cambiar.

### Tipos de datos
| Tipo | Ejemplo | `typeof` |
|---|---|---|
| number | `5`, `3.14`, `-2`, `NaN`, `Infinity` | `"number"` |
| string | `"hola"`, `'hola'`, `` `hola` `` | `"string"` |
| boolean | `true`, `false` | `"boolean"` |
| undefined | variable sin valor asignado | `"undefined"` |
| null | "vacío a propósito" | `"object"` (error histórico del lenguaje) |
| object | `{}`, `[]`, `new Date()` | `"object"` |
| function | `function() {}` | `"function"` |

Para distinguir un array de un objeto: `Array.isArray(x)` (porque `typeof []` es `"object"`).

### Operadores de comparación: `===` frente a `==`
| Operador | Significado |
|---|---|
| `===` | **igual estricto**: mismo valor **y mismo tipo**. `5 === 5` ✔, `5 === "5"` ✘ |
| `!==` | **distinto estricto**. `5 !== "5"` ✔ |
| `==` | igual **con conversión de tipo**: `5 == "5"` ✔, `0 == false` ✔, `null == undefined` ✔. **Evítalo.** |
| `!=` | distinto con conversión. Evítalo. |
| `<` `>` `<=` `>=` | menor, mayor, menor o igual, mayor o igual |

Con **objetos y arrays**, `===` compara la **referencia**, no el contenido:
```js
[1,2] === [1,2]      // false (son dos arrays distintos)
const a = [1,2]; const b = a;
a === b              // true (es el mismo array)
```
`NaN === NaN` es `false`: para detectar NaN usa `Number.isNaN(x)`.

### Operadores lógicos y otros
| Operador | Significado | Ejemplo |
|---|---|---|
| `&&` | Y (los dos) | `edad >= 18 && tieneCarnet` |
| `\|\|` | O (alguno) | `a \|\| b` → devuelve `a` si es truthy; si no, `b` |
| `!` | NO (niega) | `!activo` |
| `??` | si es `null` o `undefined`, usa el valor de la derecha | `nombre ?? "anónimo"` |
| `?.` | acceso opcional (no falla si es null/undefined) | `persona?.direccion?.calle` |
| `? :` | ternario | `edad >= 18 ? "adulto" : "menor"` |
| `%` | resto de la división | `7 % 2` → `1` (útil para saber si un número es par) |
| `**` | potencia | `2 ** 3` → `8` |

`+` **con strings concatena**: `"5" + 2` → `"52"`, pero `"5" - 2` → `3`. Por eso hay que convertir con `Number()`.

### Truthy y falsy
Estos valores cuentan como **falso** en un `if`: `false`, `0`, `""` (cadena vacía), `null`, `undefined`, `NaN`. **Todo lo demás es verdadero**, incluidos `"0"`, `[]` y `{}`.
```js
if (texto) { ... }     // true si texto no es "" / null / undefined
```

### Conversiones
```js
Number("12")       // 12
Number("")         // 0   (¡cuidado!)
Number("abc")      // NaN
parseInt("12px")   // 12   (lee hasta donde puede)
parseFloat("3.5€") // 3.5
String(12)  /  (12).toString()   // "12"
Boolean("")        // false
+"12"              // 12 (truco corto)
```

---

## 3. Strings
```js
const s = "Hola Mundo";
s.length                 // 10
s[0]  /  s.charAt(0)     // "H"
s.toUpperCase()  s.toLowerCase()
s.trim()                 // quita espacios del principio y del final
s.includes("Mun")        // true
s.startsWith("Ho")  s.endsWith("do")
s.indexOf("o")           // 1 (primera posición; -1 si no está)
s.slice(0, 4)            // "Hola"   (desde 0 hasta 4, sin incluir el 4)
s.slice(-5)              // "Mundo"
s.replace("Mundo", "JS") // cambia solo la primera aparición
s.replaceAll("o", "0")   // cambia todas
s.split(" ")             // ["Hola", "Mundo"]
s.split(",")             // separa por comas → array
s.padStart(5, "0")       // "7".padStart(3,"0") → "007"
"ab".repeat(3)           // "ababab"
```
**Plantillas** (comillas invertidas `` ` ``): permiten variables y expresiones, y varias líneas.
```js
`Libro ${l.nombre}, ${l.precio * 2} euros`
```
Los strings **no se modifican**: todos los métodos devuelven un string nuevo (`s.toUpperCase()` no cambia `s`).

---

## 4. Números y Math
```js
Math.round(2.5)  // 3        Math.floor(2.9) // 2 (hacia abajo)     Math.ceil(2.1) // 3 (hacia arriba)
Math.max(1, 5, 3)  // 5      Math.min(...[4, 2, 8])  // 2  (spread con un array)
Math.abs(-4)  // 4           Math.random()  // número entre 0 y 1
(3.14159).toFixed(2)  // "3.14" ← ¡devuelve un STRING!
Number.isNaN(x)  Number.isInteger(x)
0.1 + 0.2  // 0.30000000000000004 (error de coma flotante, es normal)
```
Número aleatorio entero entre 1 y 10: `Math.floor(Math.random() * 10) + 1`.

---

## 5. Arrays

### Crear
```js
const vacio = [];
const nums = [1, 2, 3];
const mezcla = ["a", 1, true, { x: 1 }, [1, 2]];     // admite cualquier tipo
const copia = [...nums];                              // copia (spread)
const unidos = [...nums, 4, 5];                       // [1,2,3,4,5]
const de10 = Array.from({ length: 10 }, (_, i) => i); // [0,1,...,9]
const letras = Array.from("hola");                    // ["h","o","l","a"]
const partes = "a,b,c".split(",");                    // ["a","b","c"]
const sinRepes = [...new Set([1, 1, 2])];             // [1, 2]
```

### Acceder
```js
nums[0]               // primer elemento (los índices empiezan en 0)
nums[nums.length - 1] // último
nums.at(-1)           // último (forma moderna)
nums.length           // cuántos elementos hay
const [a, b] = nums;  // desestructuración: a=1, b=2
```

### Modificar (estos métodos CAMBIAN el array original)
```js
arr.push(x)          // añade al final (devuelve la nueva longitud)
arr.pop()            // quita el último y lo devuelve
arr.unshift(x)       // añade al principio
arr.shift()          // quita el primero y lo devuelve
arr.splice(pos, n)   // borra n elementos desde pos
arr.splice(pos, 0, x)// inserta x en pos sin borrar nada
arr.sort(...)  arr.reverse()
arr.length = 0       // vaciar el array
```

### Buscar
```js
arr.includes(x)                  // ¿está? → true/false (valores simples)
arr.indexOf(x)                   // posición, o -1
arr.find(o => o.id === 3)        // el PRIMER elemento que cumple (o undefined)
arr.findIndex(o => o.id === 3)   // su posición (o -1)
arr.some(o => o.precio > 10)     // ¿alguno cumple? → boolean
arr.every(o => o.precio > 10)    // ¿todos cumplen? → boolean
```

### Transformar (estos devuelven un array NUEVO y no tocan el original)
```js
arr.filter(o => o.precio > 10)               // los que cumplen la condición
arr.map(o => o.nombre)                       // transforma cada elemento
arr.slice(1, 3)                              // copia de la posición 1 a la 3 (sin incluir la 3)
arr.concat(otro)                             // unir arrays
arr.reduce((acc, o) => acc + o.precio, 0)    // reducir a un solo valor (suma, máximo, contar...)
arr.join(", ")                               // array → string
arr.flat()                                   // aplana [[1],[2]] → [1,2]
```
`reduce(función(acumulador, elemento), valorInicial)`: pon **siempre** el valor inicial.
```js
// ejemplos de reduce
nums.reduce((acc, n) => acc + n, 0)                   // suma
nums.reduce((max, n) => n > max ? n : max, -Infinity) // máximo
palabras.reduce((acc, p) => { acc[p] = (acc[p] ?? 0) + 1; return acc; }, {})  // contar
```

### Ordenar
```js
[3, 10, 2].sort()                     // ["10", "2", "3"] ← ¡por defecto ordena como TEXTO!
nums.sort((a, b) => a - b)            // numérico, menor a mayor
nums.sort((a, b) => b - a)            // mayor a menor
libros.sort((a, b) => a.fecha - b.fecha)             // por una propiedad numérica
libros.sort((a, b) => a.nombre.localeCompare(b.nombre)) // por texto (respeta tildes y la ñ)
const ordenado = [...arr].sort(...)   // sort MODIFICA el original: ordena una copia si no quieres tocarlo
```

### Recorrer
```js
for (const x of arr) { ... }                 // valores  ← el más cómodo
for (let i = 0; i < arr.length; i++) { arr[i] }   // con índice
arr.forEach((x, i) => { ... })               // no se puede usar break; no devuelve nada
for (const [i, x] of arr.entries()) { ... }  // valor e índice
// for...in recorre ÍNDICES como strings (y propiedades de objetos): evítalo en arrays
```

### Sin duplicados
```js
if (!arr.includes(x)) arr.push(x);
const unicos = [...new Set(arr)];
```

### Borrar un elemento por valor o por id
```js
const pos = arr.findIndex(o => o.id === id);
if (pos !== -1) arr.splice(pos, 1);
// otra forma (crea un array nuevo; solo vale si la variable es `let`):
lista = lista.filter(o => o.id !== id);
```
Un array declarado con `const` **sí se puede modificar por dentro** (`push`, `splice`...); lo que no se puede es hacer `lista = ...`.

### Copiar: ojo
```js
const b = a;            // NO copia: a y b son el MISMO array
const c = [...a];       // copia superficial: los objetos de dentro siguen compartidos
const d = structuredClone(a); // copia profunda
```

---

## 6. Objetos
```js
const libro = { nombre: "Drácula", paginas: 400, autor: { nombre: "Bram" } };

libro.nombre           libro["nombre"]            // acceso (los corchetes sirven con variables: libro[clave])
libro.paginas = 450;                              // modificar
libro.isbn = "123";                               // añadir propiedad
delete libro.paginas;                             // borrar propiedad
"isbn" in libro        libro.hasOwnProperty("isbn")   // ¿existe la propiedad?
libro.autor?.nombre                               // acceso seguro

Object.keys(libro)     // ["nombre", "autor", "isbn"]
Object.values(libro)
Object.entries(libro)  // [["nombre","Drácula"], ...]
for (const [clave, valor] of Object.entries(libro)) { ... }
for (const clave in libro) { libro[clave] }       // for...in sí vale para objetos

// Desestructuración y spread
const { nombre, isbn } = libro;                   // extrae propiedades en variables
const { nombre: titulo } = libro;                 // y las renombra
const copia = { ...libro, paginas: 500 };         // copia cambiando una propiedad

// Atajo: si la variable se llama como la propiedad
const nombre2 = "X"; const o = { nombre2 };       // { nombre2: "X" }

// Métodos
const persona = { nombre: "Ana", saludar() { return `Hola ${this.nombre}`; } };

// JSON
JSON.stringify(libro)      // objeto → string
JSON.parse(texto)          // string → objeto
```
Igual que con los arrays, un objeto `const` se puede modificar por dentro.

---

## 7. Funciones
```js
// 1. Declaración (se puede usar antes de definirla: "hoisting")
function suma(a, b) { return a + b; }

// 2. Expresión
const suma2 = function (a, b) { return a + b; };

// 3. Flecha
const suma3 = (a, b) => a + b;        // una línea: devuelve el resultado directamente
const doble = n => n * 2;             // un parámetro: sin paréntesis
const crear = () => ({ x: 1 });       // para devolver un objeto: entre paréntesis
const saludar = (n) => { console.log(n); return n; };  // con llaves hay que poner return
```
- Sin `return`, la función devuelve `undefined`.
- **Parámetros por defecto:** `function f(a, b = 10) {}`
- **Rest** (recoge el resto de argumentos en un array): `function f(a, ...resto) {}`
- **Spread** (esparce un array como argumentos): `f(...[1, 2, 3])`, `Math.max(...nums)`
- **Desestructurar parámetros:** `function f({ min, max } = {}) {}`
- **Callback:** una función que se pasa como argumento (`arr.map(x => x * 2)`, `addEventListener("click", fn)`).
- **Cuidado al pasar funciones:** `boton.addEventListener("click", miFuncion)` ✔ — `miFuncion()` ✘ (la ejecutaría en el momento).

### Ámbito (scope) y closures
```js
let global = 1;                    // visible en todo el fichero (o módulo)
function f() { let local = 2; }    // `local` solo existe dentro de f
if (true) { let x = 1; }           // let/const tienen ámbito de BLOQUE; fuera del if, x no existe
```
**Closure:** una función "recuerda" las variables del lugar donde se creó.
```js
function crearContador() {
    let n = 0;
    return function () { n++; return n; };   // recuerda n
}
const c = crearContador(); c(); // 1
c();                            // 2
```

---

## 8. Condicionales, bucles y errores
```js
if (a > 5) { ... } else if (a > 2) { ... } else { ... }

switch (opcion) {
    case "a": ...; break;       // sin break, sigue ejecutando el siguiente case
    case "b": ...; break;
    default: ...;
}

for (let i = 0; i < 5; i++) { }          // 0..4
while (cond) { }                         // mientras se cumpla
do { } while (cond);                     // al menos una vez
break;     // sale del bucle
continue;  // salta a la siguiente vuelta

try {
    JSON.parse("esto no es json");
} catch (e) {
    console.log(e.message);
} finally { /* se ejecuta siempre */ }
throw new Error("Algo salió mal");       // lanzar un error
```
`console.log(x)` y `console.table(arr)` sirven para depurar. La consola del navegador se abre con F12.

---

## 9. Fechas
```js
Date.parse("2022-03-07")       // 1646611200000 (ms desde 1970; NaN si no es válida)
Date.now()                     // ahora, en ms
new Date()                     // fecha y hora actuales
new Date(1646611200000)        // desde un timestamp
new Date("2022-03-07")         // desde un texto
d.getTime()                    // → timestamp
d.getFullYear()  d.getMonth()  // ¡el mes va de 0 (enero) a 11 (diciembre)!
d.getDate()      d.getDay()    // día del mes (1-31) / día de la semana (0 = domingo)
d.toLocaleDateString()         // "7/3/2022"  (en Madrid: día/mes/año)
d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })  // "7 de marzo de 2022"
d.toLocaleTimeString()  d.toLocaleString()
d.toISOString().slice(0, 10)   // "2022-03-07" (para poner en un input date)
```
- Comprobar fecha válida: `Number.isNaN(Date.parse(texto))`
- Diferencia en días: `(fecha2 - fecha1) / (1000 * 60 * 60 * 24)`
- Un texto `"aaaa-mm-dd"` se interpreta en **UTC**: por eso `Date.parse("2022-03-07")` da exactamente `1646611200000`.
- En España, con fechas muy antiguas (1897) `toLocaleDateString()` puede mostrar un día menos. Es una rareza del huso horario de la época.

---

## 10. Función constructora, `this`, prototipos y clases
```js
function Libro(nombre, isbn, fecha, ...etiquetas) {
    this.nombre = nombre;                    // propiedades
    this.isbn = isbn;
    this.fecha = Date.parse(fecha);          // "2022-03-07" → timestamp
    this.etiquetas = etiquetas;              // [] si no se pasa ninguna
    this.imprimirFecha = function () {       // método: con `function`, NO con flecha
        return new Date(this.fecha).toLocaleDateString();
    };
}
const l = new Libro("Drácula", "978-...", "1897-05-26", "terror");   // ¡`new` es obligatorio!
l instanceof Libro   // true
```
- Sin `new`, `this` no apunta al objeto nuevo y falla.
- Un método escrito como **función flecha** no tiene `this` propio: usa `function`.
- **Prototipo** (los métodos se comparten entre todos los objetos en lugar de copiarse en cada uno):
```js
Libro.prototype.imprimirFecha = function () { return new Date(this.fecha).toLocaleDateString(); };
```
- **Clase** (es lo mismo con una sintaxis más cómoda; si el enunciado pide "función constructora", usa la función):
```js
class Libro {
    constructor(nombre, fecha) { this.nombre = nombre; this.fecha = Date.parse(fecha); }
    imprimirFecha() { return new Date(this.fecha).toLocaleDateString(); }
}
```
- Validar en el constructor: `typeof d === "number" && d >= 0 ? d : 0`.
- Añadir una propiedad después: `l.id = 5`.
- **Qué es `this`:** en un método, el objeto al que pertenece (`l.imprimirFecha()` → `this` es `l`). Si sacas el método y lo llamas suelto, se pierde. En una manejadora de evento con `function`, `this` es el elemento (`currentTarget`). En una flecha, `this` es el de fuera.

---

## 11. Módulos (import / export)
```js
// gestion.js
function a() {}  function b() {}
export { a, b };                       // exportación con nombre (se puede exportar mucho)
export function c() {}                 // también se puede exportar al declarar
// export default algo;                // exportación por defecto (solo una por fichero)

// web.js
import { a, b } from "./gestion.js";        // ¡con ./ y con la extensión .js!
import * as gestion from "./gestion.js";    // gestion.a(), gestion.b()
import { a as otraA } from "./gestion.js";  // renombrar
import algo from "./gestion.js";            // importar el default (sin llaves)
```
```html
<script type="module" src="js/web.js"></script>
```
- Los módulos **no funcionan con doble clic (`file://`)**: usa Live Server o `npx serve`.
- Un `<script type="module">` se ejecuta **tras cargar el DOM**, así que puedes usar `getElementById` directamente.
- Las variables de un módulo **no son globales**: `libros` no existe en la consola.
- Lo que importas es **de solo lectura**: no puedes hacer `libros = []` desde otro fichero (por eso se hacen funciones como `vaciarLibros`).
- `module.exports` / `require` es la sintaxis antigua de Node (CommonJS), como en `operations.js`. **No la mezcles** con `export` / `import`. Para usar `import` en Node pon `"type": "module"` en `package.json`.

---

## 12. DOM: seleccionar y crear HTML desde JS

### Seleccionar
```js
document.getElementById("libros")          // por id (sin #)
document.querySelector("#libros")          // el primero que cumple un selector CSS
document.querySelector(".libro")           // por clase
document.querySelector("#formulario form") // anidado
document.querySelectorAll(".libro")        // TODOS (NodeList: admite for...of y forEach)
elemento.querySelector(".x")               // buscar solo dentro de un elemento
elemento.closest(".libro")                 // el ancestro más cercano que cumple el selector
elemento.parentElement   elemento.children
```

### Crear y modificar
```js
const capa = document.getElementById("libros");
capa.innerHTML = "";                              // ¡vaciar antes de repintar!

const div = document.createElement("div");
div.className = "libro";                          // o: div.classList.add("libro")
div.textContent = `Libro ${l.nombre}`;            // texto seguro
div.setAttribute("data-id", l.id);                // atributo; se lee con div.dataset.id
div.id = "x";     div.title = "Hola";             // atributos habituales como propiedades
div.style.color = "red";
div.classList.add("a");  div.classList.remove("a");  div.classList.toggle("a");  div.classList.contains("a");

capa.append(div, otro);      // añade al final (admite varios elementos y textos)
capa.prepend(div);           // al principio
div.remove();                // quitar un elemento
```
- `textContent` pone **texto**; `innerHTML` interpreta **HTML** (y es peligroso si mete texto del usuario).
- Con plantilla (rápido, pero no puedes añadir listeners a lo que has metido como texto):
```js
capa.innerHTML += `<div class="libro">${l.nombre}</div>`;
```
`+=` sobre `innerHTML` **destruye los listeners** de los elementos ya existentes dentro de esa capa. Si hay botones con eventos, usa `createElement`.
- Genera el **texto exacto** que pide el enunciado (comas, espacios, mayúsculas): los tests lo comparan carácter a carácter. Usa `.trim()` al comparar si quieres evitar problemas.

---

## 13. Eventos
```js
elemento.addEventListener("click", manejadora);   // ¡sin paréntesis!
elemento.removeEventListener("click", manejadora);

function manejadora(evento) {
    evento.preventDefault();      // anula el comportamiento por defecto (en submit: que no recargue)
    evento.target;                // elemento donde ocurrió el evento (puede ser un hijo)
    evento.currentTarget;         // elemento que tiene el listener (en submit: el form)
    evento.key;                   // en keydown: la tecla pulsada
    evento.stopPropagation();     // evita que el evento suba al padre
}
```
Eventos habituales: `click`, `dblclick`, `submit`, `input` (cada vez que se escribe), `change` (al confirmar o salir del campo), `focus`, `blur`, `keydown`, `keyup`, `mouseover`, `DOMContentLoaded`.

### Objeto manejador (patrón del gestor de presupuesto)
`addEventListener` acepta un **objeto con un método `handleEvent`**; dentro, `this` es ese objeto.
```js
function BorrarHandle() {
    this.handleEvent = function (evento) {
        borrarGasto(this.gasto.id);   // this = el objeto manejador (tiene la propiedad gasto)
        repintar();
    };
}
const h = new BorrarHandle();
h.gasto = gasto;                      // cada botón tiene su objeto con SU gasto
boton.addEventListener("click", h);   // se pasa el OBJETO, no se llama a handleEvent
```

### Alternativas para saber a qué elemento pertenece el evento
```js
// Con un closure (cada vuelta del for...of crea su propia `peli`)
boton.addEventListener("click", () => borrarPelicula(peli.id));
// Con data-attributes
boton.dataset.id = peli.id;  // y en la manejadora: Number(evento.currentTarget.dataset.id)
```
- **Delegación de eventos:** un solo listener en el padre y `evento.target.closest(".borrar")` para saber qué botón se ha pulsado.

---

## 14. Formularios
```js
const form = evento.currentTarget;                // o document.getElementById("crearlibro")
form.elements.nombre.value                        // por name o id (también vale form.nombre.value)
Number(form.elements.precio.value)                // ¡value SIEMPRE es string! Conviértelo
form.elements.fecha.value                         // input date → "aaaa-mm-dd" ("" si está vacío)
form.elements.acepto.checked                      // checkbox → true / false
form.elements.genero.value                        // select o grupo de radios → valor seleccionado
form.elements.idioma.selectedOptions              // select multiple
form.reset();                                     // vaciar el formulario
form.elements.nombre.focus();                     // llevar el cursor a un campo

const datos = new FormData(form);                 // alternativa
datos.get("nombre");
Object.fromEntries(datos);                        // { nombre: "...", isbn: "...", fecha: "..." }
```
```html
<form id="crearlibro">
  <label for="nombre">Nombre</label>
  <input type="text"     id="nombre" name="nombre">
  <input type="number"   id="precio" name="precio" step="0.01" min="0">
  <input type="date"     id="fecha"  name="fecha">
  <input type="checkbox" id="acepto" name="acepto">
  <select id="genero" name="genero"><option value="a">A</option></select>
  <button type="submit">Añadir</button>
</form>
```
- Si el test pide `id` **y** `name`, pon los dos.
- Un `<button>` dentro de un `<form>` es de tipo `submit` por defecto. Si no debe enviar el formulario, pon `type="button"`.
- Eventos del formulario: `submit` en el `<form>` (no en el botón).
- Texto con elementos separados por comas: `"a, b ,c".split(",").map(s => s.trim()).filter(s => s)` → `["a","b","c"]`.

---

## 15. Node, npm y tests
```bash
node --version            # comprobar que Node está instalado
npm install               # instala las dependencias de package.json (crea node_modules/)
npm run test              # = npm test, ejecuta los tests definidos en "scripts"
node fichero.js           # ejecutar un fichero
npx serve                 # servidor local para el navegador
```
- `package.json` → `"scripts": { "test": "mocha" }`: define qué se ejecuta con `npm run test`.
- Si los tests dicen `Cannot find module`, comprueba la ruta, el nombre del fichero (mayúsculas incluidas) y que hayas hecho `npm install`.
- Los tests típicos usan `assert.equal(a, b)` o `should.equal(a, b)`: compara lo que **devuelve tu función** con lo esperado. Lee el mensaje: dice *esperado* y *obtenido*.
- Un test `it("...", () => {...})` falla cuando algo lanza un error.
- Nunca subas `node_modules/` a Git (va en `.gitignore`).

---

## 16. Git y GitHub
```bash
git config --global user.name "Nombre Apellido"
git config --global user.email "correo@ejemplo.com"
git config --list                 # comprobar la configuración

git init                          # crear un repositorio nuevo en la carpeta actual
git clone https://github.com/usuario/repo.git
cd repo
git status                        # ver qué ha cambiado
git add .                         # añadir todo al área de preparación (o: git add fichero.js)
git commit -m "Mensaje descriptivo"
git push                          # subir (la 1ª vez a veces: git push -u origin main)
git pull                          # bajar los cambios del remoto
git log --oneline                 # historial
git remote -v                     # a qué repositorio remoto apunta
git diff                          # ver los cambios sin añadir
git branch      git switch -c rama     # ver ramas / crear una rama
```
Flujo: **modificar → `git add` → `git commit` → `git push`**.
- Si GitHub pide contraseña al hacer push, **no vale la de la cuenta**: hay que usar un *Personal Access Token* o iniciar sesión por el navegador (Git Credential Manager).
- `git commit` sin `git add` previo no incluye los cambios.
- `rejected ... fetch first` → haz `git pull` y vuelve a hacer `git push`.
- Para conectar un repositorio local con uno remoto: `git remote add origin URL`.

---

## 17. Errores típicos
| Síntoma | Causa |
|---|---|
| `Cannot use import statement outside a module` | Falta `type="module"` en el script (o `"type": "module"` en package.json en Node) |
| `Failed to load module script` / error CORS | Has abierto el HTML con `file://`; usa un servidor |
| 404 al importar | Ruta mal o falta la extensión `.js` |
| `does not provide an export named X` | No has añadido X al `export { }` o está mal escrito |
| La página se recarga al enviar | Falta `evento.preventDefault()` |
| Se duplican elementos al repintar | Falta `capa.innerHTML = ""` |
| `this.x` es `undefined` en un método | Has usado una función flecha como método |
| `"100" + 5` da `"1005"` | `value` es string: usa `Number()` |
| `Cannot read properties of null` | El `id` del `getElementById` está mal o el elemento no existe todavía |
| `x is not a function` | Nombre mal escrito, no importado, o llamas a algo que no es una función |
| `x is not defined` | Variable sin declarar, mal escrita o fuera de ámbito |
| La manejadora se ejecuta al cargar la página | Has escrito `addEventListener("click", f())` en vez de `f` |
| `sort` ordena `[10, 2, 3]` mal | Falta la función `(a, b) => a - b` |
| `filter` / `map` "no hace nada" | Devuelven un array nuevo: hay que guardarlo (`arr = arr.filter(...)`) |
| `Assignment to constant variable` | Reasignas una `const`; usa `let` o modifica por dentro (`push`, etc.) |
| `if (a = 5)` siempre cumple | Un solo `=` asigna; para comparar usa `===` |
| `NaN` en un cálculo | Operación con `undefined` o con un texto no numérico |
| Los tests siguen en rojo tras arreglar | ¿Guardaste el fichero? ¿Exportas la función? ¿Mismo nombre exacto que pide el enunciado? |

---

## 18. Documentación útil (hay Internet en el examen)
- es.javascript.info: [módulos](https://es.javascript.info/modules), [arrays](https://es.javascript.info/array), [métodos de arrays](https://es.javascript.info/array-methods), [objetos](https://es.javascript.info/object-basics), [fechas](https://es.javascript.info/date), [eventos](https://es.javascript.info/events), [formularios](https://es.javascript.info/forms-controls), [documento](https://es.javascript.info/document)
- MDN (en español): developer.mozilla.org/es → Referencia de JavaScript (`Array`, `String`, `Date`, `Object`)
- Repo del gestor de presupuesto: https://github.com/elisanoguera/dwec-gestor-presupuesto (mismo profesor y mismo estilo de tests)
- Git: https://git-scm.com/book/es/v2
