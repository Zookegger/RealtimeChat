import { Router } from 'express';
// import userRoutes from './user.js';
// import messageRoutes from './message.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        status: 'active',
        timestamp: new Date().toISOString(),
        endpoints: {
            users: '/api/users',
            messages: '/api/messages'
        }
    })
});

// // User routes
// router.use('/users', userRoutes);

// // Message routes
// router.use('/messages', messageRoutes);

export default router;