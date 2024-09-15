from deepface import DeepFace
import os
import cv2
import tempfile

from datetime import datetime

# Rutas a las carpetas de imágenes
image_folder = "imgs/"
criminal_folder = os.path.join(image_folder, "criminals/")
user_folder = os.path.join(image_folder, "users/")

# Mapeo de imágenes a nombres de usuarios #!esto puede hacerse distinto
user_mapping = {
    "user0.jpeg": "Ana",
    "user1.jpeg": "Juan",
    "user2.jpeg": "Anya",
    "user3.jpeg": "Carlos",
    "user4.jpeg": "Dana"
}

# Buscar que la imagen este dentro de la carpeta criminal_folder
def is_criminal(image_path):
    for criminal_image in os.listdir(criminal_folder):
        criminal_image_path = os.path.join(criminal_folder, criminal_image)
        try:
            result = DeepFace.verify(img1_path=image_path, img2_path=criminal_image_path)
            if result['verified']:  # Si la cara coincide
                return True
        except Exception as e:
            print(f"Error al verificar {criminal_image_path}: {e}")
            continue
    return False

# Buscar que la imagen este dentro de la carpeta user_folder y a que user se parece
def is_user(image_path):
    for user_image in os.listdir(user_folder):
        user_image_path = os.path.join(user_folder, user_image)
        try:
            result = DeepFace.verify(img1_path=image_path, img2_path=user_image_path)
            if result['verified']:  # Si la cara coincide
                # Devuelve el nombre del usuario basándose en el mapeo
                return user_mapping.get(user_image, None)
        except Exception as e:
            print(f"Error al verificar {user_image_path}: {e}")
            continue
    return None

def capture_image():
    # Inicializa la cámara
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("No se pudo abrir la cámara.")
        return None

    print("Capturando imagen...")

    # Captura una imagen
    ret, frame = cap.read()
    cap.release()

    if not ret:
        print("No se pudo capturar la imagen.")
        return None

    # Crea un archivo temporal para guardar la imagen
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
    cv2.imwrite(temp_file.name, frame)

    return temp_file.name

def main():
    comprobation_image = capture_image()
    if comprobation_image is None:
        print("Error al capturar la imagen.")
        return

    if is_criminal(comprobation_image):
        print("\n\n\n¡Alerta de seguridad! Acceso denegado\n\n\n")
    else:
        user = is_user(comprobation_image)
        if user:
            print(f"\n\n\nAcceso a la cuenta {user}\n\n\n")
        else:
            print("\n\n\nAcceso denegado, no es un usuario registrado\n\n\n")

    # Elimina el archivo temporal
    os.remove(comprobation_image)
    
if __name__ == "__main__":
    current_time = datetime.now()
    main()
    final_time = datetime.now() - current_time
    print("Tardó:", final_time)