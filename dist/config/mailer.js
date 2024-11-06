"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = __importStar(require("nodemailer"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env` });
exports.transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: parseInt(process.env.NODEMAILER_PORT, 10),
    secure: true,
    auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS,
    },
});
exports.transporter.verify().then(() => console.log(`App lista para enviar emails.`));
//# sourceMappingURL=mailer.js.map