<template>
  <div id="app">
    <div id="nav">
      <nav
        class="navbar navbar-expand-lg navbar-dark"
        style="background-color: #82230c"
      >
        <img alt="Logo CXPOS" src="./assets/Logo_conexion_pos.png" />
        <div class="container-fluid">
          <a class="navbar-brand"> RECOLECTOR WEB </a>

          <button 
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item dropdown" >
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false" 
                >
                  INVENTARIOS
                </a>
                <ul
                  class="dropdown-menu"
                  style="background-color: #82230c"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a class="dropdown-item">
                      <router-link to="/recolector-movimientos-inventario"
                        >Recolectar informacion para mov inventarios<a
                          class="navbar-brand"
                          aria-current="page"
                          tabindex="-1"
                        ></a></router-link
                    ></a>
                  </li>
                  <li><a class="dropdown-item"></a></li>
                  <li>
                    <a class="dropdown-item">
                      <router-link to="/recolector-compras"
                        >Recolectar informacion para Compras<a
                          class="navbar-brand"
                          aria-current="page"
                          tabindex="-1"
                        ></a></router-link
                    ></a>
                  </li>
                  <li>
                    <a class="dropdown-item">
                      <router-link to="/recolector-traslados"
                        >Recolectar informacion para Traslados<a
                          class="navbar-brand"
                          aria-current="page"
                          tabindex="-1"
                        ></a></router-link
                    ></a>
                  </li>
                </ul>
              </li>

              <li>
                <a class="dropdown-item">
                  <router-link to="/usuadmin"
                    >Registrar Usuario<a
                      class="navbar-brand ml-auto"
                      aria-current="page"
                      tabindex="-1"
                    ></a></router-link
                ></a>
              </li>
              <li>
                <a class="dropdown-item">
                  <router-link to="/"
                    >Ingresar<a
                      class="navbar-brand ml-auto"
                      aria-current="page"
                      tabindex="-1"
                    ></a></router-link
                ></a>
              </li>
              <li>
                <a class="dropdown-item" v-on:click="cerrarSesion()">
                  <router-link to="/"> cerrar sesion </router-link></a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      usuario: new Object(),
      logueado: true,
    };
  },

  methods: {
    cerrarSesion() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .get(this.$conexion + "/api/logout/" + this.usuario._id)
        .then((data) => {
          console.log("Sesión finalizada", data);
          this.AlertaCloseSesion();
        });

      this.logueado = false;
    },
    AlertaCloseSesion() {
      this.$swal(
        "Confirmado!",
        "Sesion Finalizada !!!!",

        "success"
      );
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #160f0f;
}

#nav {
  padding: 40px;
}

#nav a {
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #110903;
}
</style>