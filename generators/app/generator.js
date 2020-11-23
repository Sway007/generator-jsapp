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
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const constants_1 = require("./constants");
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
class default_1 extends yeoman_generator_1.default {
    constructor(args, opts) {
        super(args, opts);
        this.option("useLocal", { type: Boolean });
        this.answer = {};
    }
    initializing() {
        // 修改模板文件路径
        this.sourceRoot(constants_1.TEMPLATE_DIR);
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            this.answer = yield this.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Project name: ",
                    default: this.appname,
                },
                {
                    type: "list",
                    name: "type",
                    message: "Select project type: ",
                    choices: ["node-ts", "react", "vue"],
                },
            ]);
        });
    }
    path() {
        this.log("root path: ", this.destinationRoot());
        this.log("context root: ", this.contextRoot);
        this.log("template path: ", this.sourceRoot());
    }
    install() {
        // if (this.options.useLocal) return;
        this.log(chalk_1.default.green("Installing ..."));
        this.npmInstall();
    }
    writing() {
        this.log("Project type: ", this.answer.type);
        const tplPath = this.templatePath(this.answer.type || "node");
        if (!fs_1.default.existsSync(tplPath)) {
            this.log(tplPath);
            throw Error(`no template for ${this.answer.type}`);
        }
        this.fs.copy(tplPath + "/**/*", this.destinationPath(), {
            globOptions: {
                ignore: this.options.useLocal
                    ? []
                    : ["**/dist", "**/node_modules", "**/package-lock.json"],
            },
        });
    }
}
exports.default = default_1;
