export function achaMesa(idMesa: string, mesas: { id: any }[]): any {
  const imatv = mesas.findIndex(
    mesa => mesa.id == idMesa,
  )
  if (imatv < 0) {
    return null
  }
  else
    return mesas[imatv]
}