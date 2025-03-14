"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().min(3)
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string().min(3),
    content: zod_1.default.string().min(10)
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string().min(3).optional(),
    content: zod_1.default.string().min(10).optional(),
    id: zod_1.default.string().uuid()
});
