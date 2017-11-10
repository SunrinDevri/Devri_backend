function user_duplicate(message) {
  this.message = (message || "");
}
function ValidationError(message) {
  this.message = (message || "");
}
function paramsError(message) {
  this.message = (message || "");
}
function boxoffices_duplicate(message) {
  this.message = (message || "");
}

boxoffices_duplicate.prototype = new Error();
user_duplicate.prototype = new Error();
ValidationError.prototype = new Error();
paramsError.prototype = new Error();

global.user_duplicate = user_duplicate;
global.ValidationError = ValidationError;
global.paramsError = paramsError;
global.boxoffices_duplicate = boxoffices_duplicate;
