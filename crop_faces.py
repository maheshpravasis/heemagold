import cv2
import sys

img_path = sys.argv[1]
image = cv2.imread(img_path)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
faces = face_cascade.detectMultiScale(gray, 1.1, 4)

# Sort faces by y coordinate so we get them in order from top to bottom
faces = sorted(faces, key=lambda x: x[1])

names = ['manikandan', 'ratheesh', 'suresh']
for i, (x, y, w, h) in enumerate(faces):
    if i >= 3: break
    # Add padding
    padding = int(w * 0.4)
    x1 = max(0, x - padding)
    y1 = max(0, y - padding)
    x2 = min(image.shape[1], x + w + padding)
    y2 = min(image.shape[0], y + h + padding)
    
    face_img = image[y1:y2, x1:x2]
    cv2.imwrite(f"{names[i]}.png", face_img)
    print(f"Saved {names[i]}.png")
