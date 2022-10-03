<template>
  <div id="Registro de Conexiones">
    <div class="container">
      <!--  <img alt="Logo CXPOS" src="../assets/logo1.jpeg" />-->
      <div class="row">
        <div class="col-md-4 mx-auto">
          <div class="card mt-4 text-center">
            <div class="class-header">
              <h2>Conexion a Base de datos</h2>
            </div>
            <div class="card-body">
              <form v-on:submit.prevent="GuardaConexion()">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ingresar IP    "
                    autofocus
                    v-model="datosIpConexion.IpPublica"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Usuario base de datos"
                    class="form-control"
                    v-model="datosIpConexion.user"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Contraseña Motor BD"
                    v-model="datosIpConexion.contrasenaMotor"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Base de datos"
                    v-model="datosIpConexion.empresa"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="hidden"
                    class="form-control"
                    placeholder="Contraseña"
                    v-model="datosIpConexion.id_user"
                  />
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="btn btn-dark btn-block"
                    style="background-color: #82230c"
                  >
                    Grabar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      datosIpConexion: {
        IpPublica: "",
        user: "",
        contrasenaMotor: "",
        empresa: "",
        id_user: "",
      },
    };
  },
  mounted() {},
  methods: {
    async GuardaConexion() {
      this.datosIpConexion.id_user = this.$route.params._id;

      if (
        this.datosIpConexion.IpPublica == " " ||
        this.datosIpConexion.IpPublica == ""
      ) {
        this.AlertaIp();
        return false;
      }
      if (this.datosIpConexion.user == "" || this.datosIpConexion.user == " ") {
        this.AlertaUser();
        return false;
      }
      if (
        this.datosIpConexion.contrasenaMotor == "" ||
        this.datosIpConexion.contrasenaMotor == " "
      ) {
        this.AlertaPass();
        return false;
      }
      if (
        this.datosIpConexion.empresa == "" ||
        this.datosIpConexion.empresa == " "
      ) {
        this.AlertaEmpresa();
        return false;
      } else {
        await axios
          .post(
            this.$conexion +
              "/api/crear-conexiones/" +
              this.datosIpConexion.id_user,
            this.datosIpConexion
          )
          .then((data) => {
            console.log(data);
            this.datosIpConexion = "";
            this.AlertaConexionCreated();
            this.$router.push('/')
          })
          .catch((err) => console.log(err));
      }
    },
    AlertaConexionCreated() {
      this.$swal(
        "Confirmado!",
        "Conexion creada",

        "success"
      );
    },
    AlertaIp() {
      this.$swal(
        "Atencion!",
        "Ingrese la IP ",

        "warning"
      );
    },
    AlertaUser() {
      this.$swal(
        "Atencion!",
        "Ingrese el usuario de la base de datos",

        "warning"
      );
    },
    AlertaPass() {
      this.$swal(
        "Atencion!",
        "Ingrese la contraseña de la base de datos",

        "warning"
      );
    },
    AlertaEmpresa() {
      this.$swal(
        "Atencion!",
        "Ingrese la empresa a la cual se desea conectar",

        "warning"
      );
    },
  },
};
</script>

