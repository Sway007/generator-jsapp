"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_DIR = exports.PROJ_ROOT = void 0;
const path_1 = __importDefault(require("path"));
exports.PROJ_ROOT = path_1.default.dirname(path_1.default.dirname(__dirname));
exports.TEMPLATE_DIR = path_1.default.join(exports.PROJ_ROOT, "templates");
