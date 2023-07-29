"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ErrorInterceptor = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(auth, _snackBar) {
        this.auth = auth;
        this._snackBar = _snackBar;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(operators_1.catchError(function (err) {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                _this.auth.logout();
                location.reload();
            }
            else if (err.status === 409 || err.status === 401) {
                console.log('QWFEGSWQERWQEFSGWEQ', err.error.message)
                 let masg = err.error.message || 'sdfghjhgfdsdfghj'
                _this._snackBar.open(masg, " ", {
                    duration: 3000,
                    verticalPosition: "top",
                    horizontalPosition: "end",
                    panelClass: ["red-snackbar"]
                });
            }
            var error = err.error.message || err.statusText;
            return rxjs_1.throwError(error);
        }));
    };
    ErrorInterceptor = __decorate([
        core_1.Injectable()
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());
exports.ErrorInterceptor = ErrorInterceptor;
