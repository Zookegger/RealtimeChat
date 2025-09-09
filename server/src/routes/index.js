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

// API routes
router.use('/api', apiRoutes);

export default router;