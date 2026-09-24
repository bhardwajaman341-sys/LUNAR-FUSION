import express from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const router = express.Router();
const otpStore = new Map(); // Store temporary OTPs in memory

// Configure SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route: Send OTP
router.post('/send-email-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  try {
    await transporter.sendMail({
      from: '"SENTINEL Laboratory" <no-reply@sentinel.gov>',
      to: email,
      subject: 'SENTINEL Authentication Access Code',
      text: `Your SENTINEL verification OTP code is: ${otp}`
    });
    res.json({ message: 'OTP transmitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to deliver OTP.' });
  }
});

// Route: Verify OTP
router.post('/verify-email-otp', (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);

  if (!stored || stored.otp !== otp || Date.now() > stored.expiresAt) {
    return res.status(400).json({ error: 'Invalid or expired OTP.' });
  }

  otpStore.delete(email);
  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'SENTINEL_SECRET', { expiresIn: '24h' });
  res.json({ token, user: { email } });
});

export default router;