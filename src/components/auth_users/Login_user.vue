<template>
  <div id="Registro de Usuarios">
    <div class="container">
  
      <div class="row">
        <div class="col-md-4 mx-auto">
          <div class="card mt-4 text-center">
            <div class="class-header">
              
              <svg
                class="bi bi-people-fill"
                width="3em"
                height="3em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                />
              </svg>
            </div>
            <div class="card-body">
              <form v-on:submit.prevent="ingresarApp()">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Correo electrónico"
                    autofocus
                    v-model="login.email"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    v-model="login.password"
                  />
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="btn btn-dark btn-block"
                    style="background-color: #82230c"
                  >
                    Ingresar
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
  name: "Login",
  props: {
    msg: String,
  },
  data() {
    return {
      login: new Object(),
      user: new Object(),
    };
  },
  methods: {
    async ingresarApp() {
      var data = {
        email: this.login.email,
        password: this.login.password,
      };

      if (this.login.email == "" || this.login.email == " ") {
        this.Alertaemail();
        return false;
      }
      if (
        this.login.password == "" ||
        this.login.password == " " ||
        this.login.password == null
      ) {
        this.AlertaNit();
        return false;
      } else {
        await axios
          .post(this.$conexion + "/api/login/users", data)
          .then((res) => {
            var usuario = res.data.rows[0][0];
            console.log(typeof usuario, usuario);
            if (usuario) {
              this.AlertaIngreso();
              localStorage.setItem("usuario", JSON.stringify(usuario));

              const this_ = this;
              setTimeout(function () {
                this_.$router.push("/recolector-movimientos-inventario");
                this_.getConexion();
              }, 0.5 * 1000);
            } else {
              this.Alertauser();
              return false;
            }
          })
          .catch((err) => console.log(err));
      }
    },
    getConexion() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .get(this.$conexion + "/api/ver-conexiones/" + this.usuario._id)
        .then((res) => {
          console.log(res);
        });
    },
    AlertaIngreso() {
      this.$swal(
        "Usuario Confirmado!",
        "Bienvenido a Web Reporter",

        "success"
      );
    },
    Alertauser() {
      this.$swal(
        "Atencion!",
        "Usuario no encontrado",

        "warning"
      );
    },
    AlertaNit() {
      this.$swal(
        "Atencion!",
        "Ingrese la contraseña",

        "warning"
      );
    },
    Alertaemail() {
      this.$swal(
        "Atencion!",
        "Ingrese e-mail",

        "warning"
      );
    },
  },
};
</script>