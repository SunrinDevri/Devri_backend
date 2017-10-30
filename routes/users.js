module.exports = (router, Users)=>{
  router.get('/', async (req, res)=>{
    const users = await Users.find();
    return res.status(200).json(users);
  })

  .post('/user', (req, res)=>{

  })

  .put('/:id', (req, res)=>{

  })

  .delete('/:id', (req, res)=>{

  })

  return router;
}
