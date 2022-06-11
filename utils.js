const fs = require('fs');


function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        console.log(err);
    });
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        body = '';
        try {
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                resolve(body);
            });
        } catch (err) {
            resolve(err);
        }

    });
}


module.exports = {
    writeDataToFile,
    getPostData
}