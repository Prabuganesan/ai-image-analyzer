const { classifyImage, detectObjects } = require('./dist');

// import { readFileSync } from 'fs';
const readFileSync = require('fs').readFileSync;
const path = require('path');
const imagePath = path.join(__dirname, 'test.jpg');
const imageBuffer = readFileSync(imagePath);

console.log('Image Path:', imagePath);

// Test classifyImage function
async function testClassifyImageByPath() {
    try {
        console.log('Testing image classification...');
        const predictions = await classifyImage(imagePath);
        console.log('Classify Image Results:', predictions);
    } catch (error) {
        console.error('Error in image classification:', error);
    }
}

async function testClassifyImageByBuffer() {
  try {
      console.log('Testing image classification...');
      const predictions = await classifyImage(imageBuffer);
      console.log('Classify Image Results:', predictions);
  } catch (error) {
      console.error('Error in image classification:', error);
  }
}

// Test detectObjects function
async function testDetectObjectsByPath() {
    try {
        console.log('Testing object detection...');
        const objects = await detectObjects(imagePath);
        console.log('Object Detection Results:', objects);
    } catch (error) {
        console.error('Error in object detection:', error);
    }
}
async function testDetectObjectsByBuffer() {
  try {
      console.log('Testing object detection...');
      const objects = await detectObjects(imageBuffer);
      console.log('Object Detection Results:', objects);
  } catch (error) {
      console.error('Error in object detection:', error);
  }
}

// Run tests
testClassifyImageByPath();
testClassifyImageByBuffer();
testDetectObjectsByPath();
testDetectObjectsByBuffer();
