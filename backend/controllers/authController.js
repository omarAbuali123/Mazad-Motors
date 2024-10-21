
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.register=async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);


    const newPendingUser = new PendingUser({ name, email, password: hashedPassword, phone });
    await newPendingUser.save();

    res.status(201).json({ message: 'تم إرسال طلب التسجيل بنجاح. سيتم مراجعة الحساب.' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء التسجيل.' });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('JWT Sign Error:', err);
        return res.status(500).json({ message: 'Error creating token', error: err.message });
      }
      res.json({ token, userId: user._id }); 
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

















