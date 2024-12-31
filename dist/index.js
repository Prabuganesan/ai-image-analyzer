"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyImage = classifyImage;
exports.detectObjects = detectObjects;
const mobilenet = __importStar(require("@tensorflow-models/mobilenet"));
const cocoSsd = __importStar(require("@tensorflow-models/coco-ssd"));
const tf = __importStar(require("@tensorflow/tfjs-node"));
const fs_1 = require("fs");
// Helper function to convert image input (path or buffer) to Tensor3D
const loadImageAsTensor = async (imageInput) => {
    let buffer;
    if (typeof imageInput === 'string') {
        // If input is a path, read the file as a buffer
        buffer = (0, fs_1.readFileSync)(imageInput);
    }
    else {
        // If input is a buffer, use it directly
        buffer = imageInput;
    }
    let tensor = tf.node.decodeImage(buffer, 3); // Decode buffer to RGB Tensor
    // If the tensor is Tensor4D (batch dimension), squeeze to Tensor3D
    if (tensor.rank === 4) {
        tensor = tensor.squeeze(); // Remove batch dimension
    }
    if (tensor.rank !== 3) {
        throw new Error(`Invalid tensor rank: ${tensor.rank}. Expected rank 3.`);
    }
    return tensor; // Ensure the output is Tensor3D
};
// Cache for models
let mobilenetModel = null;
let cocoSsdModel = null;
// Image classification function
async function classifyImage(imageInput) {
    try {
        if (!mobilenetModel) {
            mobilenetModel = await mobilenet.load();
        }
        const tensor = await loadImageAsTensor(imageInput);
        const predictions = await mobilenetModel.classify(tensor);
        tensor.dispose(); // Free memory
        return predictions;
    }
    catch (error) {
        throw new Error(`Failed to classify image: ${error.message || error}`);
    }
}
// Object detection function
async function detectObjects(imageInput) {
    try {
        if (!cocoSsdModel) {
            cocoSsdModel = await cocoSsd.load();
        }
        const tensor = await loadImageAsTensor(imageInput);
        const predictions = await cocoSsdModel.detect(tensor);
        tensor.dispose(); // Free memory
        return predictions;
    }
    catch (error) {
        throw new Error(`Failed to detect objects: ${error.message || error}`);
    }
}
