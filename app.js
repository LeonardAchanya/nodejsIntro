// console.log("Marks is a boy");
const fs = require("fs");
const http = require("http");

// fs.writeFileSync("hello.txt", "Hello World");

// fs.writeFile("hello.txt", country, (err) => {
//     if(!err) {
//         console.log("Done Writing");
//         res.setHeader("Location", "/");
//         res.statusCode = 302;
//         res.end();
//     }
// })

const server = http.createServer((req, res) => {
    // console.log(req);
    const url = req.url;
    const method = req.method;
    // console.log(url, method);
    if (url === "/") {
        res.write(`
            <html>
            <head>
                <title>Node Home</title>
            </head>
            <body>
                <h1>Welcome</h1>
                <form method="POST" action="/create">
                    <label for="country">Your Country</label>
                    <input type="text" id="country" name="country">
                    <input type="submit" value="Send" />
                </form>
            </body>
            </html>
        `);
        res.end();
    }
    if (url === "/create" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        })
        req.on("end", () => {
            let parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            let country = parsedBody.split("=")[1];
            // console.log(country);
            fs.writeFile("hello.txt", country, (err) => {
                if (!err) {
                    console.log("Done Writing");
                    res.setHeader("Location", "/profile");
                    res.statusCode = 302;
                    res.end();
                }
            })
        })
    }

    if (url === "/profile") {
        fs.readFile('hello.txt', (err, data) => {
            if(!err){
                let input = [data];
                const newInput = Buffer.concat(input).toString();
                // console.log(newInput);
                res.write(`
            <html>
            <head>
                <title>Node Home</title>
            </head>
            <body>
                <h1>${newInput}</h1>
            </body>
            </html>
        `);
        res.end();
            }
          });
          
    }
    
})

server.listen(3000, () => console.log("Listening on port 3000"));
