import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// DB setup
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// S3 client setup that dosent work. but fuck that for now we implement that as one of the last parts (Cloudflare R2) 
const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});

app.post('/cards', async (req, res) => {
  try {
    const { title, description, lat, lng, imageBase64 } = req.body;

    let imageUrl = null;
    if (imageBase64) {
      try {
        const buffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const imageName = uuidv4() + '.jpg';

        const uploadParams = {
          Bucket: process.env.R2_BUCKET_NAME,
          Key: imageName,
          Body: buffer,
          ContentType: 'image/jpeg', // Maybe we should add more types but i currently dont know if cloudflare r2 can support it 
          ACL: 'public-read'
        };

        console.log('Attempting to upload to R2:', {
          bucket: process.env.R2_BUCKET_NAME,
          endpoint: process.env.R2_ENDPOINT
        });

        await s3.send(new PutObjectCommand(uploadParams));
        imageUrl = `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}/${imageName}`;
        console.log('Successfully uploaded to R2:', imageUrl);
      } catch (uploadError) {
        console.error('Error uploading to R2:', uploadError);
        // Continue without the image if upload fails (it does for now)
      }
    }

    const [result] = await db.execute(
      'INSERT INTO cards (title, description, image_url, lat, lng) VALUES (?, ?, ?, ?, ?)',
      [title, description, imageUrl, lat, lng]
    );

    res.json({ id: result.insertId, title, description, imageUrl, lat, lng });
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card', details: error.message });
  }
});

app.get('/cards', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM cards');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Failed to fetch cards', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('R2 Configuration:', {
    bucket: process.env.R2_BUCKET_NAME,
    endpoint: process.env.R2_ENDPOINT
  });
}); 