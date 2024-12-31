import * as mobilenet from '@tensorflow-models/mobilenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs-node';
import { readFileSync } from 'fs';

// Helper function to convert image input (path or buffer) to Tensor3D
const loadImageAsTensor = async (imageInput: string | Buffer): Promise<tf.Tensor3D> => {
    let buffer: Buffer;

    if (typeof imageInput === 'string') {
        // If input is a path, read the file as a buffer
        buffer = readFileSync(imageInput);
    } else {
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

    return tensor as tf.Tensor3D; // Ensure the output is Tensor3D
};

// Cache for models
let mobilenetModel: mobilenet.MobileNet | null = null;
let cocoSsdModel: cocoSsd.ObjectDetection | null = null;

// Image classification function
export async function classifyImage(imageInput: string | Buffer): Promise<any[]> {
    try {
        if (!mobilenetModel) {
            mobilenetModel = await mobilenet.load();
        }

        const tensor = await loadImageAsTensor(imageInput);
        const predictions = await mobilenetModel.classify(tensor);

        tensor.dispose(); // Free memory
        return predictions;
    } catch (error: any) {
        throw new Error(`Failed to classify image: ${error.message || error}`);
    }
}

// Object detection function
export async function detectObjects(imageInput: string | Buffer): Promise<any[]> {
    try {
        if (!cocoSsdModel) {
            cocoSsdModel = await cocoSsd.load();
        }

        const tensor = await loadImageAsTensor(imageInput);
        const predictions = await cocoSsdModel.detect(tensor);

        tensor.dispose(); // Free memory
        return predictions;
    } catch (error: any) {
        throw new Error(`Failed to detect objects: ${error.message || error}`);
    }
}
