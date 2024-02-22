"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    successResponseWithoutData(res, message, code) {
        const response = {
            data: null,
            meta: {
                code,
                message,
            },
        };
        return res.send(response);
    },
    errorResponseWithoutData(res, message, code = 0) {
        const response = {
            data: null,
            meta: {
                code,
                message,
            },
        };
        return res.send(response);
    },
};
