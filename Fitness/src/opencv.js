// OpenCVIntegration.js

let isOpencvReady = false;

function onOpenCvReady() {
  isOpencvReady = true;
  console.log("OpenCV is ready");
}

export function startOpenCv(canvasRef) {
  // Wait for OpenCV to be ready before starting
  if (isOpencvReady) {
    // Initialize OpenCV and perform pose detection
    // Replace the following with your actual OpenCV code
    const src = cv.imread(canvasRef.toDataURL());
    const dst = new cv.Mat();
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    cv.imshow(canvasRef.toDataURL(), dst);
    src.delete();
    dst.delete();
  } else {
    console.error("OpenCV is not ready yet");
  }
}
