import fs from 'fs';
import crypto from 'crypto';

function hash(pathToFile) {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(pathToFile);
    
    stream.on('data', (chunk) => {
        hash.update(chunk);
    });

    stream.on('end', () => {
        const fHash = hash.digest('hex');
        console.log(`'${pathToFile}' hash: ${fHash}`);
    });

    stream.on('error', (error) => {
        console.error(`Operation failed: ${error.message}`);
    });
}

export{hash};