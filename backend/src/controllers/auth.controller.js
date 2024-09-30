import { createJwt } from '../helpers/generarJWT.js';
import { getUserByCredentials, createUser } from '../models/user.model.js';

export const signInCtrl = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ message: "credenciales incorrectas" });
    }

    const token = await createJwt(user.id);

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ token, user, msg: 'Inicio de sesión exitoso'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUpCtrl = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const newUser = await createUser({ username, email, password });

    const token = await createJwt(newUser.id);

    res.cookie('token', token), { httpOnly: true }


    res.status(201).json({ token, user: newUser, msg: 'Registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signOutCtrl = (_req, res) => {
  try {
    res.clearCookie('token')
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
