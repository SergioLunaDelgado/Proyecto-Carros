/* Variables */
const resultado = document.querySelector('#resultado');
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const max = new Date().getFullYear();
const min = max - 10;

/* Generar un objeto con la busqueda */
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

const handleChange = (e, propiedad) => {
    datosBusqueda[propiedad] = e.target.value;
    filtrarAuto();
};

/* Event listener para los select de busqueda */
marca.addEventListener('change', e => { handleChange(e, 'marca') });
year.addEventListener('change', e => { handleChange(e, 'year') });
minimo.addEventListener('change', e => { handleChange(e, 'minimo') });
maximo.addEventListener('change', e => { handleChange(e, 'maximo') });
puertas.addEventListener('change', e => { handleChange(e, 'puertas') });
transmision.addEventListener('change', e => { handleChange(e, 'transmision') });
color.addEventListener('change', e => { handleChange(e, 'color') });

document.addEventListener('DOMContentLoaded', () => {
    /* Muestra los autos al cargar */
    mostrarAutos(autos);
    /* llena las opciones de años */
    llenarSelect();
});

/* El arreglo de autos viene del otro archivo de js */
function mostrarAutos(autos) {
    limpiarHTML();
    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión ${transmision} - Precio: $${precio} - Color: ${color}`;
        /* Insertar en el html */
        resultado.appendChild(autoHTML);
    });
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

/* Funcion que filtra en base a la busqueda - Funcion de alto nivel */
function filtrarAuto() {
    /* Es posible concatenar filters */
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultados();
    }
}

function noResultados() {
    limpiarHTML();
    const sinResultados = document.createElement('div');
    sinResultados.textContent = 'No coinciden resultados';
    sinResultados.classList.add('alerta', 'error');
    resultado.appendChild(sinResultados);
}

function filtrarMarca(auto) {
    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}
function filtrarYear(auto) {
    if (datosBusqueda.year) {
        return auto.year === parseInt(datosBusqueda.year);
    }
    return auto;
}
function filtrarMinimo(auto) {
    if (datosBusqueda.minimo) {
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}
function filtrarMaximo(auto) {
    if (datosBusqueda.maximo) {
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    if (datosBusqueda.puertas) {
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return auto;
}
function filtrarTransmision(auto) {
    if (datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}
function filtrarColor(auto) {
    if (datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    }
    return auto;
}
