import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./modules/home/home.component";
import {MenuPlanificacionComponent} from "./modules/menu-planificacion/menu-planificacion.component";
import {AperturarCicloComponent} from "./modules/aperturar-ciclo/aperturar-ciclo.component";
import {PlanificacionDirectivoComponent} from "./modules/planificacion-directivo/planificacion-directivo.component";
import {PlanificacionSubdirectivoComponent} from "./modules/planificacion-subdirectivo/planificacion-subdirectivo.component";
import {PlanificacionServidoresComponent} from "./modules/planificacion-servidores/planificacion-servidores.component";
import {MenuAccionesIniciativasComponent} from "./modules/menu-acciones-iniciativas/menu-acciones-iniciativas.component";
import {InformesAuditoriaComponent} from "./modules/informes-auditoria/informes-auditoria.component";
import {SistemaControlInternoComponent} from "./modules/sistema-control-interno/sistema-control-interno.component";
import {RegistroDocumentoComponent} from "./modules/informes-auditoria/modal/registro-documento/registro-documento.component";
import {RegistroProductoComponent} from "./modules/sistema-control-interno/registro-producto/registro-producto.component";
import {LoginComponent} from "./modules/login/login.component";
import {MenuComponent} from "./recursos/menu/menu.component";
import {AccionIniciativaComponent} from "./modules/accion-iniciativa/accion-iniciativa.component";
import {ValidacionComponent} from "./modules/planificacion-directivo/validacion/validacion.component";
import {ValidacionActividadesComponent} from "./modules/planificacion-subdirectivo/validacion-actividades/validacion-actividades.component";
import {PlanificacionServidorComponent} from "./modules/planificacion-servidor/planificacion-servidor.component";
import {AccioIniciativaValoracionComponent} from "./modules/accio-iniciativa-valoracion/accio-iniciativa-valoracion.component";
import {InventarioComponent} from "./modules/accion-iniciativa/reporte/inventario/inventario.component";

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'menuPlanificacion',
    component: MenuPlanificacionComponent
  },
  {
    path:'aperturarCiclo',
    component: AperturarCicloComponent
  },
  {
    path: 'planificacionDirectivo',
    component: PlanificacionDirectivoComponent
  },
  {
    path: 'planificacionSubDirectivo',
    component: PlanificacionSubdirectivoComponent
  },
  {
    path: 'planificacionServidores',
    component: PlanificacionServidoresComponent
  },
  {
    path: 'accionesIniciativas',
    component: MenuAccionesIniciativasComponent
  },
  {
    path: 'informeAuditoria',
    component: InformesAuditoriaComponent
  },
  {
    path: 'controlInterno',
    component: SistemaControlInternoComponent
  },
  {
    path:'registroInforme',
    component: RegistroDocumentoComponent
  },
  {
    path:'registroProducto',
    component: RegistroProductoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path:'accionIniciativa',
    component: AccionIniciativaComponent
  },
  {
    path: 'validarDirectivo',
    component: ValidacionComponent
  },
  {
    path: 'validarSubDirectivo',
    component: ValidacionActividadesComponent
  },
  {
    path: 'planificacionServidor',
    component: PlanificacionServidorComponent
  },
  {
    path: 'accionIniciativaValoracion',
    component: AccioIniciativaValoracionComponent
  },
  {
    path:'inventario',
    component: InventarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
