const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllUsers = async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.createUser = async (req, res) => {
  const { name, lastname, phone, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      lastname,
      phone,
      email,
    },
  });
  res.status(201).json(user);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, phone, email } = req.body;
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      name,
      lastname,
      phone,
      email,
    },
  });
  res.json(user);
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.status(204).send(user);
};