export interface ActividadOperativa  {
  id: number,
  codigo:string,
  descripcion: string,
  id_estado:number,
  id_ae: number,
  id_unidad_medida: number,
  id_organo: number,
  nombre_organo: string,
  nombre_unidad_medida: string,
  nombre_ae: string,
  codigo_ae: string
}
export interface actividadOperativaUnidad{
  idAOUnidad: number
  nombreUnidad: string
  codUnidad: string
  idObjetivo: number
  nombreObjetivo: string
  idActividadOperativa: number
}
