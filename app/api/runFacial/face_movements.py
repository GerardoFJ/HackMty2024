import cv2
import mediapipe as mp
import math

# Initialize MediaPipe Face Mesh and Drawing Utilities
mp_face_mesh = mp.solutions.face_mesh
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

#Set the angles for the head movement
up_angle = -19
right_angle = 115
left_angle = 60
down_angle = 19
active_state = False

# Initialize webcam feed
cap = cv2.VideoCapture(0)

# Function to calculate the angle between two points
def calculate_angle(p1, p2):
    delta_y = p2[1] - p1[1]
    delta_x = p2[0] - p1[0]
    angle = math.atan2(delta_y, delta_x) * 180 / math.pi  # Convert from radians to degrees
    return angle

# Set up the Face Mesh
with mp_face_mesh.FaceMesh(
    max_num_faces=1,         # Detect only 1 face
    refine_landmarks=True,   # Better accuracy for eye/mouth landmarks
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as face_mesh:

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Flip the image horizontally for a selfie-view display
        frame = cv2.flip(frame, 1)
        
        # Convert the frame from BGR to RGB (required by MediaPipe)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Process the frame to find face landmarks
        result = face_mesh.process(rgb_frame)
        
        # Draw face landmarks on the frame and calculate the inclination angle
        if result.multi_face_landmarks:
            for face_landmarks in result.multi_face_landmarks:

                # Get the landmarks for nose tip (index 1), chin (index 152) and head (index 10)
                nose_tip = face_landmarks.landmark[1]
                chin = face_landmarks.landmark[152]
                head = face_landmarks.landmark[10]

                # Get the 2D coordinates of these points
                nose_point_p = (nose_tip.x * frame.shape[1], nose_tip.y * frame.shape[0])
                chin_point_p = (chin.x * frame.shape[1], chin.y * frame.shape[0])
                chin_point_r = (chin.y* frame.shape[0], chin.z* frame.shape[0])
                head_point_r = (head.y* frame.shape[0], head.z* frame.shape[0])
                
                # Calculate pitch and roll
                pitch = calculate_angle(nose_point_p, chin_point_p)
                roll = calculate_angle(head_point_r, chin_point_r)
               
               # Draw face landmarks on the frame
                # mp_drawing.draw_landmarks(
                #     image=frame,
                #     landmark_list=face_landmarks,
                #     connections=mp_face_mesh.FACEMESH_TESSELATION,
                #     landmark_drawing_spec=None,
                #     connection_drawing_spec=mp_drawing_styles
                #     .get_default_face_mesh_tesselation_style())
                
                # Draw lines from reference angle
                # cv2.line(frame, (int(nose_point_p[0]), int(nose_point_p[1])), (int(chin_point_p[0]), int(chin_point_p[1])), (255, 0, 0), 2)
                # cv2.line(frame, (int(head.x*frame.shape[1]), int( head_point_r[0])), (int(chin_point_p[0]), int(chin_point_p[1])), (0, 255, 0), 2)
                
                # Display the pitch and roll 
                # cv2.putText(frame, f"Pitch angle: {int(pitch)} degrees", (50, 50), 
                #             cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
                # cv2.putText(frame, f"Roll angle: {int(roll)} degrees", (50, 100), 
                #             cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                # Convert pitch and roll to integers for practisity
                pitch = int(pitch)
                roll = int(roll)
                
                #Checking the direction only one time per movement
                if pitch > right_angle and active_state == False:
                    print("right")
                    active_state = True
                elif pitch < left_angle and active_state == False:
                    print("left")
                    active_state = True
                elif roll > down_angle  and active_state == False:
                    print("down")
                    active_state = True
                elif roll < up_angle and active_state == False:
                    print("up")
                    active_state = True
                elif pitch < right_angle and pitch > left_angle and roll < down_angle and roll > up_angle and active_state == True:
                    active_state = False
                else:
                    pass
                
                 
        # Display the result
        # cv2.imshow('MediaPipe FaceMesh with Angle', frame)

        # Break the loop on pressing 'q'
        if cv2.waitKey(5) & 0xFF == ord('q'):
            break

# Release the webcam and close windows
cap.release()
cv2.destroyAllWindows()
