import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Validator } from 'node-input-validator'

export const login = async (req, res) => {
  const v = new Validator(req.body, {
    username: 'required|string',
    password: 'required|string|minLength:6'
  })

  const matched = await v.check()

  if (!matched) {
    const firstKey = Object.keys(v.errors)[0]
    const firstError = v.errors[firstKey].message
    return res.status(422).json({ success: false, msg: firstError })
  }

  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ success: false, msg: 'Invalid username or password!' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: 'Invalid username or password!' })
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

    return res.status(200).json({
      success: true,
      msg: 'Login successful',
      token,
      user: payload
    })

  } catch (error) {
    res.status(500).json({ success: false, msg: 'Internal server error', error: error.message })
  }
}
