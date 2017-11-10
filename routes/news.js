var options = {
      method: 'GET',
   headers: {
       'X-Naver-Client-Id': 'dZ5WXJrBWsOUV7aC4z4I',
       'X-Naver-Client-Secret': 'TDDA5_EuHI'
   },

};
module.exports = (router, Users, request)=>{
  var query = "헤드라인";
  
  router.get('/', async (req, res)=>{
    var response =  await request("https://openapi.naver.com/v1/search/news.json?query="+query, options);
    var body = JSON.parse(response.body);
    res.status(200).send(body);
  });

  return router;
}
