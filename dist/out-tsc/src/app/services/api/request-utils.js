import { HttpParams } from '@angular/common/http';
export var createRequestOption = function (req) {
    var options = new HttpParams();
    if (req) {
        Object.keys(req).forEach(function (key) {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach(function (val) {
                options = options.append('sort', val);
            });
        }
    }
    return options;
};
//# sourceMappingURL=request-utils.js.map