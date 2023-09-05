import User from '../models/User.js'
import bcrypt from 'bcrypt';


class AuthController{
  register = async (req, res) => {
    try {
      //generate salt for the password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
  
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      })
  
      //save user
      const user = await newUser.save()
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) return res.status(404).json('user not found')
      const validPass = await bcrypt.compare(req.body.password, user.password)
      if (!validPass) return res.status(400).json('wrong password')
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}


export default new AuthController();