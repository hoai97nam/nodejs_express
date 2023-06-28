import express, { Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';

const app = express();
const port = 3000;

// Define routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/image', (req: Request, res: Response) => {

    const imagePath = path.join(__dirname, `../${req.query.name ? req.query.name : 'camel'}.png`);

    if (req.hasOwnProperty('width') && req.hasOwnProperty('height')) {
        const outputImage = path.join(__dirname, `../changes/${req.query.name}-resized.png`);

        const width = Number(req.query.width);
        const height = Number(req.query.height);

        sharp(imagePath).resize(width, height).toFile(outputImage)
            .then(() => {
                console.log('Image resized successfully');
                res.sendFile(outputImage);
            })
    } else {
        res.sendFile(imagePath);
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


