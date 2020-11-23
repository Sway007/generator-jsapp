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
        name: "appName",
        message: "App name: ",
        default: "js-app",
      },
      {
        type: "list",
        name: "type",
        message: "Select project type: ",
        choices: ["node-ts", "react", "vue"],
      },
    ]);
  }

  async paths() {
    const app = this.answer.appName || "js-app";
    if (fs.existsSync(app)) {
      this.log(chalk.bgRedBright(`Directory ${app} has already exist!`));
      process.exit(1);
    }
    const d = this.destinationPath(app);
    this.log("change dir to ", d);
    await fs.promises.mkdir(d).then(() => {
      this.destinationRoot(d);
    });
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
