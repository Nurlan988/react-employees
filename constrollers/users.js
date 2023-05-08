const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route POST api/user/login
 * @desc Login
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in the input' })
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    });

    const isPasswordCurrect = user && (await bcrypt.compare(password, user?.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCurrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      })
    } else {
      return res.status(400).json({ message: 'Login or password entered incorrectly ' })
    }
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }

}

/**
 * @route POST api/user/register
 * @desc Register
 * @access Public
 */
const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: 'Please complete the required entries' })
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if (registeredUser) {
      return res.status(400).json({ message: 'User with this email already exists' })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      }
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Failed to create user' })
    }
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }

}

/**
 * @route GET api/user/current
 * @desc Current
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
}

module.exports = {
  login,
  register,
  current
}