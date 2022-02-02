import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SplitterModule} from "primeng/splitter";
import {AvatarModule} from "primeng/avatar";
import {PanelMenuModule} from "primeng/panelmenu";
import {FieldsetModule} from "primeng/fieldset";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './modules/home/home.component';
import {CardModule} from "primeng/card";
import { MenuPlanificacionComponent } from './modules/menu-planificacion/menu-planificacion.component';
import { AperturarCicloComponent } from './modules/aperturar-ciclo/aperturar-ciclo.component';
import {CalendarModule} from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {ProgressBarModule} from "primeng/progressbar";
import {SliderModule} from "primeng/slider";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {HttpClientModule} from "@angular/common/http";
import { PlanificacionDirectivoComponent } from './modules/planificacion-directivo/planificacion-directivo.component';
import { RegistroAEComponent } from './modules/planificacion-directivo/modales/registroAE/registroAE.component';
import {DialogModule} from "primeng/dialog";
import { RegistroHitoComponent } from './modules/planificacion-directivo/modales/registro-hito/registro-hito.component';
import { PlanificacionSubdirectivoComponent } from './modules/planificacion-subdirectivo/planificacion-subdirectivo.component';
import { RegistroAOComponent } from './modules/planificacion-subdirectivo/modales/registro-ao/registro-ao.component';
import { PlanificacionServidoresComponent } from './modules/planificacion-servidores/planificacion-servidores.component';
import { RegistrarActividadComponent } from './modules/planificacion-servidores/modales/registrar-actividad/registrar-actividad.component';
import { RegistrarHitoServidoresComponent } from './modules/planificacion-servidores/modales/registrar-hito-servidores/registrar-hito-servidores.component';
import {TabViewModule} from "primeng/tabview";
import {ListboxModule} from "primeng/listbox";
import {CheckboxModule} from "primeng/checkbox";
import { MenuAccionesIniciativasComponent } from './modules/menu-acciones-iniciativas/menu-acciones-iniciativas.component';
import { InformesAuditoriaComponent } from './modules/informes-auditoria/informes-auditoria.component';
import { SistemaControlInternoComponent } from './modules/sistema-control-interno/sistema-control-interno.component';
import { RegistroDocumentoComponent } from './modules/informes-auditoria/modal/registro-documento/registro-documento.component';
import { RegistroProductoComponent } from './modules/sistema-control-interno/registro-producto/registro-producto.component';
import {ToastModule} from "primeng/toast";
import { LoginComponent } from './modules/login/login.component';
import {ImageModule} from "primeng/image";
import {MenuModule} from "primeng/menu";
import { BodyComponent } from './modules/body/body.component';
import { MenuComponent } from './recursos/menu/menu.component';
import {MessagesModule} from "primeng/messages";
import { ListaRecomendacionComponent } from './modules/informes-auditoria/modal/lista-recomendacion/lista-recomendacion.component';
import { ListaProductosComponent } from './modules/planificacion-directivo/modales/lista-productos/lista-productos.component';
import {RegistroHitoSubdirectivoComponent} from "./modules/planificacion-subdirectivo/modales/registro-hito-subdirectivo/registro-hito-subdirectivo.component";
import { ListaProductosAOComponent } from './modules/planificacion-subdirectivo/modales/lista-productos-ao/lista-productos-ao.component';
import { DetalleHitoComponent } from './modules/planificacion-directivo/modales/detalle-hito/detalle-hito.component';
import { AccionIniciativaComponent } from './modules/accion-iniciativa/accion-iniciativa.component';
import { ValoracionComponent } from './modules/accion-iniciativa/modales/valoracion/valoracion.component';
import { ConformacionEquipoComponent } from './modules/accion-iniciativa/modales/conformacion-equipo/conformacion-equipo.component';
import { ConpletarRegistroComponent } from './modules/accion-iniciativa/modales/completar-registro/conpletar-registro.component';
import { AgregarRegistroComponent } from './modules/accion-iniciativa/modales/agregar-registro/agregar-registro.component';
import { ValidacionComponent } from './modules/planificacion-directivo/validacion/validacion.component';
import { ListaDireccionComponent } from './modules/planificacion-directivo/modales/lista-direccion/lista-direccion.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { ValidacionActividadesComponent } from './modules/planificacion-subdirectivo/validacion-actividades/validacion-actividades.component';
import { DatalleProductoComponent } from './modules/planificacion-servidores/modales/datalle-producto/datalle-producto.component';
import { PlanificacionServidorComponent } from './modules/planificacion-servidor/planificacion-servidor.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MenuPlanificacionComponent,
        AperturarCicloComponent,
        PlanificacionDirectivoComponent,
        RegistroAEComponent,
        RegistroHitoComponent,
        PlanificacionSubdirectivoComponent,
        RegistroAOComponent,
        PlanificacionServidoresComponent,
        RegistrarActividadComponent,
        RegistrarHitoServidoresComponent,
        MenuAccionesIniciativasComponent,
        InformesAuditoriaComponent,
        SistemaControlInternoComponent,
        RegistroDocumentoComponent,
        RegistroProductoComponent,
        LoginComponent,
        BodyComponent,
        MenuComponent,
        ListaRecomendacionComponent,
        ListaProductosComponent,
        RegistroHitoSubdirectivoComponent,
        ListaProductosAOComponent,
        DetalleHitoComponent,
        AccionIniciativaComponent,
        ValoracionComponent,
        ConformacionEquipoComponent,
        ConpletarRegistroComponent,
        AgregarRegistroComponent,
        ValidacionComponent,
        ListaDireccionComponent,
        ValidacionActividadesComponent,
        DatalleProductoComponent,
        PlanificacionServidorComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SplitterModule,
        AvatarModule,
        PanelMenuModule,
        FieldsetModule,
        BrowserAnimationsModule,
        CardModule,
        CalendarModule,
        FormsModule,
        TableModule,
        ProgressBarModule,
        SliderModule,
        MultiSelectModule,
        DropdownModule,
        HttpClientModule,
        DialogModule,
        TabViewModule,
        ListboxModule,
        CheckboxModule,
        ReactiveFormsModule,
        ToastModule,
        ImageModule,
        MenuModule,
        MessagesModule,
        ConfirmDialogModule
    ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
