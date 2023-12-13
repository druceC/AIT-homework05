import express from 'express';
import url from 'url';
import path from 'path';

const app = express();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
