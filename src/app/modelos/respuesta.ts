export interface Respuesta<T> {
  mensajeError: string;
  estado: boolean;
  content: T
}
