<template>
  <div id="Registro de Usuarios">
    <div class="container">
      <!--  <img alt="Logo CXPOS" src="../assets/logo1.jpeg" />-->
      
      <div class="row">
        <div class="col-md-4 mx-auto">
          <div class="card mt-4 text-center">
            <div class="class-header">
              <h2>Registrar Usuario</h2>
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
              <form v-on:submit.prevent="createUser()">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Correo electrónico"
                    autofocus
                    v-model="dataForRegister.email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Razon Social"
                    class="form-control text-uppercase"
                    v-model="dataForRegister.razonSocial"
                  />
                </div>
                 <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    v-model="dataForRegister.password"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nit"
                    v-model="dataForRegister.nit"
                  />
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="btn btn-dark btn-block"
                    style="background-color: #82230c"
                  >
                    Grabar Usuario
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
  name: "RegistrarUsuarios",
  props: {
    msg: String,
  },

  data() {
    return {
      dataForRegister: {
        razonSocial: "",
        email: "",
        nit: "",
        password: ""
      },
    };
  },
  methods: {
    async createUser() {
      let razonSocial = this.dataForRegister.razonSocial;
      razonSocial = razonSocial.toUpperCase();
      this.dataForRegister.razonSocial = razonSocial;
      if (
        this.dataForRegister.razonSocial == "" ||
        this.dataForRegister.razonSocial == " "
      ) {
        this.AlertaRsocial();
        return false;
      }
      if (this.dataForRegister.nit == "" || this.dataForRegister.nit == " ") {
        this.AlertaNit();
        return false;
      }
      if (
        this.dataForRegister.email == "" ||
        this.dataForRegister.email == " "
      ) {
        this.AlertaEmail();
        return false;
      } else {
        await axios
          .post(this.$conexion + "/api/create/users", this.dataForRegister)
          .then((data) => {
            console.log(data);
            this.dataForRegister = "";
            this.AlertaUserCreated();
            this.$router.push("/todos-los-usuarios");
          })
          .catch((err) => console.log(err));

        console.log(this.dataForRegister);
      }
    },
    AlertaUserCreated() {
      this.$swal(
        "Confirmado!",
        "usuario creado",

        "success"
      );
    },
    AlertaRsocial() {
      this.$swal(
        "Atencion!",
        "Ingrese la Razon Social",

        "warning"
      );
    },
    AlertaNit() {
      this.$swal(
        "Atencion!",
        "Ingrese la Contraseña",

        "warning"
      );
    },
    AlertaEmail() {
      this.$swal(
        "Atencion!",
        "Ingrese el Email",

        "warning"
      );
    },
  },
};
</script>