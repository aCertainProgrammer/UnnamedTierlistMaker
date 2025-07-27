import os
from PIL import Image

input_directory = "./"  
output_directory = "./"  

target_size = (80, 80)

if not os.path.exists(output_directory):
    os.makedirs(output_directory)

for filename in os.listdir(input_directory):
    if filename.lower().endswith(('png', 'jpg', 'jpeg', 'bmp', 'gif')):
        input_image_path = os.path.join(input_directory, filename)

        img = Image.open(input_image_path)

        resized_img = img.resize(target_size, Image.ANTIALIAS)

        output_image_path = os.path.join(output_directory, f"{os.path.splitext(filename)[0]}.webp")
        resized_img.save(output_image_path, format="WEBP", quality=85)

        print(f"Cropped image saved: {output_image_path}")

print("Cropping completed for all images.")

