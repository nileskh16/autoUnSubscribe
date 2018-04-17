function isFunction(fun) {
    return typeof fun === 'function';
}

export function AutoUnSubscribe({blackList= [], treatAsArray= [], event = 'ngOnDestroy'} = {}) {
    return function(target: Function) {
        const original = target.prototype[event];

        if(!isFunction(original) && !disableAutoAotUnSubscribe()) {
            console.warn(`${target.name} is using @AutoUnSubscribe but has not declared ${event}`);
        }

        target.prototype[event] = function() {
            for (let field in this) {
                const property = this[field];
                blackList.indexOf(field) <= -1 && property && isFunction(property.unsubscribe) && property.unsubscribe();
                blackList.indexOf(field) <= -1 && treatAsArray && property && Array.isArray(property) && property.forEach(function(single) { single && isFunction(single.unsubscribe) && single.unsubscribe() });
            }

            isFunction(original) && original.apply(this, arguments);
        }
    };

    function disableAutoAotUnSubscribe() {
        return window['disableAutoUnsubscribeAot'] || window['disableAuthUnsubscribeAot'];
    }
}