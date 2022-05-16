const express = require('express');
const app = express();

app.use('/', require('./razorpay'))
// app.use('/', require('./index'))

// app.get('/', (req, res) => {
//     res.send("Hello");
// });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})