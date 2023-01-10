export function filterEmptyFields(obj: Object) {
  return JSON.parse(JSON.stringify(obj));
}
