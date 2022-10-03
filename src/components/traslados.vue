<template>
  <div class="container">
    <center>
      <h2 class="display-4">
        <small class="text-muted"> RECOLECTOR DE TRASLADOS</small>
      </h2>
    </center>

    <div class="card">
      <div class="card-body">
        <center>
          <h5 class="display-5">Datos de Traslados</h5>
        </center>

        <button
          type="button"
          class="btn btn-dark ml-auto d-flex"
          style="background-color: #82230c"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          v-on:click="getAlmacenes"
        >
          Ver Almacenes
        </button>
        <br />
        <div
          class="modal fade"
          id="exampleModal2"
          tabindex="-1"
          aria-labelledby="exampleModalLabel2"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel2">Almacenes</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>

                      <th scope="col">ALMACEN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in almacenes" :key="item.idalmacen">
                      <th scope="row">
                        {{ item.idalmacen }}
                      </th>
                      <td>
                        {{ item.nomalmacen }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>

        <input
          type="number"
          id="alm1"
          placeholder=" Id Almacen origen"
          class="form-control text-uppercase input-header"
          autofocus
          v-model="idAlm1"
        /><br />

        <input
          type="number"
          id="alm2"
          placeholder=" Id Almacen destino"
          class="form-control text-uppercase input-header"
          v-model="idAlm2"
        />
        <br />
        <form v-on:submit.prevent="searchProducts()">
          <input
            type="text"
            id="barras"
            placeholder="Codigo barras"
            class="form-control text-uppercase input-header"
            v-model="barcode"
          />
          <br />   
          <h5
            class="display-6"
            v-for="item in this.descripciones"
            :key="item.barcode"
          >
            <small>{{ item.descripcion }}</small>
          </h5>

          <input
            type="number"
            id="cantidad"
            placeholder="cantidad"
            class="form-control text-uppercase input-header"
            v-model="cantidad"
           
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
            id="dataArrTraslados"
            name="datosArrayTraslados"
            rows="6"
          ></textarea
          ><br />
     
        <br />
</form>
        <input
          type="text"
          id="nameTextTraslados"
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
      idAlm1: null,
      idAlm2: null,
      barcode: "",
      almacenes: [],
      usuario: new Object(),
      descripciones: [],
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    async getAlmacenes() {
      await axios
        .get(
          this.$conexion +
            "/traslados/recolector-traslados/almacenes/" +
            this.usuario._id
        )
        .then((alm) => {
          this.almacenes = alm.data.rows;
        });
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
              "/api/busca-productos/recolector-traslados/" +
              this.usuario._id,
            data
          )
          .then((response) => {
            this.descripciones = response.data.rows;

            this.barcode = "";
          })
          .catch((err) => {
            console.log(err);

            this.barcode = "";
          });
      }
    },

    arreglo(idAlm1, idAlm2, barcode, cantidad) {
      this.barcode = barcode;
      this.cantidad = cantidad;
      this.idAlm1 = idAlm1;
      this.idAlm2 = idAlm2;
    },

    obteneridAlm1() {
      let obteneridAlm1 = this.idAlm1;
      obteneridAlm1 = parseInt(obteneridAlm1);

      return obteneridAlm1;
    },
    obteneridAlm2() {
      let obteneridAlm2 = this.idAlm2;
      obteneridAlm2 = parseInt(obteneridAlm2);

      return obteneridAlm2;
    },

    obtenerBarras() {
      let obtenerB = this.barcode;
      obtenerB = obtenerB.toString();
      return obtenerB;
    },
    obtenerCantidad() {
      let obtenerC = this.cantidad;
      obtenerC = parseInt(obtenerC);

      return obtenerC;
    },
    crearDatos() {
      if (
        this.obtenerCantidad() === "" ||
        this.obtenerCantidad() === null ||
        this.obtenerBarras() === "" ||
        this.obtenerBarras() === 0 ||
        this.obtenerBarras() === null ||
        this.obteneridAlm1() === "" ||
        this.obteneridAlm2() === ""
      ) {
        alert("debe ingresar datos ");

        return false;
      } else {
        let dat = new this.arreglo(
          this.obteneridAlm1(),
          this.obteneridAlm2(),
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
          "" +
          this.datos[i].idAlm1 +
          "," +
          this.datos[i].idAlm2 +
          "," +
          this.datos[i].barcode +
          "," +
          this.datos[i].cantidad +
          "\n";
        document.getElementById("barras").value = "";
        document.getElementById("cantidad").value = "";
      }
      document.getElementById("dataArrTraslados").value = lista;
      this.PonerFocus();
    },

    // enter() {
    //   function tab(e) {
    //     if (e.which == 13) {
    //       var nextSibling = e.target.nextSibling.nextSibling;
    //       if (nextSibling) {
    //         nextSibling.focus();
    //       }
    //       var contador = 0;
    //       var tecla = document.all ? e.keyCode : e.which;
    //       if (tecla == 13) {
    //         document.getElementById("existenc").value = contador + 1;
    //         contador++;
    //       }
    //       e.preventDefault();
    //     }
    //   }
    //   var inputs = document.getElementsByTagName("input");
    //   for (var x = 0; x < inputs.length; x++) {
    //     inputs[x].addEventListener("keypress", tab);
    //   }
    // },
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
          let text = document.getElementById("dataArrTraslados").value;
          let nombreArchivo =
            document.getElementById("nameTextTraslados").value;
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
