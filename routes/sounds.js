import speech from '@google-cloud/speech';
import google from 'googleapis';

google.auth.getApplicationDefault(function(err, authClient) {
   if (err) {
     return cb(err);
   }
   if (authClient.createScopedRequired &&
       authClient.createScopedRequired()) {
     authClient = authClient.createScoped(
         ['https://www.googleapis.com/auth/devstorage.read_write']);
   }
   var storage = google.storage('v1');
   storage.buckets.list({
     auth: authClient,
     project: projectId
   }, cb);
 });



const client = new speech.SpeechClient();


const config = {
  languageCode: "ko",
};

const request = {
  config: config,
  audio: "",
};


module.exports = (router, axios)=>{
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
