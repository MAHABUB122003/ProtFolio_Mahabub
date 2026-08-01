import { Router } from 'express';
import {
    createMessage,
    getMessages,
    getMessageById,
    markMessageRead,
    deleteMessage
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/', createMessage);
router.get('/', protect, getMessages);
router.get('/:id', protect, getMessageById);
router.patch('/:id/read', protect, markMessageRead);
router.delete('/:id', protect, deleteMessage);

export default router;
