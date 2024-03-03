
const video = document.getElementById('video')
const numRows = 4;
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

function findintersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    
    // Find the intersection point of two lines defined by points (x1, y1)-(x2, y2) and (x3, y3)-(x4, y4)
    const intersectionX = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
                         ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    const intersectionY = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
                         ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    
    return { x: intersectionX, y: intersectionY };
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const landmarks = await faceapi.detectFaceLandmarks(canvas)
    

    // 3D model points 
    const modelPoints = cv.matFromArray(numRows, 3, cv.CV_64FC1, [
      0.0,
      0.0,
      0.0, 
      0.0,
      0.0,
      0.0, 
      -225.0,
      170.0,
      -135.0, 
      225.0,
      170.0,
      -135.0 
    ]);

// Camera intrinsics
const focalLength = video.width;
const center = [video.width/2, video.height/2];
const cameraMatrix = [
  [focalLength, 0, center[0]],
  [0, focalLength, center[1]], 
  [0, 0, 1]
];
//const imagePoints = cv.Mat.zeros(numRows, 2, cv.CV_64FC1);
const distCoeffs = cv.Mat.zeros(4, 1, cv.CV_64FC1); // Assuming no lens distortion
const rvec = new cv.Mat({ width: 1, height: 3 }, cv.CV_64FC1);
const tvec = new cv.Mat({ width: 1, height: 3 }, cv.CV_64FC1);
// 2D Image points
const nose = landmarks.getNose();
const leftEye = landmarks.getLeftEye(); 
const rightEye = landmarks.getRightEye();

const imagePoints = new cv.Mat(numRows, 2, cv.CV_64FC1);

// Set values for the nose point
imagePoints.data64F[0] = nose[3].x;
imagePoints.data64F[1] = nose[3].y;

// Duplicate nose point
imagePoints.data64F[2] = nose[3].x;
imagePoints.data64F[3] = nose[3].y;

// Calculate and set values for the left eye point
const leftEyeIntersection = findintersection(leftEye[5].x, leftEye[5].y, leftEye[4].x, leftEye[4].y, leftEye[1].x, leftEye[1].y, leftEye[2].x, leftEye[2].y);
imagePoints.data64F[4] = leftEyeIntersection.x;
imagePoints.data64F[5] = leftEyeIntersection.y;

// Calculate and set values for the right eye point
const rightEyeIntersection = findintersection(rightEye[5].x, rightEye[5].y, rightEye[4].x, rightEye[4].y, rightEye[1].x, rightEye[1].y, rightEye[2].x, rightEye[2].y);
imagePoints.data64F[6] = rightEyeIntersection.x;
imagePoints.data64F[7] = rightEyeIntersection.y;



const roll = Math.atan2(rvec.data64F[2], rvec.data64F[1]);
const pitch = Math.atan2(-rvec.data64F[0], Math.sqrt(rvec.data64F[1]**2 + rvec.data64F[2]**2)); 
const yaw = Math.atan2(rvec.data64F[1], rvec.data64F[2]);

    document.getElementById('roll').textContent = `Roll: ${roll}`;
    document.getElementById('pitch').textContent = `Pitch: ${pitch}`;
    document.getElementById('yaw').textContent = `Yaw: ${yaw}`;


    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)


    console.log(roll, pitch, yaw)
    
  }, 100)
})

