import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import sectionRoutes from './src/routes/section.routes.js';
import projectRoutes from './src/routes/project.routes.js';
import messageRoutes from './src/routes/message.routes.js';
import { notFound, errorHandler } from './src/middleware/errorHandler.js';

const app = express();

const origins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

app.use(cors({
    origin: origins.length > 0 ? origins : true,
    credentials: true
}));

app.use(express.json({ limit: '15mb' }));

app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Portfolio API running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
