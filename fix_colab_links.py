#!/usr/bin/env python3
"""Fix Colab links in all Basic notebooks"""

import json
import os
from pathlib import Path

# Mapping of current filenames to correct Colab URLs
notebooks = {
    "B01 - Arithmetic.ipynb": "Basic/B01%20-%20Arithmetic.ipynb",
    "B02 - Linear Regression.ipynb": "Basic/B02%20-%20Linear%20Regression.ipynb",
    "B03 - Binary Classification.ipynb": "Basic/B03%20-%20Binary%20Classification.ipynb",
    "B04 - Multi-Class Classification.ipynb": "Basic/B04%20-%20Multi-Class%20Classification.ipynb",
    "B05 - Neural Network Fundamentals.ipynb": "Basic/B05%20-%20Neural%20Network%20Fundamentals.ipynb",
    "B06 - Data Preprocessing and Feature Engineering.ipynb": "Basic/B06%20-%20Data%20Preprocessing%20and%20Feature%20Engineering.ipynb",
    "B07 - Model Evaluation and Performance Metrics.ipynb": "Basic/B07%20-%20Model%20Evaluation%20and%20Performance%20Metrics.ipynb",
    "B09 - Convolutional Neural Networks.ipynb": "Basic/B09%20-%20Convolutional%20Neural%20Networks.ipynb",
    "B10 - Recurrent Neural Networks.ipynb": "Basic/B10%20-%20Recurrent%20Neural%20Networks.ipynb",
    "B11 - Attention and Transformers.ipynb": "Basic/B11%20-%20Attention%20and%20Transformers.ipynb",
    "B12 - Byte Pair Encoding (BPE).ipynb": "Basic/B12%20-%20Byte%20Pair%20Encoding%20(BPE).ipynb",
    "B13 - Building a Mini Language Model.ipynb": "Basic/B13%20-%20Building%20a%20Mini%20Language%20Model.ipynb",
}

base_url = "https://colab.research.google.com/github/nexageapps/AI/blob/main/"

for filename, url_path in notebooks.items():
    filepath = Path("Basic") / filename
    
    if not filepath.exists():
        print(f"⚠️  Skipping {filename} - file not found")
        continue
    
    # Read the notebook
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            notebook = json.load(f)
        
        # Update the first cell (Colab badge)
        if notebook['cells'] and 'source' in notebook['cells'][0]:
            correct_url = base_url + url_path
            new_badge = f'<a href="{correct_url}" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>'
            notebook['cells'][0]['source'] = [new_badge]
            
            # Write back
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(notebook, f, indent=1, ensure_ascii=False)
            
            print(f"✅ Fixed {filename}")
        else:
            print(f"⚠️  Skipping {filename} - no source in first cell")
    except json.JSONDecodeError as e:
        print(f"❌ Error in {filename}: {e}")
        continue

print("\n🎉 All Colab links updated!")
