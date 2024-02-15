    const carrito = document.getElementById(`carrito`);
const elementos1 = document.getElementById(`lista-1`);

const lista = document.querySelector(`#lista-carrito tbody`);
const vaciarCarritoBtn =  document.getElementById(`vaciar-carrito`);

function cargarEventListeners(){
    const elementos1 = document.getElementById('elementos1');
    const carrito = document.getElementById('carrito');
    const vaciarCarritoBtn = document.getElementById('vaciarCarritoBtn');
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');

    if(elementos1) {
        elementos1.addEventListener(`click`, comprarElemento);
    }
    if(carrito) {
        carrito.addEventListener(`click`, eliminarElement);
    }
    if(vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener(`click`, vaciarCarrito);
    }
    if(botonesAgregarCarrito.length > 0) {
        botonesAgregarCarrito.forEach(function(boton) {
            boton.addEventListener('click', comprarElemento);
        });
    }
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}



function comprarElemento (e) {
    e.preventDefault();
    if(e.target.classList.contains(`agregar-carrito`)) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElmento = {
        imagen: elemento.querySelector(`img`).src,
        titulo: elemento.querySelector(`h3`).textContent,
        precio: elemento.querySelector(`.precio`).textContent, 
        id: elemento.querySelector(`a`).getAttribute(`data-id`)
    }

    insertarCarrito(infoElmento);
}


function insertarCarrito(elemento){
    const row = document.createElement('tr');
row.innerHTML = `
<td>
<img src="${elemento.imagen}" style="width: 70px"> 
</td>

<td>
${elemento.precio}
</td>

<td >
<div class="d-flex justify-content-center m-3">
    <button class="btn btn-danger decrementar" data-id="${elemento.id}">-</button>
    <input type="number" name="cantidad" value="1" min="1" data-id="${elemento.id}" class="cantidad" style="width: 50px;" readonly>
    <button class="btn btn-danger incrementar" data-id="${elemento.id}">+</button>
</div>
</td>
<td>
 <a href="#" class="borrar" data-id="${elemento.id}">x</a>
</td>
    
`;
    lista.appendChild(row);
    elemento.cantidad = 1;
    guardarElementoLocalStorage(elemento);
    actualizarTotal();

    row.querySelector('.incrementar').addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        const inputCantidad = document.querySelector(`.cantidad[data-id="${id}"]`);
        let cantidad = parseInt(inputCantidad.value);
        cantidad++;
        inputCantidad.value = cantidad;
        actualizarTotal(id, cantidad);
    });

    row.querySelector('.decrementar').addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        const inputCantidad = document.querySelector(`.cantidad[data-id="${id}"]`);
        let cantidad = parseInt(inputCantidad.value);
        if (cantidad > 1) {
            cantidad--;
            inputCantidad.value = cantidad;
            actualizarTotal(id, cantidad);
        }
    });

    
}




function leerLocalStorage() {
    let elementosLS;
    elementosLS = obtenerElementosLocalStorage();
    elementosLS.forEach(function(elemento){
                const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${elemento.imagen}" style="width: 70px"> 
            </td>
            
            <td>
                ${elemento.precio}
            </td>
            
            <td >
                <div class="d-flex justify-content-center m-3">
                    <button class="btn btn-danger decrementar" data-id="${elemento.id}">-</button>
                    <input type="number" name="cantidad" value="1" min="1" data-id="${elemento.id}" class="cantidad" style="width: 50px;" readonly>
                    <button class="btn btn-danger incrementar" data-id="${elemento.id}">+</button>
                </div>
            </td>
            <td>
                 <a href="#" class="borrar" data-id="${elemento.id}">x</a>
            </td>
           
        `;

        lista.appendChild(row);

        row.querySelector('.incrementar').addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const inputCantidad = document.querySelector(`.cantidad[data-id="${id}"]`);
            let cantidad = parseInt(inputCantidad.value);
            cantidad++;
            inputCantidad.value = cantidad;
            actualizarTotal(id, cantidad);
        });


        row.querySelector('.decrementar').addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const inputCantidad = document.querySelector(`.cantidad[data-id="${id}"]`);
            let cantidad = parseInt(inputCantidad.value);
            if (cantidad > 1) {
                cantidad--;
                inputCantidad.value = cantidad;
                actualizarTotal(id, cantidad);
            }
        });

        
    });
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

function actualizarTotal(id, cantidad) {
    let elementosLS = obtenerElementosLocalStorage();
    let total = 0;
    for(let i = 0; i < elementosLS.length; i++) {
        if(elementosLS[i].id === id) {
            elementosLS[i].cantidad = cantidad;
        }
        let precio = parseFloat(elementosLS[i].precio.replace(/[^0-9.-]+/g,""));
        if (isNaN(precio)) {
            console.log('El precio del elemento con id ' + elementosLS[i].id + ' no es un número.');
            continue;
        }
        if (isNaN(elementosLS[i].cantidad)) {
            console.log('La cantidad del elemento con id ' + elementosLS[i].id + ' no es un número.');
            continue;
        }
        total += precio * elementosLS[i].cantidad;
    }
    localStorage.setItem('elementos', JSON.stringify(elementosLS));
    localStorage.setItem('total', total.toFixed(0)); // Guardar el total en el localStorage
    let totalFormateado = formatNumber(total.toFixed(0));
    document.getElementById('total').textContent = 'Total: $' + totalFormateado;
}










function guardarElementoLocalStorage(elemento) {
    let elementos;
    elementos = obtenerElementosLocalStorage();
    elementos.push(elemento);
    localStorage.setItem('elementos', JSON.stringify(elementos));
}

function obtenerElementosLocalStorage() {
    let elementos;
    if(localStorage.getItem('elementos') === null) {
        elementos = [];
    } else {
        elementos = JSON.parse(localStorage.getItem('elementos'));
    }
    return elementos;
}

function vaciarLocalStorage() {
    localStorage.clear();
}




function eliminarElementoLocalStorage(elementoId) {
    let elementosLS;
    elementosLS = obtenerElementosLocalStorage();
    elementosLS.forEach(function(elementoLS, index){
        if(elementoLS.id === elementoId){
            elementosLS.splice(index, 1);
        }
    });
    localStorage.setItem('elementos', JSON.stringify(elementosLS));
}

function vaciarCarrito(e) {
    e.preventDefault();
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    vaciarLocalStorage();
    actualizarTotal();
    return false;
}

function eliminarElement(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        eliminarElementoLocalStorage(e.target.getAttribute('data-id'));
        actualizarTotal();
    }
}



cargarEventListeners();

    
 
