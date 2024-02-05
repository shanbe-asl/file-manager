import fs from 'fs';
import zlib from 'zlib';

function compress(source, destination) {
    const sourceStream = fs.createReadStream(source);
    const destinationStream = fs.createWriteStream(destination);
    const brotliStream = zlib.createBrotliCompress();

    sourceStream.pipe(brotliStream).pipe(destinationStream);

    destinationStream.on('finish', () => {
        console.log(`Compressed file saved to ${destination}`);
    });

    destinationStream.on('error', (error) => {
        console.error(`Error during compression: ${error.message}`);
    });
}

function decompress(source, destination) {
    const sourceStream = fs.createReadStream(source);
    const destinationStream = fs.createWriteStream(destination);
    const brotliStream = zlib.createBrotliDecompress();

    sourceStream.pipe(brotliStream).pipe(destinationStream);

    destinationStream.on('finish', () => {
        console.log(`Decompressed file saved to ${destination}`);
    });

    destinationStream.on('error', (error) => {
        console.error(`Error during decompression: ${error.message}`);
    });
}

export { compress, decompress };