import { Router } from 'express';
import apiRoutes from './api/index.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        status: 'active',
        timestamp: new Date().toISOString(),
        endpoints: {
            apis: '/api',
        }
    })
});

const formatUptime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
};

const formatMemoryUsage = (usage) => {
    const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(2) + 'MB';
    return Object.fromEntries(
        Object.entries(usage).map(([key, value]) => [key, toMB(value)])
    )
}

router.get('/health', (req, res) => {
    res.json({
        status: 'active',
        timestamp: new Date().toISOString(),
        memoryUsage: formatMemoryUsage(process.memoryUsage()),
        runtime: formatUptime(process.uptime())
    });
});

// API routes
router.use('/api', apiRoutes);


export default router;