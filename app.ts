import express from 'express';
import membershipRoutes from './routes/membership';

const app = express();
app.use(express.json());

// API 경로 mount
app.use('/api', membershipRoutes);

app.listen(3000, ()=> console.log('Server running on :3000'));
