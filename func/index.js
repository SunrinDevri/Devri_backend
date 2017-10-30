function user_duplicate(message) {
  this.message = (message || "");
}
function ValidationError(message) {
  this.message = (message || "");
}
function paramsError(message) {
  this.message = (message || "");
}

user_duplicate.prototype = new Error();
ValidationError.prototype = new Error();
paramsError.prototype = new Error();

global.user_duplicate = user_duplicate;
global.ValidationError = ValidationError;
global.paramsError = paramsError;

global.check_param = (req_param, params) =>{
  return
}
