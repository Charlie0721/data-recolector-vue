import Vue from 'vue'
import VueRouter from 'vue-router'
import movimientos_inventario from '../views/mov_inv.vue'
import compras from '../views/compr.vue'
import traslados from '../views/trasl.vue'
import registrar_usuario from '../views/users/RegisterUser.vue'
import tabla_usuarios from '../views/users/Todos_usuarios.vue'
import conexion_usuario from '../views/users/registra_conexion_usuario.vue'
import login from '../views/users/ingresoAplicacion.vue'
import asuadmin from '../views/users/usuarioPermisos.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/usuadmin',
    name: 'para crear user',
    component: asuadmin
  },
  {
    path: '/',
    name: 'Ingreso App',
    component: login
  },
  {
    path: '/recolector-movimientos-inventario',
    name: 'recolector movimientos inventario',
    component: movimientos_inventario
  },
  {
    path: '/recolector-compras',
    name: 'recolector compras',
    component: compras
  },
  {
    path: '/recolector-traslados',
    name: 'recolector traslados',
    component: traslados
  },
  {
    path: '/registrar-usuarios',
    name: 'crear Usuarios',
    component: registrar_usuario
  },
  {
    path: '/todos-los-usuarios',
    name: 'Todos Usuarios',
    component: tabla_usuarios
  },
  {
    path: '/crear-conexiones/:_id',
    name: 'creaConexiones',
    component: conexion_usuario
  },
  
  
]

const router = new VueRouter({
  routes
})

export default router
