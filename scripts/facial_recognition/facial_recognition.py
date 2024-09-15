from pymongo import MongoClient
from dotenv import load_dotenv
import tempfile
import os

from deepface import DeepFace
import cv2
import requests
import numpy as np

from datetime import datetime

load_dotenv()

# Configuration of the MongoDB connection using the environment variable
uri = os.getenv("MONGO_URI")
if not uri:
    raise ValueError("MONGO_URI not found in .env file")
client = MongoClient(uri)
db = client["ATechM"]
criminals_collection = db["criminalsCollection"]
users_collection = db["usersCollection"]

# API endpoint and headers
url = "https://api.luxand.cloud/photo/liveness/v2" 
headers = {
    "token": "TOKEN_HERE",
}

# Function to convert images from MongoDB to bytes
def image_to_bytes(image_data):
    if isinstance(image_data, dict) and "$binary" in image_data:
        return bytes(image_data["$binary"])
    return image_data

# Search if the image matches any image in criminalsCollection
def is_criminal(image_path):
    try:
        # Create a temporary directory for criminal images
        with tempfile.TemporaryDirectory() as temp_dir:
            for doc in criminals_collection.find({}):
                if "photo" in doc:
                    photo_data = image_to_bytes(doc["photo"])

                    # Save the criminal image in a temporary file
                    temp_image_path = os.path.join(temp_dir, 'criminal_image.jpeg')
                    with open(temp_image_path, 'wb') as temp_image_file:
                        temp_image_file.write(photo_data)

                    # Compare the captured image with the criminal image
                    result = DeepFace.verify(img1_path=image_path, img2_path=temp_image_path)
                    if result['verified']:
                        return True
    except Exception as e:
        print(f"!Error when verifying criminal image: {e}")
    return False

# Search if the image matches any image in usersCollection
def is_user(image_path):
    try:
        # Create a temporary directory for user images
        with tempfile.TemporaryDirectory() as temp_dir:
            for doc in users_collection.find({}):
                if "photo" in doc and "name" in doc:
                    photo_data = image_to_bytes(doc["photo"])
                    user_name = doc["name"]

                    # Save the user image in a temporary file
                    temp_image_path = os.path.join(temp_dir, 'image.jpeg')
                    with open(temp_image_path, 'wb') as temp_image_file:
                        temp_image_file.write(photo_data)

                    # Compare the captured image with the user image
                    result = DeepFace.verify(img1_path=image_path, img2_path=temp_image_path)
                    if result['verified']:
                        return user_name
    except Exception as e:
        print(f"!Error when verifying user image: {e}")
    return None

# Function to capture an image with the camera
def capture_image():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("The camera could not be opened!")
        return None

    print("\n\n\nCapturing Image...\n\n\n")
    
    ret, frame = cap.read()
    cap.release()

    _, img_encoded = cv2.imencode('.jpg', frame)
    files = { "photo": img_encoded.tobytes(),}

    if not ret:
        print("Could not capture the image!")
        return None

    # Create a temporary file to save the captured image
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
    cv2.imwrite(temp_file.name, frame)

    return temp_file.name, files

def main():
    comprobation_image, files = capture_image()

    response = requests.request("POST", url, headers=headers, files=files)
    response_json = response.json()

    if response_json.get("status") == "success": # Check if the face detected is a real face and not a photo before proceeding
        if is_criminal(comprobation_image):
            print("\n\n\nSecurity alert! Access denied\n\n\n")
        else:
            user = is_user(comprobation_image)
            if user:
                print(f"\n\n\nAccess granted to {user}'s account\n\n\n")
            else:
                print("\n\n\nAccess denied, not a registered user\n\n\n")
    else:
        print("\n\n\nAccess denied, not a real person\n\n\n")

    # Delete the temporary file of the captured image
    os.remove(comprobation_image)
    
if __name__ == "__main__":
    current_time = datetime.now()
    main()
    final_time = datetime.now() - current_time
    print("It took:", final_time)
