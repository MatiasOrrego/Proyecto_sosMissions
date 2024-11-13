import { createJwt } from '../helpers/createJwt.js';
import { getUserByCredentials, createUser, getUserById } from '../models/user.model.js';

export const signInCtrl = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ message: "credenciales incorrectas" });
    }

    const token = await createJwt(user.id);

    res.cookie("token", token, { httpOnly: true }).status(200).json({ user: user, msg: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUpCtrl = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await createUser({ username, email, password });

    const token = await createJwt(newUser.id);

    res.cookie('token', token), { httpOnly: true }
    
    res.status(201).json({ user: newUser, msg: 'Registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const signOutCtrl = (_req, res) => {
  try {
    res.clearCookie("token")
    
    res.status(200).json({ message: "Sign out success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeCtrl = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByIdCtrl = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const user = await getUserById(id);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
