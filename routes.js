const fs = require("fs");
const handleRequest = (request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<body>");
    response.write("<h1>Hello World</h1>");
    response.write("</body>");
    response.write("</html>");
    return response.end();
  }
  if (url === "/submit" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    request.on("end", () => {
      const parsebody = Buffer.concat(body).toString();
      const message = parsebody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      response.statusCode = 302;
      response.setHeader("Location", "/");
      return response.end();
    });
    return;
  }
  response.setHeader("Content-Type", "text/html");
  response.write("<html>");
  response.write("<body>");
  response.write("<form method='post' action='/submit'>");

  response.write("<label for='name'>Name:</label><br>");
  response.write("<input type='text' id='name' name='name'><br><br>");

  response.write("<input type='submit' value='Submit'>");

  response.write("</form>");

  response.write("</body>");
  response.write("</html>");

  console.log(request.url, request.method, request.headers);
  return response.end();
};
module.exports = handleRequest;
