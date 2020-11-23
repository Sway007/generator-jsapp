import Generator from "yeoman-generator";
import { promptAnswer } from "./types";
import { TEMPLATE_DIR } from "./constants";
import fs from "fs";
import chalk from "chalk";

export default class extends Generator {
  answer: promptAnswer;

  constructor(args: any, opts: any) {
    super(args, opts);
    this.option("useLocal", { type: Boolean });
    this.answer = {};
  }

  initializing() {
    // 修改模板文件路径
    this.sourceRoot(TEMPLATE_DIR);
  }

  async prompting() {
    this.answer = await this.prompt([
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
  }

  path() {
    this.log("root path: ", this.destinationRoot());
    this.log("context root: ", this.contextRoot);
    this.log("template path: ", this.sourceRoot());
  }

  install() {
    this.log(chalk.green("Installing ..."));
    this.npmInstall();
  }

  writing() {
    this.log("Project type: ", this.answer.type);
    const tplPath = this.templatePath(this.answer.type || "node");
    if (!fs.existsSync(tplPath)) {
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
