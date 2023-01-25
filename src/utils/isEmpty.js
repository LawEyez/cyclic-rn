const isEmpty = (val) => (
  val === undefined ||
  val === null ||
  (typeof val === 'string' && val.length === 0) ||
  (typeof val === 'object' && Object.keys(val).length === 0)
) 

export default isEmpty