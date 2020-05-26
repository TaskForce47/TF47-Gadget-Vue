// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: true,
    https: {
      key: fs.readFileSync("./certs/taskforce47.com+4-key.pem"),
      cert: fs.readFileSync("./certs/taskforce47.com+4.pem")
    },
    public: "https://gadget.taskforce47.com:8080"
  }
};
