<template>
  <div id="todas las facturas">
 
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> USUARIOS RECOLECTOR WEB </small>
        </h2>
      </center>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Buscar Usuario </span>
        </div>
        <input
          type="search"
          class="form-control text-uppercase"
          placeholder="Buscar"
          name="buscar"
          style="width: 100px"
          v-model="buscarUsuario"
        />
      </div>

      <table class="table table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">RAZON SOCIAL</th>
            <th scope="col">ID USUARIO</th>
            <th scope="col">FECHA DE REGISTRO</th>
            <th scope="col">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in BuscarUsuarios" :key="item._id">
            <th scope="row">{{ item.razonSocial }}</th>
            <td>{{ item._id }}</td>
            <td>
              {{
                new Date(item.dat).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour12: true,
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </td>

            <td>
              <button
                class="btn btn-dark"
                v-on:click="createConexion(item._id)"
              >
                Crear Conexion
              </button>
            </td>
            <td>
              <button class="btn btn-danger" v-on:click="deleteUser(item._id)">
                Eliminar Usuario
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      ListadoUsuarios: [],
      buscarUsuario: "",
    };
  },
  async mounted() {
    await this.getUsers();
  },
  methods: {
    async getUsers() {
      await axios
        .get(this.$conexion + "/api/users")
        .then((data) => {
          this.ListadoUsuarios = data.data.rows[0];
        })
        .catch((err) => console.log(err));
    },

    createConexion(_id) {
      this.$router.push("/crear-conexiones/" + _id);
    },
    deleteUser(_id) {
      const validar = confirm("¿Está seguro de eliminar este usuario?");

      if (validar) {
        axios
          .delete(this.$conexion + "/api/delete-user/" + _id)
          .then((res) => {
            var respuesta = res.data.message;
            alert(respuesta);

            this.getUsers();
          })
          .catch((err) => console.log(err));
      }
      return;
    },
  },
  computed: {
    BuscarUsuarios: function () {
      return this.ListadoUsuarios.filter(
        (item) =>
          item.razonSocial
            .toString()
            .includes(this.buscarUsuario.toUpperCase()) ||
          item.razonSocial.toString().includes(this.buscarUsuario.toLowerCase())
      );
    },
  },
};
</script>
