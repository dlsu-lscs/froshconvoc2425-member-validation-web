"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var hooks_1 = require("../hooks");
var BarcodeScanner = function (_a) {
    var options = _a.options, onCapture = _a.onCapture, trackConstraints = _a.trackConstraints, props = tslib_1.__rest(_a, ["options", "onCapture", "trackConstraints"]);
    var instance = (0, react_1.useRef)(null);
    var isCameraSupport = (0, hooks_1.useCamera)(instance, trackConstraints)[0];
    var _b = (0, hooks_1.useScanning)(instance, options), detected = _b[0], open = _b[1], close = _b[2];
    (0, react_1.useEffect)(function () {
        if (isCameraSupport) {
            open();
        }
        else {
            close();
        }
    }, [close, isCameraSupport, open]);
    (0, react_1.useEffect)(function () {
        if (detected !== undefined) {
            onCapture === null || onCapture === void 0 ? void 0 : onCapture(detected);
        }
    }, [detected, onCapture]);
    return ((0, jsx_runtime_1.jsx)("video", tslib_1.__assign({ ref: instance, style: { width: '100%', height: '100%', objectFit: 'cover' }, autoPlay: true, muted: true, playsInline: true }, props)));
};
exports.default = BarcodeScanner;
