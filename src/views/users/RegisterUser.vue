<template>
  <div class="Registrar Usuarios">
 <registrar_usuario></registrar_usuario>
  </div>
</template>

<script>
// @ is an alias to /src
import registrar_usuario from "@/components/auth_users/registrar_usuario.vue";

export default {
  name: "crearUsuarios",
  components: {
    registrar_usuario,
  },
};
</script>