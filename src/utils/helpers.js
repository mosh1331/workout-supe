export const isNOTNullOrUndefined = value => {
  return !isNullOrUndefined(value)
}

export const isNullOrUndefined = value => {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    value === 'null' ||
    value === 'undefined'
  )
}
