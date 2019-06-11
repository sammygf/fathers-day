const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  keyfileName: __dirname + '/key/fathers-day-c274943f45ad.json',
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.detectFace = functions.https.onRequest(async (request, response) => {
  const imageContent = request.body.image;
  const r = {
    image: {
      content: imageContent,
    }
  };
  const results = await client.faceDetection(r);
  const face = results[0].faceAnnotations;
  response.json(face);
});
