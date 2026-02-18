import numpy as np
import os
TF_ENABLE_ONEDNN_OPTS = 0
import tensorflow as tf
from keras.preprocessing import image
import sys
import pandas as pd

# 스크립트 위치 기준 상대 경로
script_dir = os.path.dirname(os.path.abspath(__file__))

def load_image(img_path, show=False):
    img = tf.keras.preprocessing.image.load_img(img_path, target_size=(150, 150))
    img = tf.keras.preprocessing.image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    return img

def ensemble_predict(models, img):
    # 여러 모델의 예측을 평균 내어 최종 예측을 수행합니다.
    predictions = np.array([model.predict(img) for model in models])
    avg_predictions = np.mean(predictions, axis=0)
    class_labels = ['flea_allergy', 'hotspot', 'mange', 'ringworm']
    predicted_class = class_labels[np.argmax(avg_predictions)]
    return predicted_class, avg_predictions

# 모델들을 로드 (스크립트 위치 기준 상대 경로)
# 참고: 모델 파일(.h5)이 없으면 이 기능은 작동하지 않습니다.
skin_model_dir = os.path.join(script_dir, 'Skin')
model_files = ['SkinDisease-S.h5', 'SkinDisease2-S.h5', 'SkinDisease5-S.h5']

models = []
for mf in model_files:
    model_path = os.path.join(skin_model_dir, mf)
    if os.path.exists(model_path):
        models.append(tf.keras.models.load_model(model_path))
    else:
        print(f"Warning: Model file not found: {model_path}", file=sys.stderr)

if __name__ == "__main__":
    image_path = sys.argv[1]  # 이미지 경로는 명령줄 인수로 받음
    if len(models) == 0:
        print("Error: No skin disease models found. Please place .h5 files in the Skin/ folder.")
        sys.exit(1)
    img = load_image(image_path)
    label, predictions = ensemble_predict(models, img)
    print(label)