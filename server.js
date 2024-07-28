const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const currencyRoutes = require('./routes/currencyRoutes'); //
const countryRoutes = require('./routes/countryRoutes'); //
const projectRoutes = require('./routes/projectRoutes');
const itemGroupRoutes = require('./routes/itemGroupRoutes');
const transportRoutes = require('./routes/transportTypeRoutes'); 
const exportRoutes = require('./routes/exportRoutes');

require('dotenv').config();


const app = express();
connectDB();

app.use(express.json()); 
app.use(cookieParser()); // To parse cookies

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// ROUTES FOR: 
// ::::Registering Admins by super admin and Signing in of both categories::::
app.use('/api/auth', authRoutes); // sigining in 
app.use('/api/profiles', profileRoutes); // adding profiles by admin
// ::::MASTER DATA::::
app.use('/api/currencies', currencyRoutes); // currency and its code.  
app.use('/api/countries', countryRoutes); // country and its code.
app.use('/api/projects', projectRoutes); // projects undertaken 
app.use('/api/itemGroups', itemGroupRoutes); // group of items
app.use('/api/transportTypes', transportRoutes); // types of transports i.e. bus, truck, ship, etc. 
// ::::exporting tables as PDF or Excel::::
app.use('/api/', exportRoutes);



//port...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
