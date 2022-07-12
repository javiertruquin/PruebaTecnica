const tituloH1 = document.getElementById("titulo");
const formularioForm = document.getElementById("formulario");
const textoInput = document.getElementById("inputTexto");
const listaProductos = document.getElementById("lista");
const categoriaSelect = document.getElementById("selectCat");
const filtroObj = document.getElementById("filtro");
const filtroSelect = document.getElementById("selectFiltro");

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
        console.log("buscarProductosTienda ~ resultados", resultados.resultado.Table)
            let filtro = [];
            let filtroBoton = `
                        <h4 class="my-auto mx-2">Ordenar por:</h4>
            <select id="selectFiltro" class="select-texto">
            <option selected>Por nombre</option>
            <option >Por menor precio</option>
            </select>
            <button class="mx-2 btn btn-primary my-3 my-sm-0" onclick="ordenarProductos(selectFiltro.value)"><h4 class="my-auto">Ordenar</h4></button>`;
            filtro.push(filtroBoton);
            filtroObj.innerHTML = filtro.join("");
            resultados.resultado.Table.sort((a, b) => {
                if (a.NOMBRE == b.NOMBRE) {
                    return 0;
                }
                if (a.NOMBRE < b.NOMBRE) {
                    return -1;
                }
                return 1;
            });
            let cards = [];
            for (let i = 0; i < resultados.resultado.Table.length; i++) {
                var producto = resultados.resultado.Table[i];
                let cardProducto = `
                <div class="card m-3">
                    <div class="d-flex">
                        <img onclick="mostrarDetalle('${producto.NOMBRE}')" data-toggle="modal" data-target="#modalDetalle"
                            class="p-4 " src="
                            https://telemedicina.jakemate.net:7141/api${producto.IMAGEN}" alt="">
                        <div class="card-body my-auto">
                            <p onclick="mostrarDetalle('${producto.NOMBRE}')" data-toggle="modal" data-target="#modalDetalle"
                                class="card-text">${producto.NOMBRE}</p>
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
                let filtro = [];
                let filtroBoton = `
                        <h4 class="my-auto mx-2">Ordenar por:</h4>
            <select id="selectFiltro" class="select-texto">
            <option selected>Por nombre</option>
            <option >Por menor precio</option>
            </select>
            <button class="mx-2 btn btn-primary my-3 my-sm-0" onclick="ordenarProductos(selectFiltro.value)"><h4 class="my-auto">Ordenar</h4></button>`;
                filtro.push(filtroBoton);
                filtroObj.innerHTML = filtro.join("");
                resultados.resultado.Table.sort((a, b) => {
                    if (a.NOMBRE == b.NOMBRE) {
                        return 0;
                    }
                    if (a.NOMBRE < b.NOMBRE) {
                        return -1;
                    }
                    return 1;
                });
                let cards = [];
                for (let i = 0; i < resultados.resultado.Table.length; i++) {
                    var producto = resultados.resultado.Table[i];
                    let cardProducto = `
                <div class="card m-3">
                    <div class="d-flex">
                        <img onclick="mostrarDetalle('${producto.NOMBRE}')" data-toggle="modal" data-target="#modalDetalle"
                            class="p-4 " src="
                            https://telemedicina.jakemate.net:7141/api${producto.IMAGEN}" alt="">
                        <div class="card-body my-auto">
                            <p onclick="mostrarDetalle('${producto.NOMBRE}')" data-toggle="modal" data-target="#modalDetalle"
                                class="card-text">${producto.NOMBRE}</p>
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
    } else {
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
                let filtro = [];
                let filtroBoton = `
                        <h4 class="my-auto mx-2">Ordenar por:</h4>
            <select id="selectFiltro" class="select-texto">
            <option >Por nombre</option>
            <option selected>Por menor precio</option>
            </select>
            <button class="mx-2 btn btn-primary my-3 my-sm-0" onclick="ordenarProductos(selectFiltro.value)"><h4 class="my-auto">Ordenar</h4></button>`;
                filtro.push(filtroBoton);

                filtroObj.innerHTML = filtro.join("");

                resultados.resultado.Table.sort((a, b) => {
                    if (a.PRECIO == b.PRECIO) {
                        return 0;
                    }
                    if (a.PRECIO < b.PRECIO) {
                        return -1;
                    }
                    return 1;
                });
                let cards = [];
                for (let i = 0; i < resultados.resultado.Table.length; i++) {
                    var producto = resultados.resultado.Table[i];
                    let cardProducto = `
                <div class="card m-3">
                    <div class="d-flex">
                        <img onclick="mostrarDetalle('${producto.NOMBRE}')" data-toggle="modal" data-target="#modalDetalle"
                            class="p-4" src="
                            https://telemedicina.jakemate.net:7141/api${producto.IMAGEN}" alt="">
                        <div class="card-body my-auto">
                            <p onclick="mostrarDetalle('${producto.NOMBRE}')" data-toggle="modal" data-target="#modalDetalle"
                                class="card-text">${producto.NOMBRE}</p>
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
    }
}

function mostrarDetalle(nombre) {
    let tnombre = nombre;
    $.ajax({
        url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
        data: {
            _nombreMetodo_: "buscarProductosTienda",
            NOMBRE: `${tnombre}`,
            CATEGORIA: "",
        },
        method: "POST",
        headers: {
            Token: "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
            ApiKey: "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
        },
        success: function (resultados) {
            let producto = resultados.resultado.Table[0];
            console.log("mostrarDetalle ~ producto", producto.IMAGEN);
            const detalleDiv = document.getElementById("detalleProducto");
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
                        <button type="button" class="close ml-auto mb-auto mr-3" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <p class="ml-3 mb-0">${producto.DESCRIPCION}</p>
                        `;
            detalleDiv.innerHTML = detalleProducto;
        },
    });
}
