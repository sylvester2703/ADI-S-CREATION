import os
import shutil
import pypdfium2 as pdfium
from PIL import Image

pdf_source = r"C:\Users\Dell\.gemini\antigravity-ide\brain\93e28e49-c6be-4936-8500-ac6ac7ebcd15\.user_uploaded\media_1791260239773.pdf"
dest_dir = r"c:\Users\Dell\OneDrive\Desktop\ADI'S CREATION\public\assets"
brochure_dir = os.path.join(dest_dir, "brochure")
products_dir = os.path.join(dest_dir, "products")
brand_dir = os.path.join(dest_dir, "brand")

os.makedirs(brochure_dir, exist_ok=True)
os.makedirs(products_dir, exist_ok=True)
os.makedirs(brand_dir, exist_ok=True)

# 1. Copy the original PDF brochure
target_pdf_path = os.path.join(brochure_dir, "Adis_Creation_Diya_Collection_2026.pdf")
shutil.copyfile(pdf_source, target_pdf_path)
print(f"Copied original PDF brochure to {target_pdf_path}")

# 2. Render all 18 pages at high resolution
pdf = pdfium.PdfDocument(pdf_source)
print(f"Total pages in PDF: {len(pdf)}")

page_images = []
for i, page in enumerate(pdf):
    # Render at scale 2.5 (~180-200 DPI) for crisp clarity
    bitmap = page.render(scale=2.5)
    pil_image = bitmap.to_pil()
    page_num = i + 1
    page_img_path = os.path.join(brochure_dir, f"page-{page_num:02d}.jpg")
    pil_image.save(page_img_path, "JPEG", quality=95)
    page_images.append(pil_image)
    print(f"Rendered Page {page_num:02d}: {pil_image.size} -> {page_img_path}")

# 3. Extract the Official Brand Logo from Page 2 (top purple badge)
page2_img = page_images[1]
w, h = page2_img.size
# On Page 2, the dark purple badge with hanging diyas + "Adi's CREATION Lights n Lamps" is at top ~0.05 to 0.58 height
logo_crop = page2_img.crop((int(w * 0.08), int(h * 0.06), int(w * 0.92), int(h * 0.58)))
logo_path = os.path.join(brand_dir, "adis_creation_logo.jpg")
logo_crop.save(logo_path, "JPEG", quality=95)

# Also create a square icon version for favicon / avatar
logo_square = logo_crop.crop((0, 0, logo_crop.width, logo_crop.width)) if logo_crop.width <= logo_crop.height else logo_crop
logo_square.resize((192, 192)).save(os.path.join(brand_dir, "favicon.png"), "PNG")
print(f"Extracted Logo to {logo_path}")

# 4. Extract individual product images accurately from the pages:
# Let's define crop boxes (normalized 0.0-1.0 coords: left, top, right, bottom) for each product

