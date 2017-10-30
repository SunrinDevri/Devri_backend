module.exports = (router, Users, passport) =>{
  router.post('/signup', async (req, res) => {
      const data = req.body;
      const new_user = new Users(data);
      try{
        var result = await new_user.save();
      }catch(e){
        if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
        if(e instanceof ValidationError) return res.status(400).json({message: e.message});
        if(e instanceof paramsError) return res.status(400).json({message: e.message});
      }
      return res.status(200).json(result);
  })

  .post('/signin', (req,res)=>{
    var params = ['id', 'passwd'];
    if(check_param(req.body, params)){
      Users.findOne({id: req.body.id, passwd: req.body.passwd}, {__v:0, _id: 0, passwd: 0}, (err, user)=>{
        if(err) return res.status(500).send("DB err");
        if(user) return res.status(200).json(user);
        else return res.status(404).send("incorrect id or passwd");
      });
    }else return res.status(400).send("param missing or null");
  })

  .get('/auto/:token', (req, res)=>{
     var params = ['token'];

     if(check_param(req.params, params)){
       const token = req.params.token;
       Users.findOne({token: token}, {_id: 0, passwd: 0},(err, user) =>{
         if(err) return res.status(500).send("DB error");
         if(user) return res.status(200).json({id: user.id, name: user.name, token: user.token});
         else return res.status(404).send("user not found");
       });
     }else{
       return res.status(400).send("param missing or null");
     }
  })

  return router;
}
