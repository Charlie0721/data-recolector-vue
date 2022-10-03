<template>
  <div class="container">
    <center>
      <h2 class="display-4">
        <small class="text-muted"> RECOLECTOR DE COMPRAS</small>
      </h2>
    </center>

    <table class="table table-hover table-responsive">
      <thead>
        <tr>
          <th scope="col">CODIGO IVA</th>
          <th scope="col">NOMBRE</th>
          <th scope="col">%</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dataIva" :key="item.codiva">
          <th scope="row">{{ item.codiva }}</th>
          <th scope="row">{{ item.nombre }}</th>
          <td>{{ item.porcentaje }}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <div class="card">
      <div class="card-body">
        <center>
          <h5 class="display-5">Datos de Factura Compra</h5>
        </center>
       
        <input
          type="text"
          id="nit"
          placeholder="NIT Proveedor"
          class="form-control text-uppercase input-header"
          v-model="nit"
        /><br />

        <input
          type="number"
          id="documentoProvee"
          placeholder="Factura proveedor"
          class="form-control text-uppercase input-header"
          v-model="docprov"
        />
        <br />
        <input
          type="text"
          id="fecha"
          placeholder="ddmmaaaa"
          class="form-control text-uppercase input-header"
          v-model="fecha"
        />
        <br />
        <h5 class="display-5">Datos de Productos</h5>

         <form v-on:submit.prevent="searchProducts()">
          <input
            type="text"
            id="barras"
            placeholder="Codigo barras"
            class="form-control text-uppercase input-header"
            v-model="barcode"
          />
          <h5
            class="display-6"
            v-for="item in this.descripciones"
            :key="item.barcode"
          >
            <small>{{ item.descripcion }}</small>
          </h5>

          <br />
          <input
            type="number"
            id="cantidad"
            placeholder="cantidad"
            class="form-control text-uppercase input-header"
            v-model="cantidad"
          />
          <br />
               
          <input
            type="text"
            id="codIva"
            placeholder="Codigo IVA"
            class="form-control text-uppercase input-header"
            v-model="codiva"
          /><br />
 </form>
          <input
            type="number"
            id="costo"
            placeholder="Costo"
            class="form-control text-uppercase input-header"
            v-model="costo"
          />
          <br />
          <input
            type="number"
            id="precio"
            placeholder="Precio Venta"
            class="form-control text-uppercase input-header"
            v-model="precio"
          />
          <br />
          <button
            id="WriteFile()"
            class="btn btn-success btn-block"
            v-on:click="crearDatos"
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
          v-on:click="downloadFile"
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
      cantidad: 1,
      datos: [],
      nombreArchivo: "",
      nit: null,
      docprov: "",
      fecha: "",
      barcode: "",
      codiva: "",
      costo: null,
      precio: null,
      dataIva: [],
      usuario: new Object(),
      descripciones: [],
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.getTarifaIva();
  },
  methods: {
    getTarifaIva() {
      axios
        .get(this.$conexion + "/recolectordeCompras/" + this.usuario._id)
        .then((response) => {
          this.dataIva = response.data.rows;
        })
        .catch((err) => console.log(err));
    },
    searchProducts() {
      if (this.barcode === "" || this.barcode === null || this.barcode == " ") {
        alert("Debe ingresar un código de barras ");
        return false;
      } else {
        let data = {
          barcode: this.barcode,
        };
        axios
          .post(
            this.$conexion +
              "/api/busca-productos/recolector-compras/" +
              this.usuario._id,
            data
          )
          .then((response) => {
            this.descripciones = response.data.rows;

            for (let index = 0; index < this.descripciones.length; index++) {
              this.costo = this.descripciones[index].costo;
              this.precio = this.descripciones[index].precioventa;
              this.codiva=this.descripciones[index].codivacomp;
            }

            this.barcode = "";
          })
          .catch((err) => {
            console.log(err);

            this.barcode = "";
          });
      }
    },

    arreglo(nit, docprov, fecha, barcode, cantidad, codiva, costo, precio) {
      this.nit = nit;
      this.docprov = docprov;
      this.fecha = fecha;
      this.barcode = barcode;
      this.cantidad = cantidad;
      this.codiva = codiva;
      this.costo = costo;
      this.precio = precio;
    },

    obtenerNit() {
      let obtenerN = this.nit;
      obtenerN = parseInt(obtenerN);

      return obtenerN;
    },
    obtenerDocProv() {
      let obtenerDP = this.docprov;
      obtenerDP = parseInt(obtenerDP);
      return obtenerDP;
    },

    obtenerFecha() {
      let obtenerF = this.fecha;
      obtenerF = obtenerF.toString();

      return obtenerF;
    },
    obtenerBarras() {
      let obtenerB = this.barcode;
      obtenerB = obtenerB.toString();
      return obtenerB;
    },
    obtenerCantidad() {
      var obtenerC = this.cantidad;
      obtenerC = parseInt(obtenerC);

      return obtenerC;
    },
    obtenerCodiva() {
      let obtenerCI = this.codiva;
      obtenerCI = obtenerCI.toString();
      return obtenerCI;
    },
    obtenerCosto() {
      let obtenerCos = this.costo;
      obtenerCos = parseFloat(obtenerCos);

      return obtenerCos;
    },
    obtenerPrecio() {
      let obtenerP = this.precio;
      obtenerP = parseFloat(obtenerP);

      return obtenerP;
    },

    crearDatos() {
      if (
        this.obtenerCantidad() === "" ||
        this.obtenerCantidad() === null ||
        this.obtenerBarras() === "" ||
        this.obtenerBarras() === 0 ||
        this.obtenerBarras() === null ||
        this.obtenerNit() === "" ||
        this.obtenerPrecio() === ""
      ) {
        alert("debe ingresar datos ");

        return false;
      } else {
        let dat = new this.arreglo(
          this.obtenerNit(),
          this.obtenerDocProv(),
          this.obtenerFecha(),
          this.obtenerBarras(),
          this.obtenerCantidad(),
          this.obtenerCodiva(),
          this.obtenerCosto(),
          this.obtenerPrecio()
        );
        this.datos.push(dat);
        this.mostrarListado();
      }
    },
    mostrarListado() {
      let lista = "";
      for (var i = 0; i < this.datos.length; i++) {
        lista +=
          "" +
          this.datos[i].nit +
          "," +
          this.datos[i].docprov +
          "," +
          this.datos[i].fecha +
          "," +
          this.datos[i].barcode +
          "," +
          this.datos[i].cantidad +
          "," +
          this.datos[i].codiva +
          "," +
          this.datos[i].costo +
          "," +
          this.datos[i].precio +
          "\n";
        document.getElementById("barras").value = "";
        document.getElementById("cantidad").value = "";
        document.getElementById("codIva").value = "";
        document.getElementById("costo").value = "";
        document.getElementById("precio").value = "";
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
};
</script>
