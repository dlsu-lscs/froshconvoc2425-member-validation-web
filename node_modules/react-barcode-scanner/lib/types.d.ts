export interface Point {
    x: number;
    y: number;
}
export interface DetectedBarcode {
    boundingBox: DOMRectReadOnly;
    cornerPoints: Point[];
    format: string;
    rawValue: string;
}
declare global {
    class BarcodeDetector {
        constructor(options?: {
            formats: string[];
        });
        static getSupportedFormats(): Promise<string[]>;
        detect(target: ImageBitmapSource): Promise<DetectedBarcode[]>;
    }
}
