<template>
  <div class="Registrar Usuarios">
 <tabla_usuarios></tabla_usuarios>
  </div>
</template>

<script>
// @ is an alias to /src
import tabla_usuarios from "@/components/auth_users/tabla_usuarios.vue";

export default {
  name: "TodosUsuarios",
  components: {
    tabla_usuarios
  },
};
</script>