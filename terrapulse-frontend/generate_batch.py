import os
import random
from PIL import Image, ImageEnhance, ImageFilter

# Make sure you have your original images in sample_docs/
input_files = ["sample_docs/image_c12f25.jpg", "sample_docs/image_c19884.jpg", "sample_docs/1.webp"]
output_dir = "batch_testing_dataset/images/"

print("Starting Batch Dataset Generation...")

for file_path in input_files:
    if not os.path.exists(file_path):
        print(f"Skipping {file_path} (File not found)")
        continue
        
    base_name = os.path.basename(file_path).split('.')[0]
    img = Image.open(file_path)
    
    # Generate 10 variations per image
    for i in range(1, 11):
        augmented_img = img.copy()
        
        # 1. Random Rotation (Simulates crooked camera angle)
        angle = random.uniform(-15, 15)
        augmented_img = augmented_img.rotate(angle, expand=True, fillcolor="white")
        
        # 2. Random Brightness (Simulates bad lighting)
        enhancer = ImageEnhance.Brightness(augmented_img)
        augmented_img = enhancer.enhance(random.uniform(0.5, 1.5))
        
        # 3. Random Blur (Simulates shaky hands)
        if random.choice([True, False]):
            augmented_img = augmented_img.filter(ImageFilter.GaussianBlur(radius=random.uniform(0.5, 2.0)))
            
        # Save the synthetic batch file
        output_path = f"{output_dir}{base_name}_var_{i}.jpg"
        augmented_img.convert('RGB').save(output_path, quality=random.randint(60, 90))
        print(f"Generated: {output_path}")

print("Image Augmentation Complete! You now have 30 testing images.")