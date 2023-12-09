import cv2
import mediapipe as mp

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb_frame)
    keypoints = results.pose_landmarks

    # Access individual keypoints using keypoints.landmark
    if keypoints:
        shoulder = keypoints.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
        elbow = keypoints.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]

        # Calculate the angle between shoulder and elbow to determine push-up movement
        angle = calculate_angle(shoulder, elbow)
        # Send the angle data to your three.js game for plane movement

    cv2.imshow('Webcam Feed', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
def calculate_angle(a, b):
    # Calculate the angle between vectors a->b
    angle_rad = math.atan2(b.y - a.y, b.x - a.x)
    angle_deg = math.degrees(angle_rad)
    return angle_deg

