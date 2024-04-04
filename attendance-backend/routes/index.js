var express = require('express');
var router = express.Router();
var canvas = require('canvas');
var faceapi = require('face-api.js');
var Face = require('../db/FaceSchema.js');
var Attandance = require('../db/AttendanceSchema.js');
const Attendance = require('../db/AttendanceSchema.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/create-face", async (req, res) => {
  console.log(req.body)
  const face = req.files.face.tempFilePath
  const name = req.body.name
  const id = req.body.id
  let result = await uploadLabeledImages (face, id, name); 
  if(result){
    res.json({message:"Face data stored successfully"})
  } else{
    res.json({message: "Something went wrong, please try again."})
  }
});

router.post("/check-face", async (req, res) => {
  const face = req.files.face.tempFilePath
  let result = await getDescriptorsFromDB(face);
  if(result && result[0]){
    const createAttendance = new Attendance({
      studentId: result[0]._label,
      attended: true,
      // save date in the format of "YYYY-MM-DD"
      date: new Date().toISOString().split('T')[0],
    });
    await createAttendance.save();
  }
  res.json({result}); 
})

router.get("/attendance", async (req, res) => {
  const date = req.body.date || new Date().toISOString().split('T')[0];
  console.log(date)
  let students = await Face.find();
  let attandance = await Attendance.find({date: date});
  let result = [];
  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    let studentAttendance = attandance.find((a) => a.studentId === student.id);
    result.push({
      "student_name": student.name,
      "student_id": student.id,
      "has_attended": studentAttendance ? studentAttendance.attended : false
    });
  }
  res.json(result);
})

async function uploadLabeledImages(face, id, name) { 
  try {
    const img = await canvas.loadImage(face); 
    const detections = await faceapi.detectSingleFace (img).withFaceLandmarks().withFaceDescriptor();
    const descriptors = Array.from(detections.descriptor);
    console.log(descriptors.length)
    const createFace = new Face({
      id: id,
      name: name,
      descriptor: descriptors,
    });
    createFace.description = descriptors;
    console.log(createFace.description)
    await createFace.save();
    return true;
  } catch (error) {
    console.log(error); return (error);
  }
};

async function getDescriptorsFromDB (image) {
  // Get all the face data from mongodb and loop through each of them to read the data 
  let faces = await Face.find();
  for (i = 0; i < faces.length; i++) {
    const temp = []
    temp.push(new Float32Array(faces[i].description))
    faces[i].description = temp;
    faces[i] = new faceapi.LabeledFaceDescriptors(faces[i].id, faces[i].description);
  }
      
  // Load face matcher to find the matching face
  const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);

  // Read the image using canvas or other method
  const img = await canvas.loadImage(image);
  let temp = faceapi.createCanvasFromMedia(img);
    
  // Process the image for the model
  const displaySize = { width: img.width, height: img.height };
  faceapi.matchDimensions (temp, displaySize);

  // Find matching faces
  const detections = await faceapi.detectAllFaces (img).withFaceLandmarks().withFaceDescriptors(); 
  const resizedDetections = faceapi.resizeResults (detections, displaySize);
  const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor)); 
  return results;
}



module.exports = router;
