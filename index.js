const http = require('node:http');
const fs = require('fs').promises;

const host = 'localhost';
const port = 8080;
const ReqUrls = ["/index.html", "/about.html", "/contact-me.html",
                "/404.html"];
const pageContents = {
    index: "",
    about: "",
    contact: "",
    errorPage: ""
    };

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    switch (req.url) {
        case "/":
            res.writeHead(200);
            res.end(pageContents.index);
            break;
        case "/about":
            res.writeHead(200);
            res.end(pageContents.about);
            break;
        case "/contact-me":
            res.writeHead(200);
            res.end(pageContents.contact);
            break;
        default:
            res.writeHead(404);
            res.end(pageContents.errorPage);
    }
};

const server = http.createServer(requestListener);

async function readFiles(ReqUrls, host, port) {

    try {
        pageContents.index = await fs.readFile(__dirname + ReqUrls[0]);
        pageContents.about = await fs.readFile(__dirname + ReqUrls[1]);
        pageContents.contact = await fs.readFile(__dirname + ReqUrls[2]);
        pageContents.errorPage = await fs.readFile(__dirname + ReqUrls[3]);
    }
    catch (err) {
        console.error(`Could not read ${ReqUrls[i]} file: ${err}`);
        process.exit(1);
    }

    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
}

readFiles(ReqUrls, host, port)



