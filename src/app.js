const express = require('express');
const emailController = require('./controllers/emailController');


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.post('/rec-email', emailController.sendEmail);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});


