"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const errorSource = [
        {
            path: "",
            message: ` ${err === null || err === void 0 ? void 0 : err.errmsg} is already exist`,
        },
    ];
    const statusCode = 500;
    return {
        statusCode,
        message: err === null || err === void 0 ? void 0 : err.message,
        errorSource,
    };
};
exports.default = handleDuplicateError;
