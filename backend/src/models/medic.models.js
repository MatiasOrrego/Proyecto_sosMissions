import { hash, genSalt }from "bcrypt";
import { conn } from "../database/db.js";

export const createMedicUser = async (user) => {
  const { name, lastname, email, username, password, dni, matricula_nacional, matricula_provincial, especialidad, telefono, roleId } = user;
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const [result] = await conn.query(`INSERT INTO medics (name, lastname, email, username, password, dni, matricula_nacional, matricula_provincial, especialidad, telefono, date) VALUES (?,?,?,?,?,?,?,?,?,?,CURRENT_DATE())`, [name, lastname, email, username, hashedPassword, dni, matricula_nacional, matricula_provincial, especialidad, telefono]);

  const [users] = await conn.query(`INSERT INTO users (username, email, password, roleId, fecha_registro) VALUES (?,?,?,2,CURRENT_DATE())`,[username, email, hashedPassword, roleId])

  return { id: result.insertId, name, lastname, email, username, hashedPassword, dni, matricula_nacional, matricula_provincial, especialidad, telefono }
};

export const getMedicUserById = async (id) => {
  const [result] = await conn.query(`SELECT * FROM medics WHERE id = ?`, [id]);
  console.log(result);
  
  return result[0] || null;
};
