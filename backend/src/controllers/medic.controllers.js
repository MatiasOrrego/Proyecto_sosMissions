import { createJwt } from "../helpers/createJwt.js";
import { createMedicUser } from "../models/medic.models.js";

export const signUpMedicCtrl = async (req, res) => {
    try {
      const { name, lastname, email, username, password, dni, matricula_nacional, matricula_provincial, especialidad, telefono } = req.body;
  
      const newUser = await createMedicUser({ name, lastname, email, username, password, dni, matricula_nacional, matricula_provincial, especialidad, telefono });
  
      const token = await createJwt(newUser.id);
  
      res.cookie('token', token), { httpOnly: true }
      
      res.status(201).json({ user: newUser, msg: 'Registrado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };