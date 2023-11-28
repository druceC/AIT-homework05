// import express from 'express';
// const app = express();

// to parse json bodies, uncomment the following line:
// app.use(express.json())

// import url from 'url';
// import path from 'path';
// const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// app.use(express.static(path.join(__dirname, 'public')));

// app.listen(3000);
// 

// app.mjs

import express from 'express';
import url from 'url';
import path from 'path';

const app = express();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


// app.post('/submit-form', (req, res) => {
//   // Handle the form submission logic here
//   // You can send a response or redirect as needed
//   res.send('Form submitted successfully!');
//   console.log('Form submitted successfully!');
// });

// app.addEventListener('click',function(evt){
//     console.log('button clicked!');
//     evt.preventDefault();
// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
