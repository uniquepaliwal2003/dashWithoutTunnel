const http = require('http');
const port = process.env.port || 3000;
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res)=>{
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    // Check if the file exists
    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            // File does not exist
            res.statusCode = 404;
            res.end('File not found');
        } else {
            // Serve the file
            fs.createReadStream(filePath).pipe(res);
        }
    });
})
server.listen(port , ()=>{
    console.log(`Server is listening on port ${port}`);
})