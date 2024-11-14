import { createJwt } from '../helpers/createJwt.js';
import { getUserByCredentials, createUser, getUserById } from '../models/user.model.js';
import { conn } from '../database/db.js';

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
    // Obtener la información básica del usuario de la tabla `users`
    const [userResult] = await conn.query(`SELECT * FROM users WHERE id = ?`, [id]);
    const user = userResult[0];

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el usuario es médico (roleId = 2)
    if (user.roleId === 2) {
      // Obtener información adicional del usuario en la tabla `medics`
      const [medicResult] = await conn.query(`SELECT * FROM medics WHERE username = ?`, [user.username]);
      const medicData = medicResult[0];

      if (medicData) {
        // Combinar la información del usuario con la del médico
        const combinedData = {
          ...user,
          ...medicData,
          isMedic: true
        };
        return res.status(201).json(combinedData);
      }
    }

    // Si el usuario no es médico, devolvemos solo la información general
    res.status(201).json({ ...user, isMedic: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
