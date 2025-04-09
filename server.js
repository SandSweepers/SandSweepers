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

// S3 client setup (Cloudflare R2)
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
    const { title, description, lat, lng, imageBase64, dirtiness, address } = req.body;

    // Validate required fields
    if (!title || !description || !lat || !lng || !address || !dirtiness) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let image_Url = null;
    if (imageBase64) {
      try {
        const buffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const imageName = uuidv4() + '.jpg';

        const uploadParams = {
          Bucket: process.env.R2_BUCKET_NAME,
          Key: imageName,
          Body: buffer,
          ContentType: 'image/jpeg',
          ACL: 'public-read'
        };

        console.log('Attempting to upload to R2:', {
          bucket: process.env.R2_BUCKET_NAME,
          endpoint: process.env.R2_ENDPOINT
        });

        await s3.send(new PutObjectCommand(uploadParams));
        image_Url = `${process.env.R2_PUBLIC_URL}/${imageName}`;
        console.log('Successfully uploaded to R2:', image_Url);
      } catch (uploadError) {
        console.error('Error uploading to R2:', uploadError);
        // Continue without the image if upload fails
      }
    }

    const [result] = await db.execute(
      'INSERT INTO cards (title, description, image_url, lat, lng, dirtiness, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, image_Url, lat, lng, dirtiness, address]
    );

    res.json({ 
      id: result.insertId, 
      title, 
      description, 
      image_Url, 
      lat, 
      lng, 
      dirtiness,
      address,
    });
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

// Add a route to get a single card by ID
app.get('/cards/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM cards WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ error: 'Failed to fetch card', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('R2 Configuration:', {
    bucket: process.env.R2_BUCKET_NAME,
    endpoint: process.env.R2_ENDPOINT
  });
});