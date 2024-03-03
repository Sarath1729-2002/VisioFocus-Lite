VisioFocus-Lite
===================================

A lightweight and simple browser implementation for the VisioFocus project

Funded by the Hon'r Ministry of Electronics and Information Technology, Government of India [Sanction number L-14011/4/2022-HRD]

------------------------------------------------------------------------------------------------------------------------

This project demonstrates how to use the FaceAPI library to detect faces, predict emotions and calculate the pitch, yaw, and roll angles of the head in real-time video. The project uses the Tiny Face Detector model to detect faces, the Face Landmark 68 Net model to detect facial landmarks, and the Face Expression Net model to detect facial expressions. The project also uses OpenCV.js to calculate the Euler angles from the detected facial landmarks.

Getting Started
---------------

To get started with this project, you will need to have Node.js and npm installed on your computer. You will also need a webcam connected to your computer.

1. Clone the repository to your local machine:
```bash
git clone https://github.com/Sarath1729-2002/VisioFocus-Lite.git
```
2. Start the server ; use either node package manager or a Python Simple HTTP server :
```
npm start

or

python3 -m http.server
```
4. Open your web browser and navigate to <http://localhost:8080>. You should see a video stream from your webcam, and the pitch, yaw, and roll angles should be displayed on the screen.

How It Works
------------

The Emotion Recognition pillar of the project uses the FaceAPI library to detect faces and facial landmarks in real-time video. The Tiny Face Detector model is used to detect faces, and the Face Landmark 68 Net model is used to detect 68-point facial landmarks. The Face Expression Net model is also used to detect facial expressions, above a specified confidence threshold

The Pose Estimation pillar of the project uses OpenCV.js to calculate the Euler angles from the detected facial landmarks. The 68-point facial landmarks are used to calculate the 3D coordinates of the nose and the left and right eyes. These coordinates are then used to calculate the rotation matrix using the OpenCV.js SolvePnP function, courtesy of Mike Chung's rendition of OpenCV.js which is used to calculate the Euler angles and subsequently the yaw, pitch and roll of the face.

The project uses WebGL to accelerate the face detection and recognition algorithms. WebGL is used to perform the convolutions and other operations involved in the face detection and recognition algorithms on the GPU, which is much faster than performing the operations on the CPU. This allows the project to detect and recognize faces in real-time video streams, even on relatively low-powered devices like smartphones and tablets.

FaceAPI Functions
-----------------

The following FaceAPI functions are used in this project:

* `faceapi.detectAllFaces`: This function is used to detect all faces in an image or video frame. It takes two arguments: the image or video frame to detect faces in, and an optional options object to configure the face detection algorithm. The function returns an array of detection results, each containing information about the location, size, and orientation of a detected face.
* `faceapi.TinyFaceDetectorOptions`: This object is used to configure the face detection algorithm to use the Tiny Face Detector model, which is a smaller and faster model that is optimized for detecting small faces in real-time video.
* `withFaceLandmarks`: This method is used to compute the facial landmarks for each detected face.
* `withFaceExpressions`: This method is used to compute the facial expressions for each detected face.
* `faceapi.detectFaceLandmarks`: This function is used to detect the 68-point facial landmarks in an image or video frame. The function returns an array of landmark points, each containing the x and y coordinates of a landmark point in the image or video frame.

Haar Cascades 68 Point Landmarks
--------------------------------

Haar cascades is a machine learning-based approach for object detection that is used in OpenCV, another popular computer vision library. Haar cascades are trained on a large dataset of positive and negative images to detect specific objects, such as faces, eyes, or noses. The 68-point facial landmarks used in FaceAPI are similar to the facial landmarks that can be detected using Haar cascades in OpenCV.

WebGL
-----

WebGL (Web Graphics Library) is a JavaScript API for rendering interactive 3D graphics in the browser. FaceAPI uses WebGL to accelerate the face detection and recognition algorithms, allowing them to run in real-time on modern web browsers. WebGL is used to perform the convolutions and other operations involved in the face detection and recognition algorithms on the GPU, which is much faster than performing the operations on


Acknowledgements
-----------------

This project would not have been possible without the contributions of the following individuals and projects:

* [Head Pose Estimation using OpenCV JavaScript](https://github.com/mjyc/head-pose-estimation-demo) by [Mike Chung](https://github.com/mjyc) for providing a starting point for the head pose estimation code.
* [Facial Emotion Recognition using Face API landmark, face detection and expression models](https://github.com/dhairyachandra/face-emotion-recognition) by [Dhairya Chandra](https://github.com/dhairyachandra) for providing a starting point for the facial emotion recognition code.

Thank you to these individuals and projects for their valuable contributions to the field of computer vision and for making their work available for others to build upon.
