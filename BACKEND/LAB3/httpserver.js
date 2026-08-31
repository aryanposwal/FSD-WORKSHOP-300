import http from "http";

const userdata = [{
    id: 101,
    name: "Abc",
    email: "cm@abes.call.in"
}];

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/msg" && method === "GET") {
        res.setHeader("Content-Type", "text/plain");
        res.statusCode = 200;
        res.end("This is welcome message from server");
    }
    else if (url === "/sys" && method === "GET") {
        res.setHeader("Content-Type", "text/plain");
        res.statusCode = 200;
        res.end("This is system information");
    }
    else if (url === "/data" && method === "GET") {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(userdata)); 
    }
    else {
        res.setHeader("Content-Type", "text/plain");
        res.statusCode = 404;
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server is running on port number 3000");
});