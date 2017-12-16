import speech form '@google-cloud/speech';

const client = new speech.SpeechClient();


const config = {
  languageCode: "ko",
};

const request = {
  config: config,
  audio: "",
};


module.exports = (router)=>{
  router.get('/', function(req, res, next) {
    request.audio = req.params.base64;
    client.recognize(request).then(data => {
        const response = data[0];
        const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
        console.log(`Transcription: `, transcription);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
});


  return router;
}
