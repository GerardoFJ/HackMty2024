
import cv2
import requests
import numpy as np

# API endpoint and headers
url = "https://api.luxand.cloud/photo/liveness/v2" 
headers = {
    "token": "TOKEN_HERE",
}

# Initialize the camera
cap = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()
    
    # Display the resulting frame
    cv2.imshow('Camera', frame)

    # Wait for key press
    key = cv2.waitKey(1) & 0xFF

    # If 's' is pressed, capture and send the photo
    if key == ord('s'):
        # Convert the frame to JPEG format
        _, img_encoded = cv2.imencode('.jpg', frame)
        files = {
        "photo": img_encoded.tobytes(),
    }
        # Convert to bytes and send it in a POST request
        response = requests.request("POST", url, headers=headers, files=files)

        print(f'Status Code: {response.status_code}')
        print(response.text.encode('utf8'))

    # Break the loop if 'q' is pressed
    elif key == ord('q'):
        break

# Release the camera and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()
