


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const PendingUser = require('../models/PendingUser');
const User = require('../models/User');



router.get('/pending-users/:id', async (req, res) => {
  try {
    const user = await PendingUser.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});






router.get('/pending-users', async (req, res) => {
    try {
      const users = await PendingUser.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  });



router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  });


router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

router.post('/api/users', async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
    
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ name, email, phone, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
});





  router.delete('/pending-users/:id', async (req, res) => {
    try {
      const { id } = req.params; 
      const result = await PendingUser.deleteOne({ _id: id }); 
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' }); 
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  });

module.exports = router;