crops = [
    # Page 1 Cover Highlights
    {"page": 1, "name": "hero_cover_mosaic", "box": (0.0, 0.40, 1.0, 0.98)},
    
    # Page 3 Best Sellers
    {"page": 3, "name": "bestseller_tall_peacock_samai_trio", "box": (0.04, 0.17, 0.96, 0.43)},
    {"page": 3, "name": "bestseller_peacock_rangoli_diya_duo", "box": (0.10, 0.47, 0.90, 0.68)},
    {"page": 3, "name": "bestseller_festive_diya_sup_grid", "box": (0.05, 0.70, 0.95, 0.96)},
    
    # Page 4 In Pairs
    {"page": 4, "name": "swastik_step_diya_pairs_150", "box": (0.10, 0.17, 0.90, 0.53)},
    {"page": 4, "name": "peacock_leaf_flower_diya_pair_200", "box": (0.10, 0.62, 0.90, 0.88)},
    
    # Page 5 Diya Pairs & Elephant Diyas
    {"page": 5, "name": "lotus_petal_circular_diya_pairs_150", "box": (0.05, 0.02, 0.58, 0.46)},
    {"page": 5, "name": "handcrafted_elephant_pair_diya_150", "box": (0.35, 0.56, 0.95, 0.93)},
    
    # Page 6 Nature & Animal Motif Diyas
    {"page": 6, "name": "decorative_fish_diya_single_120", "box": (0.05, 0.04, 0.75, 0.26)},
    {"page": 6, "name": "handcrafted_tortoise_kurma_diya_pair_150", "box": (0.35, 0.35, 0.95, 0.63)},
    {"page": 6, "name": "handcrafted_kalash_pourer_diya_single_120", "box": (0.05, 0.72, 0.72, 0.96)},
    
    # Page 7 Shankh, Paisley & Mini Peacock
    {"page": 7, "name": "royal_shankh_conch_diya_single_150", "box": (0.05, 0.06, 0.72, 0.30)},
    {"page": 7, "name": "traditional_paisley_mango_diya_pair_120", "box": (0.42, 0.36, 0.95, 0.62)},
    {"page": 7, "name": "elegant_mini_peacock_diya_pair_120", "box": (0.05, 0.68, 0.70, 0.93)},
    
    # Page 8 Handcrafted Samai Diya Small (5cm)
    {"page": 8, "name": "samai_diya_small_5cm_pair_150", "box": (0.05, 0.16, 0.95, 0.64)},
    {"page": 8, "name": "samai_diya_small_stack_view", "box": (0.50, 0.64, 0.95, 0.88)},
    
    # Page 9 Handcrafted Samai Diya Medium (7cm)
    {"page": 9, "name": "samai_diya_medium_7cm_pair_300", "box": (0.05, 0.18, 0.95, 0.64)},
    {"page": 9, "name": "samai_diya_medium_stack_view", "box": (0.52, 0.58, 0.88, 0.78)},
    
    # Page 10 Royal Peacock Pillar Samai Diya (750 Pair)
    {"page": 10, "name": "grand_peacock_pillar_samai_pair_750", "box": (0.04, 0.06, 0.96, 0.92)},
    {"page": 10, "name": "peacock_pillar_top_pair", "box": (0.04, 0.06, 0.48, 0.36)},
    {"page": 10, "name": "peacock_pillar_center_pair", "box": (0.28, 0.34, 0.72, 0.64)},
    
    # Page 11 Dome Akhand / Lantern Diyas
    {"page": 11, "name": "dome_akhand_diya_pink_purple_150", "box": (0.05, 0.01, 0.58, 0.24)},
    {"page": 11, "name": "dome_akhand_diya_assortment_row", "box": (0.10, 0.32, 0.90, 0.53)},
    {"page": 11, "name": "temple_tower_lantern_diya_pair_150", "box": (0.04, 0.54, 0.96, 0.84)},
    
    # Page 12 Festive Crimson Dome Diyas (80 Single / 150 Pair)
    {"page": 12, "name": "crimson_gold_round_dome_diya_150", "box": (0.10, 0.10, 0.68, 0.36)},
    {"page": 12, "name": "crimson_gold_teardrop_lantern_diya_150", "box": (0.48, 0.39, 0.98, 0.64)},
    {"page": 12, "name": "crimson_gold_temple_window_dome_diya_150", "box": (0.08, 0.67, 0.68, 0.96)},
    
    # Page 13 Tower Lanterns & Globe Dome Diyas
    {"page": 13, "name": "spherical_globe_dome_diya_single_130", "box": (0.10, 0.06, 0.90, 0.30)},
    {"page": 13, "name": "pagoda_multi_tier_temple_lantern_pair_250", "box": (0.10, 0.38, 0.90, 0.62)},
    {"page": 13, "name": "teardrop_gem_dome_diya_single_130", "box": (0.10, 0.72, 0.90, 0.96)},
    
    # Page 14 Hanging Diya Collection (150 Pair)
    {"page": 14, "name": "hanging_diya_temple_arch_laxmi_ganesh_pair_150", "box": (0.10, 0.12, 0.90, 0.30)},
    {"page": 14, "name": "hanging_diya_lotus_bloom_pair_150", "box": (0.15, 0.31, 0.85, 0.64)},
    {"page": 14, "name": "hanging_diya_peacock_feather_pair_150", "box": (0.05, 0.69, 0.95, 0.98)},
    
    # Page 15 Traditional 7-Flame Peacock Diya (325)
    {"page": 15, "name": "traditional_7_flame_peacock_rangoli_diya_325", "box": (0.05, 0.05, 0.95, 0.40)},
    {"page": 15, "name": "traditional_peacock_diya_blue_detail_325", "box": (0.20, 0.53, 0.80, 0.84)},
    
    # Page 16 Festive Diya Sup (350)
    {"page": 16, "name": "festive_diya_sup_shubh_labh_plate_350", "box": (0.05, 0.55, 0.95, 0.97)},
    {"page": 16, "name": "festive_diya_sup_tulsi_mandir_setup_350", "box": (0.04, 0.04, 0.96, 0.46)},
    
    # Page 17 Decorative Laxmi Ganpati Plate (200)
    {"page": 17, "name": "decorative_laxmi_ganpati_puja_plate_200", "box": (0.05, 0.18, 0.95, 0.82)},
]

for item in crops:
    pg_idx = item["page"] - 1
    img = page_images[pg_idx]
    w, h = img.size
    l, t, r, b = item["box"]
    crop_box = (int(w * l), int(t * h), int(w * r), int(b * h))
    cropped = img.crop(crop_box)
    prod_path = os.path.join(products_dir, f"{item['name']}.jpg")
    cropped.save(prod_path, "JPEG", quality=95)
    print(f"Saved product image: {item['name']}.jpg ({cropped.size})")

print("All brochure assets and product crops generated successfully!")
