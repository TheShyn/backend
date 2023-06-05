import express from 'express';
import uploadCloud from '../middleware/upload';

const router = express.Router();
router.post('/cloudinary-upload', uploadCloud.array('files'), (req, res, next) => {
    if (!req.files) {
        next(new Error('No file uploaded!'));
        return;
    }

    const secureUrls = req.files.map(file => file.path);
    res.json({ secure_urls: secureUrls });
});
export default router;