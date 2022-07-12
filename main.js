const formularioForm = document.getElementById("formulario");
const textoInput = document.getElementById("inputTexto");
const listaProductos = document.getElementById("lista");
const categoriaSelect = document.getElementById("selectCat");
const filtroObj = document.getElementById("filtro");
const detalleDiv = document.getElementById("detalleProducto");

var productosBuscados = [];

function categoriasProductosTienda() {
    $.ajax({
        url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
        data: { _nombreMetodo_: "categoriasProductosTienda" },
        method: "POST",
        headers: {
            Token: "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
            ApiKey: "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
        },
        success: function (resultados) {
            let selectCategoria = [];
            let selectTodos =
                "<option selected value=''>Cualquier Categoria</option>";
            selectCategoria.push(selectTodos);
            for (let i = 0; i < resultados.resultado.Table.length; i++) {
                let categoria = resultados.resultado.Table[i];
                let select = `               
                <option>${categoria.NOMBRE}</option>
                
                `;
                selectCategoria.push(select);
            }
            categoriaSelect.innerHTML = selectCategoria.join("");
        },
    });
}
categoriasProductosTienda();

formularioForm.onsubmit = function buscarProductosTienda(e) {
    e.preventDefault();
    let tnombre = textoInput.value;
    let tcat = categoriaSelect.value;
    $.ajax({
        url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
        data: {
            _nombreMetodo_: "buscarProductosTienda",
            NOMBRE: `${tnombre}`,
            CATEGORIA: `${tcat}`,
        },
        method: "POST",
        headers: {
            Token: "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
            ApiKey: "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
        },
        success: function (resultados) {
            productosBuscados = resultados.resultado.Table;
            let filtro = [];
            let filtroBoton = `
                <h4 class="my-auto mx-2">Ordenar por:</h4>
                <select id="selectFiltro" class="texto-med">
                    <option selected>Por nombre</option>
                    <option >Por menor precio</option>
                </select>
                <button class="mx-2 btn btn-primary my-3 my-sm-0" onclick="ordenarProductos(selectFiltro.value)"><h4 class="my-auto">Ordenar</h4></button>
                `;
            filtro.push(filtroBoton);
            filtroObj.innerHTML = filtro.join("");
            productosBuscados.sort((a, b) => {
                if (a.NOMBRE == b.NOMBRE) {
                    return 0;
                }
                if (a.NOMBRE < b.NOMBRE) {
                    return -1;
                }
                return 1;
            });
            let cards = [];
            for (let i = 0; i < productosBuscados.length; i++) {
                let producto = productosBuscados[i];
                let cardProducto = `
                <div class="card m-3">
                    <div class="d-flex">
                        <img onclick="mostrarDetalle('${producto.COD_PRODUCTO_TIENDA}')" data-toggle="modal" data-target="#modalDetalle"
                            class="p-4 puntero-dedo" src="
                            https://telemedicina.jakemate.net:7141/api${producto.IMAGEN}" alt="">
                        <div class="card-body my-auto">
                            <p onclick="mostrarDetalle('${producto.COD_PRODUCTO_TIENDA}')" data-toggle="modal" data-target="#modalDetalle"
                                class="card-text puntero-dedo">${producto.NOMBRE}</p>
                            <h5 class="card-title"><b>${producto.PRECIO},00 pesos</b></h5>
                            <p class="card-text">${producto.CATEGORIA_PROD_TIENDA}</p>
                        </div>
                    </div>
                </div>
            `;
                cards.push(cardProducto);
            }
            listaProductos.innerHTML = cards.join("");
        },
    });
};

function ordenarProductos(filtro) {
    if (filtro == "Por nombre") {
        productosBuscados.sort((a, b) => {
            if (a.NOMBRE == b.NOMBRE) {
                return 0;
            }
            if (a.NOMBRE < b.NOMBRE) {
                return -1;
            }
            return 1;
        });
    } else {
        productosBuscados.sort((a, b) => {
            if (a.PRECIO == b.PRECIO) {
                return 0;
            }
            if (a.PRECIO < b.PRECIO) {
                return -1;
            }
            return 1;
        });
    }
    let cards = [];
    for (let i = 0; i < productosBuscados.length; i++) {
        let producto = productosBuscados[i];
        let cardProducto = `
            <div class="card m-3">
                <div class="d-flex">
                    <img onclick="mostrarDetalle('${producto.COD_PRODUCTO_TIENDA}')" data-toggle="modal" data-target="#modalDetalle"
                        class="p-4 puntero-dedo" src="
                        https://telemedicina.jakemate.net:7141/api${producto.IMAGEN}" alt="">
                    <div class="card-body my-auto">
                        <p onclick="mostrarDetalle('${producto.COD_PRODUCTO_TIENDA}')" data-toggle="modal" data-target="#modalDetalle"
                            class="card-text puntero-dedo">${producto.NOMBRE}</p>
                        <h5 class="card-title"><b>${producto.PRECIO},00 pesos</b></h5>
                        <p class="card-text">${producto.CATEGORIA_PROD_TIENDA}</p>
                    </div>
                </div>
            </div>
        `;
        cards.push(cardProducto);
    }
    listaProductos.innerHTML = cards.join("");
}

function mostrarDetalle(codigo) {
    let productoSeleccionado = productosBuscados.filter(
        (n) => n.COD_PRODUCTO_TIENDA == codigo
    );
    let producto = productoSeleccionado[0];
    const detalleProducto = `
                        <div class="d-flex">
                        <img class="w-50"
                            src="
                            https://telemedicina.jakemate.net:7141/api${producto.IMAGEN}" alt="foto-producto">
                        <div class="my-auto ml-3">
                            <div>
                                <p>${producto.NOMBRE}</p>
                                <h5><b>${producto.PRECIO},00 pesos</b></h5>
                                <p>${producto.PRESENTACION}</p>
                            </div>
                            <div>
                                <p class="mb-0">Categoria:</p>
                                <p><b>${producto.CATEGORIA_PROD_TIENDA}</b></p>
                            </div>
                        </div>
                        <button type="button" class="close ml-auto mb-auto " data-dismiss="modal" aria-label="Close">
                            <span class="cruz" aria-hidden="true">X</span>
                        </button>
                    </div>
                    <p class="ml-3 mb-0">${producto.DESCRIPCION}</p>
                        `;
    detalleDiv.innerHTML = detalleProducto;
}
