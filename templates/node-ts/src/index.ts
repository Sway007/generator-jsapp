import net from "net";

const server = net.createServer((socket: net.Socket) => {
  console.log("new connection!");
  socket.setEncoding("utf-8");
  socket.on("close", (e) => {
    console.log("connection closed!");
  });

  socket.on("data", (data) => {
    console.log(`received data: ${data}`);
    socket.write(`you said: ${data}`);
  });
});

server.on("error", (e: any) => {
  if (e.code === "EADDRINUSE") {
    console.log("Address in use, retrying...");
    console.log(e.address);
    server.close();
  }
});

server.on("close", () => {
  console.log("server closed!");
});

const adOptions: net.ListenOptions = {};
// adOptions.host = "0.0.0.0";
// adOptions.port = 9009;
adOptions.path = "/tmp/echo.sock";
server.listen(adOptions, () => {
  console.log("server listening ...");
});
