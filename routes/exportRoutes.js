const express = require('express');
const router = express.Router();
const { readAllExcel, readAllPDF } = require('../utils/functions');

// Route to export data to Excel
router.get('/export/excel', readAllExcel);

// Route to export data to PDF
router.get('/export/pdf', readAllPDF);

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const { readAllExcel} = require('../utils/functions');

// // Route to export data to EXCEL sheet
// router.get('/', readAllExcel);


// module.exports = router;
