
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const carListingRoutes = require('./routes/carListingRoutes');
const carListingRoutes2 = require('./routes/pendingCarListingRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bidRoutes = require('./routes/bidRoutes');
const User = require('./models/User');
const Admin = require('./models/Admin');
const Bid = require('./models/Bid');
const loginController = require('./controllers/adminController');
const pendingCarListingRoutes = require('./routes/pendingCarListingRoutes');
const http = require('http');
const adminRoutes = require('./routes/adminRoutes');
const pendingUserRoutes = require('./routes/pendingUserRoutes');
const socketIo = require('socket.io');
const PendingUser = require('./models/pendingcarlistings');
const pendingCars = require('./models/pendingcarlistings');
const Cars = require('./models/CarListing');

const carSchema = new mongoose.Schema({
    category: { type: String, required: true },
});
const Car = mongoose.model('Car', carSchema);
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connectDB();
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api/car-listings', carListingRoutes2);
app.use('/api/pending-cars', carListingRoutes2);
app.use('/api/admin', adminRoutes);
app.use('/api/bids', bidRoutes(io)); 
app.use('/api', authRoutes);
app.use('/api/users', authRoutes);
app.post('/api/auth/login', loginController.login);
app.use('/api/pending-cars', pendingCarListingRoutes);
app.use('/api', pendingCarListingRoutes);
app.get('/api/users', async (req, res) => {
    const email = req.query.email;
    const userId = req.query.id;
    try {
        let user;
        if (userId) {
            user = await User.findById(userId);
        } else if (email) {
            user = await User.findOne({ email: email });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
});











app.get('/api/admin/login', async (req, res) => {
    const email = req.query.email;
    const adminId = req.query.id;
    console.log("email = ",email)
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json(admin);
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({ message: 'Error fetching admin' });
    }
});





app.get('/api/bids/:carId', async (req, res) => {
    const { carId } = req.params;

    try {
        const bids = await Bid.find({ carId }).populate('userId', 'username');
        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/bids', async (req, res) => {
    const { carId } = req.query;

    try {
        const bids = await Bid.find({ carId }).populate('userId', 'username');
        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get('/api/car-listings/category/suv', async (req, res) => {
    const category = 'suv';
    try {
        const cars = await Car.find({ category: category });
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'خطأ في الخادم' });
    }
});

app.get('/api/car-listings/category/sedan', async (req, res) => {
    const category = 'sedan';
    try {
        const cars = await Car.find({ category: category });
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'خطأ في الخادم' });
    }
});



app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});










app.post('/api/car-listings', async (req, res) => {
    const { brand, model, year, mileage, condition, category, images, userId, isApproved, startingBidPrice, auctionStartTime, auctionEndTime } = req.body;


    if (!brand || !model || !year || !mileage || !condition || !category || !userId) {
        return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة.' });
    }

    try {
        const newCarListing = new Cars(req.body);
        await newCarListing.save();
        res.status(201).json(newCarListing);
    } catch (error) {
        console.error('Error adding car listing:', error);
        res.status(500).json({ message: 'خطأ في إدراج السيارة', error: error.message });
    }
});
app.post('/api/pending-cars', async (req, res) => {
    const { brand, model, year, mileage, condition, category, images, userId, isApproved, startingBidPrice, auctionStartTime, auctionEndTime } = req.body;


    if (!brand || !model || !year || !mileage || !condition || !category || !userId) {
        return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة.' });
    }

    try {
        const newCarListing = new pendingCars(req.body);
        await newCarListing.save();
        res.status(201).json(newCarListing);
    } catch (error) {
        console.error('Error adding car listing:', error);
        res.status(500).json({ message: 'خطأ في إدراج السيارة', error: error.message });
    }
});



app.delete('/api/pending-cars/:id', async (req, res) => {
    const { id } = req.params; 
    console.log(`Attempting to delete car with ID: ${id}`);
    
    try {
        const car = await PendingUser.findById(id);
        
        if (!car) {
            console.log('Car not found');
            return res.status(404).json({ message: 'لم يتم العثور على العنصر الذي تحاول حذفه.' });
        }

        const result = await PendingUser.findByIdAndDelete(id);
        res.status(200).json({ message: 'تم حذف العنصر بنجاح.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء حذف العنصر.' });
    }
});
















app.delete('/api/car-listings/:carId' ,async (req, res) => {
    const carId = req.params.carId; 
    try {
      const result = await Cars.findByIdAndDelete(carId); 
  
      if (!result) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting car', error: error.message });
    }
  });
  





  app.delete('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  });
  





  app.put('/api/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).send('User not found');
      }
      res.send(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Server error');
    }
  });





app.put('/car-listings/:id', async (req, res) => {
    try {
      const car = await Cars.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!car) return res.status(404).send('Car not found');
      res.send(car);
    } catch (err) {
      res.status(500).send('Error updating car');
    }
  });
  








app.get('/api/car-listings', async (req, res) => {
    const { id } = req.query;
    try {
        if (email) {
            const car = await Cars.find({ id });
            return car.json(users); 
        }
    
        const cars = await Cars.find();
        res.json(cars);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/users', async (req, res) => {
    const { email } = req.query;
    try {
        if (email) {
            const users = await User.find({ email });
            return res.json(users);
        }

        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server error');
    }
});






  

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});