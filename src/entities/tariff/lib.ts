export const TARIFFS = [7, 14, 30]
export const DEFAULT = 7

export const getTariffBy = (duration: number) => {
   return TARIFFS.filter(t => t <= duration).slice(-1)[0]
}
