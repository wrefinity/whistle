import router from 'express';
import  AuthController from '../controllers/auth.js'


const route = router.Router()
route.post('/register', AuthController.register)
route.post('/login', AuthController.login)

export default route
