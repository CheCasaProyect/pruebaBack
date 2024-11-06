"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
exports.CloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        });
    },
};
//# sourceMappingURL=cloudinary.js.map