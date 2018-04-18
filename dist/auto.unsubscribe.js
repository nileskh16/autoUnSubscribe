function isFunction(fun) {
    return typeof fun === 'function';
}
export function AutoUnSubscribe(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.blackList, blackList = _c === void 0 ? [] : _c, _d = _b.treatAsArray, treatAsArray = _d === void 0 ? [] : _d, _e = _b.event, event = _e === void 0 ? 'ngOnDestroy' : _e;
    return function (target) {
        var original = target.prototype[event];
        if (!isFunction(original) && !disableAutoAotUnSubscribe()) {
            console.warn(target.name + " is using @AutoUnSubscribe but has not declared " + event);
        }
        target.prototype[event] = function () {
            for (var field in this) {
                var property = this[field];
                blackList.indexOf(field) <= -1 && property && isFunction(property.unsubscribe) && property.unsubscribe();
                blackList.indexOf(field) <= -1 && treatAsArray && property && Array.isArray(property) && property.forEach(function (single) { single && isFunction(single.unsubscribe) && single.unsubscribe(); });
            }
            isFunction(original) && original.apply(this, arguments);
        };
    };
    function disableAutoAotUnSubscribe() {
        return window['disableAutoUnsubscribeAot'] || window['disableAuthUnsubscribeAot'];
    }
}
