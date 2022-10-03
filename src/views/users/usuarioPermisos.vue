
<template>
  <div id="Registro de Usuarios">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mx-auto">
          <div class="card mt-4 text-center">
            <div class="class-header"></div>
            
            <div class="card-body">
              <form v-on:submit.prevent="regisUser()">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control text-uppercase"
                    placeholder="Usuario"
                    autofocus
                    v-model="userAdmin.usuario"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    v-model="userAdmin.password"
                  />
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="btn btn-dark btn-block"
                    style="background-color: #82230c"
                  >
                    Crear Usuario
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
export default {
    
  data() {
    return {
      userAdmin: {
        usuario: "",
        password: "",
      },
      
    };
  },
  methods: {
      
    regisUser() {
       
      let usuario = this.userAdmin.usuario;
      usuario = usuario.toUpperCase();
      this.userAdmin.usuario = usuario;

      if (this.userAdmin.usuario == "" || this.userAdmin.usuario == " ") {
        this.AlertaUser();
        return false;
      }
      if (this.userAdmin.password == "" || this.userAdmin.password == " ") {
        this.AlertaPass();
        return false;
      }

      if (
        this.userAdmin.usuario == "ADMINISTRADOR" &&
        this.userAdmin.password == "conexion1234"
      ) {
        this.$router.push("/registrar-usuarios");
      } else {
        this.AlertaErronea();
        return false;
      }
    },

    AlertaPass() {
      this.$swal(
        "Atencion!",
        "Ingrese la contrasena",

        "warning"
      );
    },
    AlertaUser() {
      this.$swal(
        "Atencion!",
        " Ingrese usuario",

        "warning"
      );
    },
    AlertaErronea() {
      this.$swal(
        "Error!",
        "Usuario no coincide",

        "warning"
      );
    },
  },
};
</script>