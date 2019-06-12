const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  keyfileName: __dirname + '/key/fathers-day-c274943f45ad.json',
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

function getLandmark(face, name) {
  return face.landmarks.find(({ type }) => type === name).position;
};

exports.detectFaces = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const imageContent = request.body.data.image;

    console.log(imageContent)

    const r = {
      image: {
        content: imageContent,
      }
    };

    const results = await client.faceDetection(r);
    const annotations = results[0].faceAnnotations;
    let data = null;

    if (annotations.length) {
      const face = annotations[0];
      const { landmarks, rollAngle } = annotations[0];
      const noseTip = getLandmark(face, 'NOSE_TIP');
      const leftEar = getLandmark(face, 'LEFT_EAR_TRAGION');
      const rightEar = getLandmark(face, 'RIGHT_EAR_TRAGION');
      const rightEyeCorner = getLandmark(face, 'RIGHT_EYE_RIGHT_CORNER');
      const leftEyeCorner = getLandmark(face, 'LEFT_EYE_LEFT_CORNER');

      data = {
        landmarks,
        rollAngle,
        noseTip,
        leftEar,
        rightEar,
        rightEyeCorner,
        leftEyeCorner,
      }
    }

    response.json({ data });
  });
});
