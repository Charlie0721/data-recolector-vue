<template>
  <div class="container">
    <center>
      <h2 class="display-4">
        <small class="text-muted"> RECOLECTOR MOVIMIENTOS DE INVENTARIO</small>
      </h2>
    </center>
    <div class="card">
      <div class="card-body">
        <form v-on:submit.prevent="searchProducts()">
          <h5 class="display-5 text-dark">Codigo barras:</h5>
          <input
            type="text"
            class="form-control form-control-sm"
            id="barras"
            placeholder="Codigo de barras"
            v-model="barras"
          /><br />
          <h5
            class="display-6"
            v-for="item in this.descripciones"
            :key="item.barcode"
          >
            <small>{{ item.descripcion }}</small>
          </h5>
          <br />
          <h5 class="display-5 text-dark">Cantidad:</h5>
          <input
            type="number"
            id="existenc"
            placeholder="Existencias"
            class="form-control input-header" disabled
            v-model="cantidad"
            v-on:keyup.enter="enter()"
          />

          <br />
          <button
            
            class="btn btn-success btn-block"
            v-on:click="crearDatos()"
            style="background-color: #82230c"
          >
            Capturar
          </button>
          <br />
          <textarea
            class="form-control z-depth-1 text-uppercase input-header"
            id="dataArr"
            name="datosArray"
            rows="6"
          ></textarea>
        </form>
        <br />
        <input
          type="text"
          id="nameText"
          placeholder="Nombre el archivo para descargar"
          class="form-control"
          v-model="nombreArchivo"
        />
        <br />
        <input
          type="button"
          id="btn"
          class="btn btn-success btn-block"
          value="Descargar Archivo"
          v-on:click="downloadFile()"
          style="background-color: #82230c"
        />
        <input
          type="button"
          onclick="location.reload();"
          class="btn btn-danger btn-block"
          value="Recargar Pagina"
        />
      </div>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Buscar Productos</span>
      </div>
      <input
        type="search"
        class="form-control text-uppercase b"
        name="buscar"
        style="width: 300px"
        v-model="busqueda_producto"
      />
    </div>
    <table class="table table-hover table-responsive">
      <thead>
        <tr>
          <th scope="col">NOMBRE</th>
          <th scope="col">BARRAS</th>
          <th scope="col">PRECIO</th>
          <th scope="col">PRECIO1</th>
          <th scope="col">PRECIO2</th>
          <th scope="col">COSTO</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in searchProductos"
          :key="item.idproducto"
          v-on:click="editar(item.idproducto)"
        >
          <th scope="row">{{ item.descripcion }}</th>
          <td>{{ item.barcode }}</td>
          <td>
            $ {{ new Intl.NumberFormat("de-DE").format(item.precioventa) }}
          </td>
          <td>
            ${{ new Intl.NumberFormat("de-DE").format(item.precioespecial1) }}
          </td>
          <td>
            ${{ new Intl.NumberFormat("de-DE").format(item.precioespecial2) }}
          </td>
          <td>${{ new Intl.NumberFormat("de-DE").format(item.ultcosto) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "movimientos",
  props: {
    msg: String,
  },

  data() {
    return {
      barras: "",
      cantidad: 1,
      datos: [],
      nombreArchivo: "",
      busqueda_producto: "",
      ListadoProductos: [],
      usuario: new Object(),
      descripciones: [],
    };
  },
  mounted() {
    this.ObtenerProductos();
  },
  methods: {
    searchProducts() {
      if (this.barras === "" || this.barras === null || this.barras == " ") {
        alert("Debe ingresar un código de barras ");
        return false;
      } else {
        let data = {
          barcode: this.barras,
        };
        axios
          .post(
            this.$conexion + "/api/search-pruduct/" + this.usuario._id,
            data
          )
          .then((response) => {
            this.descripciones = response.data.rows;

            this.barras = "";
          })
          .catch((err) => {
            console.log(err);

            this.barras = "";
          });
      }
    },
    ObtenerProductos() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .get(this.$conexion + "/todos/productos/" + this.usuario._id)
        .then((response) => {
          this.ListadoProductos = response.data.rows;
        })
        .catch((e) => console.log(e));
    },
    arreglo(barras, cantidad) {
      this.barras = barras;
      this.cantidad = cantidad;
    },

    obtenerCantidad() {
      let obtenerC = this.cantidad;
      obtenerC = parseInt(obtenerC);

      return obtenerC;
    },

    obtenerBarras() {
      let obtenerB = this.barras;
      obtenerB = obtenerB.toString();
      return obtenerB;
    },

    crearDatos() {
      if (
        this.obtenerCantidad() === "" ||
        this.obtenerCantidad() === null ||
        this.obtenerBarras() === "" ||
        this.obtenerBarras() === 0 ||
        this.obtenerBarras() === null
      ) {
        alert("debe ingresar los datos ");
        return false;
      } else {
        let dat = new this.arreglo(
          this.obtenerBarras(),
          this.obtenerCantidad()
        );
        this.datos.push(dat);
        this.mostrarListado();
      }
    },
    mostrarListado() {
      let lista = "";
      for (var i = 0; i < this.datos.length; i++) {
        lista +=
          "" + this.datos[i].barras + "," + this.datos[i].cantidad + "\n";

        document.getElementById("barras").value = "";
        document.getElementById("existenc").value = "";
      }
      document.getElementById("dataArr").value = lista;
      this.PonerFocus();
    },

    enter() {
      function tab(e) {
        if (e.which == 13) {
          var nextSibling = e.target.nextSibling.nextSibling;
          if (nextSibling) {
            nextSibling.focus();
          }
          var contador = 0;
          var tecla = document.all ? e.keyCode : e.which;
          if (tecla == 13) {
            document.getElementById("existenc").value = contador + 1;
            contador++;
          }
          e.preventDefault();
        }
      }
      var inputs = document.getElementsByTagName("input");
      for (var x = 0; x < inputs.length; x++) {
        inputs[x].addEventListener("keypress", tab);
      }
    },
    PonerFocus() {
      document.getElementById("barras").focus();
    },
    downloadFile() {
      function download(filename, textInput) {
        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:dataArr/plain;charset=utf-8, " + encodeURIComponent(textInput)
        );
        element.setAttribute("download", filename);
        document.body.appendChild(element);
        element.click();
        //document.body.removeChild(element);
      }
      document.getElementById("btn").addEventListener(
        "click",
        function () {
          let text = document.getElementById("dataArr").value;
          let nombreArchivo = document.getElementById("nameText").value;
          if (nombreArchivo === " " || nombreArchivo === "") {
            alert("debe ingresar un nombre para el archivo ");
            return false;
          } else {
            let filename = `${nombreArchivo}.txt`;
            download(filename, text);
            alert(
              "Archivo descargado, listo para subir a Conexion POS con el nombre: " +
                nombreArchivo
            );
          }
        },
        false
      );
    },
  },
  computed: {
    searchProductos: function () {
      return this.ListadoProductos.filter(
        (item) =>
          item.descripcion.includes(this.busqueda_producto.toUpperCase()) ||
          item.barcode.includes(this.busqueda_producto)
      );
    },
  },
};
</script>
