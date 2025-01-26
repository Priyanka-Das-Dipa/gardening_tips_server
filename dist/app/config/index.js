"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    bcrypt_saltround: process.env.BCRYPT_SALTROUND,
    node_env: process.env.NODE_ENV,
    access_token_secret: process.env.JWT_Access_Token_Secret,
    jwt_access_expire: process.env.JWT_ACCESS_EXPIRE_IN,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    client_site_url: process.env.CLIENT_SITE_URL
};
