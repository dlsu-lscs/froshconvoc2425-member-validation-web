import { __awaiter, __generator } from "tslib";
import { useState, useMemo, useEffect } from 'react';
import { useStreamState } from './use-stream-state';
export function useTorch(open) {
    var _this = this;
    if (open === void 0) { open = false; }
    var _a = useState(open), isOpen = _a[0], setOpen = _a[1];
    var _b = useState(false), isSupportTorch = _b[0], setSupport = _b[1];
    var stream = useStreamState()[0];
    var track = useMemo(function () {
        return stream === null || stream === void 0 ? void 0 : stream.getVideoTracks()[0];
    }, [stream]);
    useEffect(function () {
        if (track == null)
            return;
        var capabilities = track.getCapabilities();
        if (capabilities.torch !== undefined) {
            setSupport(true);
        }
    }, [track]);
    var switchTorch = function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!isSupportTorch) {
                        throw new Error("[react-barcode-scanner]: \n          device does not support torch capability\n        ");
                    }
                    return [4, track.applyConstraints({
                            advanced: [{
                                    torch: !isOpen
                                }]
                        })];
                case 1:
                    _a.sent();
                    setOpen(!isOpen);
                    return [3, 3];
                case 2:
                    e_1 = _a.sent();
                    console.warn(e_1);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); };
    return [isSupportTorch, isOpen, switchTorch];
}
