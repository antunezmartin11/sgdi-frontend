export interface hito{
  idCiclo: number;
  fecInicio: Date;
  fecFin: Date;
  usuarioReg: string;
  fecReg: Date;
  usuMod: string;
  fecMod: Date;
}

export interface vincularHito{
  idhitoVinculado: number
  codigo: number
  nombResponsable: string
  idHito: number
}
