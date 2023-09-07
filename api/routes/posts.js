import { Router } from 'express'
import  AuthController from '../controllers/posts.js'
import upload from '../multer.js'

const router = Router()
router.post('/', AuthController.createPost)
router.put('/:id', AuthController.updatePost)
router.delete('/:id', AuthController.deletePost)
router.put('/:id/like', AuthController.likePost)
router.get('/:id', AuthController.getPost)
router.get('/timeline/:userId', AuthController.getTimelinePosts)

router.get('/profile/:username', AuthController.getUserPosts)

export default router
