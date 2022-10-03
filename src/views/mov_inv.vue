<template>
  <div class="Movimientos">
 <movimientos_inventario></movimientos_inventario>
  </div>
</template>

<script>
// @ is an alias to /src
import movimientos_inventario from '@/components/movimientos_inventario.vue'

export default {
  name: 'movimientos',
  components: {
    movimientos_inventario
   
    
  }
}
</script>