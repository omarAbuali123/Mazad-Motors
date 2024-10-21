

const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();






exports.createAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();


    return res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};





exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      console.log("Request received with email:", email);
      console.log("Request received with password:", password);

      const admin = await Admin.findOne({ email });
      if (!admin) {
          return res.status(400).json({ message: 'Admin not found' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      res.json({ message: 'Login successful', userId: admin._id });
  } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Server error' });
  }
};
