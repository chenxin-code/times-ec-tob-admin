const cp = require("child_process");
const util = require("util");
const exec = util.promisify(cp.exec);
const path = require("path");
const shell = require("shelljs");

//返回路径
function resolve(dir) {
  console.log(path.join(__dirname, dir));
  return path.join(__dirname, dir);
}

module.exports = {
  //替换文件的nodej脚本自动化
  async replace(program) {
    try {
      const file = program.file || "package.json";
      const newfile = program.newfile || "rf-package.json";
      // const reCommond = `cp -rf ${resolve(newfile)} ${resolve(file)}`;
      shell.cp('-rf',resolve(newfile), resolve(file));
      // await shell.exec("git pull");
      console.log("配置文件替换");
    } catch (error) {
      console.log("command push---->", error);
    }
  }
};
