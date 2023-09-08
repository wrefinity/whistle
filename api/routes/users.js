import { Router } from 'express'
import UserController from '../controllers/users.js'
const router = Router();

router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)
router.get('/', UserController.getUser)
router.get('/all', UserController.getAll)
router.get('/friends/:userId', UserController.getFriends)
router.put('/:id/follow', UserController.followUser)
router.put('/:id/unfollow', UserController.unfollowUser)

export default router