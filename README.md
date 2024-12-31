# ai-image-analyzer

`ai-image-analyzer` is a powerful Node.js library that leverages TensorFlow.js to classify images and detect objects using pre-trained models like MobileNet and COCO-SSD. It supports input as either a file path or an image buffer for enhanced flexibility.

## Features

- **Image Classification**: Classify images using the MobileNet model.
- **Object Detection**: Detect objects in images using the COCO-SSD model.
- **Flexible Input**: Accepts file paths or raw image buffers as input.

## ❤️ Support My Work!
Maintaining this package requires effort and dedication. If this project helped you, consider buying me a coffee or supporting me via PayPal. Every donation helps keep this project alive!  

[![Support via PayPal](https://img.shields.io/badge/Support-PayPal.me-blue?style=for-the-badge&logo=paypal)](https://paypal.me/prabuganesan)


## Installation

```
npm install ai-image-analyzer
```

## Usage
Import the Library
```
import { classifyImage, detectObjects } from 'ai-image-analyzer';
```

## Image Classification
```
const predictions = await classifyImage('/path/to/image.jpg');
// OR
import { readFileSync } from 'fs';
const imageBuffer = readFileSync('/path/to/image.jpg');
const predictions = await classifyImage(imageBuffer);

console.log('Predictions:', predictions);
```
## Object Detection
```
const detections = await detectObjects('/path/to/image.jpg');
// OR
const imageBuffer = readFileSync('/path/to/image.jpg');
const detections = await detectObjects(imageBuffer);

console.log('Detections:', detections);
```

## Output Format
**Image Classification**
The classifyImage function returns an array of predictions:
```
[
  {
    "className": "object name",
    "probability": 0.95
  },
  {
    "className": "another object name",
    "probability": 0.85
  }
]
```

**Object Detection**
The detectObjects function returns an array of detections:
```
[
  {
    "bbox": [x, y, width, height],
    "class": "object name",
    "score": 0.9
  },
  {
    "bbox": [x, y, width, height],
    "class": "another object name",
    "score": 0.8
  }
]
```

## Requirements
* Node.js 16 or later
* TensorFlow.js dependencies (@tensorflow/tfjs-node, @tensorflow-models/mobilenet, @tensorflow-models/coco-ssd)

## API Reference
```
classifyImage(imageInput: string | Buffer): Promise<any[]>
```
Classifies the input image and returns an array of predictions.

* imageInput: Path to the image file or an image buffer.
* Returns: Array of predictions with class names and probabilities.

```
detectObjects(imageInput: string | Buffer): Promise<any[]>
```
Detects objects in the input image and returns an array of detections.

* imageInput: Path to the image file or an image buffer.
* Returns: Array of detections with bounding boxes, class names, and scores.


**License**

This project is licensed under the MIT License. See the LICENSE file for details.
