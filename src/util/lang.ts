/**
 * check if data is object/array
 */
function isObject(data: any): boolean {
  return data !== null && typeof data === 'object';
}

function isType(type: string): (data: any) => boolean {
  type = type.toLowerCase();
  return function(data) {
    const dataType: string = Object.prototype.toString.call(data).slice(8, -1);
    return dataType.toLowerCase() === type;
  };
}
const isPureObject = isType('object');
const isArray = isType('array');

export { isObject, isPureObject, isArray };
