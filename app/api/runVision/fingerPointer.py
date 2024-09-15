import cv2
import mediapipe as mp
import pyautogui
import time
import numpy as np

# Inicializar MediaPipe Hands y dibujo
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

# Configuración de la captura de video (0 es la cámara por defecto)
cap = cv2.VideoCapture(0)

# Obtener el tamaño de la pantalla para escalar las coordenadas del mouse
screen_width, screen_height = pyautogui.size()

# Variables para el control de tiempo y la detección de movimiento
prev_position = None
static_time_start = None
delay_seconds = 3  # Tiempo necesario para hacer clic si el cursor está quieto

# Variables para suavización
smooth_factor = 5  # Controla el grado de suavización (cuanto mayor, más suave)
position_buffer = []  # Almacenará las últimas posiciones del dedo índice

# Radio de tolerancia para la posición del cursor (en píxeles)
tolerance_radius = 20  # El cursor puede moverse dentro de este radio y aún se contará como "quieto"
magnet_radius = 100  # Radio de atracción a elementos seleccionables

# Obtener la posición de los botones/elementos seleccionables de la pantalla (puedes definirlos manualmente o detectarlos)
selectable_elements = [
    (screen_width // 2, screen_height // 2),  # Centro de la pantalla (ejemplo)
    (screen_width // 3, screen_height // 3),  # Un botón imaginario (ejemplo)
    (screen_width // 4, screen_height // 1.5) # Otro botón imaginario (ejemplo)
]

# Función para suavizar las coordenadas del movimiento del dedo
def smooth_position(new_pos, buffer, smooth_factor):
    buffer.append(new_pos)
    if len(buffer) > smooth_factor:
        buffer.pop(0)
    # Calcular el promedio de las últimas posiciones
    avg_pos = np.mean(buffer, axis=0)
    return int(avg_pos[0]), int(avg_pos[1]), buffer

# Función para verificar si dos posiciones están dentro de un radio de tolerancia
def within_tolerance(pos1, pos2, tolerance_radius):
    distance = np.linalg.norm(np.array(pos1) - np.array(pos2))
    return distance <= tolerance_radius

# Función para encontrar el elemento más cercano al cursor
def find_closest_element(cursor_pos, elements, magnet_radius):
    closest_element = None
    min_distance = float('inf')
    
    for element in elements:
        distance = np.linalg.norm(np.array(cursor_pos) - np.array(element))
        if distance < min_distance and distance <= magnet_radius:
            min_distance = distance
            closest_element = element
    
    return closest_element

# Inicializar el módulo de MediaPipe para manos
with mp_hands.Hands(
        max_num_hands=1,  # Detecta una mano
        min_detection_confidence=0.7,
        min_tracking_confidence=0.7) as hands:
    
    while cap.isOpened():
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # Invertir la imagen horizontalmente para una experiencia tipo espejo
        frame = cv2.flip(frame, 1)
        
        # Convertir la imagen a RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
        
        # Procesar la imagen y detectar manos
        results = hands.process(image)
        
        # Volver a convertir la imagen a BGR
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
        # Si se detecta una mano
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                # Dibujar las landmarks de la mano en la imagen
                mp_drawing.draw_landmarks(
                    image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                
                # Obtener las coordenadas del dedo índice (punta)
                index_finger_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
                
                # Convertir coordenadas normalizadas a píxeles de la cámara
                frame_height, frame_width, _ = frame.shape
                index_finger_x = int(index_finger_tip.x * frame_width)
                index_finger_y = int(index_finger_tip.y * frame_height)
                
                # Mapear las coordenadas de la cámara a las de la pantalla
                screen_x = int(index_finger_tip.x * screen_width)
                screen_y = int(index_finger_tip.y * screen_height)
                
                # Aplicar suavización a las posiciones
                smooth_x, smooth_y, position_buffer = smooth_position(
                    (screen_x, screen_y), position_buffer, smooth_factor)
                
                # Buscar el elemento más cercano al cursor dentro del radio de atracción
                closest_element = find_closest_element((smooth_x, smooth_y), selectable_elements, magnet_radius)
                
                if closest_element:
                    # "Imantar" el cursor al elemento más cercano
                    pyautogui.moveTo(closest_element[0], closest_element[1])
                    smooth_x, smooth_y = closest_element  # El cursor está anclado al elemento
                else:
                    # Mover el cursor del mouse a la posición suavizada si no hay elementos cercanos
                    pyautogui.moveTo(smooth_x, smooth_y)
                
                # Verificar si el cursor está quieto o imantado
                if prev_position is None:
                    prev_position = (smooth_x, smooth_y)
                    static_time_start = time.time()  # Iniciar la cuenta regresiva
                elif within_tolerance((smooth_x, smooth_y), prev_position, tolerance_radius) or closest_element:
                    # Si el cursor está dentro del radio de tolerancia o está imantado a un elemento
                    if static_time_start is not None:
                        elapsed_time = time.time() - static_time_start
                        
                        # Mostrar la cuenta regresiva en la pantalla
                        cv2.putText(image, f'Static for {int(elapsed_time)}s',
                                    (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
                        cv2.putText(image, f'Click in {delay_seconds - int(elapsed_time)}s',
                                    (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
                        
                        # Si el cursor ha estado quieto o imantado durante el tiempo necesario, hacer clic
                        if elapsed_time >= delay_seconds:
                            pyautogui.click()
                            static_time_start = None  # Resetear el contador de tiempo después del clic
                else:
                    # Si el cursor se mueve fuera del radio de tolerancia y no está imantado, reiniciar la cuenta
                    prev_position = (smooth_x, smooth_y)
                    static_time_start = time.time()

        # Mostrar la imagen con las landmarks y la cuenta regresiva
        cv2.imshow('Reconocimiento de Movimiento de Mano', image)
        
        # Salir con la tecla 'q'
        if cv2.waitKey(5) & 0xFF == ord('q'):
            break

# Liberar los recursos de la cámara y cerrar ventanas
cap.release()
cv2.destroyAllWindows()