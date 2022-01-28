export interface Objetivo{
  id: number
  codigo: string
  descripcion: string
  nivel: number
  flagUltimoNivel: number
  idEstadoProceso: number
  descEstado: string
  activo: number
  procesosHijo: Objetivo[]
  objetivo: string

}
