module.exports = (Users, boxoffices, rndString)=>{
  var user_params = ['code', 'pin'];
  Users.pre('save', async function(next, done){
    const user = this;
    let result = await user_params.every(str => user[str] != undefined && user[str] != null && user[str].length > 0);
    if(!result) done(new paramsError("param missing or null"));
    this.token = this.generateToken();
    next(this);
  });
  Users.post('save', (error, res, next)=>{
    if (error.name === 'MongoError' && error.code === 11000) next(new user_duplicate("duplicate error"));
    else if(error.name === "ValidationError") next(new ValidationError(error.message));
    else next(error);
  });
  Users.post('update', (error, res, next)=>{
    if (error.name === 'MongoError' && error.code === 11000) next(new user_duplicate("duplicate error"));
    else if(error.name === "ValidationError") next(new ValidationError(error.message));
    else next(error);
  });

  //boxoffices
  boxoffices.post('save', (error, res, next)=>{
    if (error.name === 'MongoError' && error.code === 11000) next(new boxoffices_duplicate("duplicate error"));
    else if(error.name === "ValidationError") next(new ValidationError(error.message));
    else next(error);
  });

  Users.method('generateToken', ()=>{
    return rndString.generate();
  });
}
