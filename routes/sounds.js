import speech from '@google-cloud/speech';
import TwitterKoProcessor from 'node-twitter-korean-text'; 

let google_account = require('/root/google/account.json');
var google_auth = '/root/google/account.json';

const client = new speech.SpeechClient({
  projectId: google_account.project_id,
  keyFilename: google_auth
});

module.exports = (router, Users, axios, fs, multer)=>{
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/root/Devri_backend/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({ storage: storage })


  router.post('/', upload.single('wav'), async (req, res, next)=>{
    const file = fs.readFileSync('/root/Devri_backend/uploads/'+req.file.originalname);
    const audioBytes = file.toString('base64');

    const audio = {
      content: audioBytes,
    };

    const config = {
      languageCode: 'ko-KR',
    };

    const request = {
      audio: audio,
      config: config,
    };
    client
      .recognize(request)
      .then(async data => {
        const response = data[0];
        const transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
        const tokens = await TwitterKoProcessor.tokenize(transcription);
        const result = await TwitterKoProcessor.tokensToJsonArray(tokens, true)
      
        return res.status(200).json({result: result});
    })
    /*.catch(err => {
       return res.status(412).json({message: err});
    });*/
});


  return router;
}
