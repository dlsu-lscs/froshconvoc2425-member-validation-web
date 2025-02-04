import { __assign, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { useCamera, useScanning } from '../hooks';
var BarcodeScanner = function (_a) {
    var options = _a.options, onCapture = _a.onCapture, trackConstraints = _a.trackConstraints, props = __rest(_a, ["options", "onCapture", "trackConstraints"]);
    var instance = useRef(null);
    var isCameraSupport = useCamera(instance, trackConstraints)[0];
    var _b = useScanning(instance, options), detected = _b[0], open = _b[1], close = _b[2];
    useEffect(function () {
        if (isCameraSupport) {
            open();
        }
        else {
            close();
        }
    }, [close, isCameraSupport, open]);
    useEffect(function () {
        if (detected !== undefined) {
            onCapture === null || onCapture === void 0 ? void 0 : onCapture(detected);
        }
    }, [detected, onCapture]);
    return (_jsx("video", __assign({ ref: instance, style: { width: '100%', height: '100%', objectFit: 'cover' }, autoPlay: true, muted: true, playsInline: true }, props)));
};
export default BarcodeScanner;
