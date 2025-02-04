import { useEffect, useState } from 'react';
var subscriptions = [];
function set(newValue) {
    setTimeout(function () {
        subscriptions.forEach(function (c) { c(newValue); });
    });
}
export function useStreamState() {
    var _a = useState(), stream = _a[0], setStream = _a[1];
    useEffect(function () {
        var index = subscriptions.push(setStream);
        return function () {
            subscriptions.splice(index, 1);
        };
    }, []);
    return [stream, set];
}
