const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener("click",eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML();
    });

}


//funciones

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        let cursos = articulosCarrito.map(curso => {
            if(curso.id === cursoId){
                if(curso.cantidad > 1){
                    curso.cantidad --;
                    return curso;
                }
            }else{
                return curso;
            }
        });
        cursos = cursos.filter(curso => curso !== undefined);

        articulosCarrito=[...cursos];
        console.log(articulosCarrito);

        carritoHTML();
    }
}


function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//lee el contenido del HTML que le dimos click y eextrae la informacio ndel cus
function leerDatosCurso(curso){
    // console.log(curso);

    //crear un objeto con el contenido actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //verifica si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(iterador_curso => iterador_curso.id  === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id ===infoCurso.id){
                curso.cantidad ++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito=[...cursos];

    }else{
        //Agregamos elementos al arreglo del carrito
        articulosCarrito  = [...articulosCarrito, infoCurso]
    }

    //agrega elementos al arreglo carrito
    console.log(articulosCarrito)
    carritoHTML();

}


function carritoHTML(){
    //limpiar html
    limpiarHTML();


    //recorre el carrito y genera el html
    articulosCarrito.forEach((curso)=>{
        //destructurin
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">
                    X
                </a>
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    })
}

//elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta para limpiar html
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}