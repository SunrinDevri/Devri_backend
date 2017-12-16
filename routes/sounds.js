import speech from '@google-cloud/speech';
import google from 'googleapis';
const Storage = require('@google-cloud/storage');
const storage = Storage();
var google_account = '/root/google/account.json';


const client = new speech.SpeechClient({
  projectId: google_account.project_id,
  keyFilename: google_account
});


// Makes an authenticated API request.
storage
  .getBuckets()
  .then((results) => {
    const buckets = results[0];

    console.log('Buckets:');
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

const config = {
  languageCode: "ko-KR",
};

const request = {
  config: config,
  audio: "",
};


module.exports = (router, axios)=>{
  router.post('/', function(req, res, next) {
    request.audio = req.body.base64;

    client.recognize(request).then(data => {
        const response = data[0];
        const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
        console.log(`Transcription: `, transcription);
      }).catch(err => {
        console.error('ERROR:', err);
      });
  return res.status(200).send("asdf");
});


  return router;
}
