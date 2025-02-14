"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
const verifyJWT_1 = require("../utils/verifyJWT");
const config_1 = __importDefault(require("../config"));
const user_modal_1 = require("../modules/User/user.modal");
const authGaurd = (...requiredRoles) => {
    return (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // console.log(token);
        // check if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Your are not authorized");
        }
        const bearer = token.split(" ");
        // console.log(bearer[1]);
        const decoded = (0, verifyJWT_1.verifyToken)(bearer[1], config_1.default.access_token_secret);
        const { role, email } = decoded;
        // check if the use is exist
        const user = yield user_modal_1.User.isUserExistsByEmail(email);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Your are not eligible for this operation");
        }
        // checking
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Your are not authorized");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = authGaurd;
