import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post(
  '/register',
  upload.fields([
    { name: 'referenceImage', maxCount: 1 },
    { name: 'sourceImage', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      if (!req.files || !req.files.referenceImage || !req.files.sourceImage) {
        return res.status(400).json({ error: 'Please upload both reference and source images.' });
      }

      const refFile = req.files.referenceImage[0];
      const srcFile = req.files.sourceImage[0];
      const { referenceSensor, sourceSensor, method } = req.body;

      // LOGGING CHECK: See what arrives in Express terminal
      console.log('--- INCOMING FROM FRONTEND ---');
      console.log('Method:', method);
      console.log('Sensors:', referenceSensor, sourceSensor);

      const formData = new FormData();
      formData.append('reference_file', refFile.buffer, { filename: refFile.originalname });
      formData.append('source_file', srcFile.buffer, { filename: srcFile.originalname });
      formData.append('reference_sensor', referenceSensor || 'LRO NAC');
      formData.append('source_sensor', sourceSensor || 'OHRC');
      formData.append('method', method || 'SIFT');

      const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://127.0.0.1:8000';

      const pyResponse = await axios.post(`${pythonServiceUrl}/register`, formData, {
        headers: { ...formData.getHeaders() },
      });

      return res.status(200).json(pyResponse.data);
    } catch (error) {
      console.error('Registration processing error:', error.response?.data || error.message);
      res.status(500).json({
        error: error.response?.data?.detail || 'Failed to process lunar image registration.'
      });
    }
  }
);

export default router;