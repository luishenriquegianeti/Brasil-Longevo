import { db } from "../db.js";
 
export const getControles = (_, res) => {
  const q = "SELECT * FROM controlepacientes";
 
  db.query(q, (err, data) => {
    if (err) return res.json(err);
 
    return res.status(200).json(data);
  });
};
 
export const addControle = (req, res) => {
  const q = `
    INSERT INTO controlepacientes
    (
      Pacientes,
      Medicamentos,
      Horario1,
      Tomou1,
      Horario2,
      Tomou2,
      Horario3,
      Tomou3
    )
    VALUES(?)
  `;
 
  const values = [
    req.body.Pacientes,
    req.body.Medicamentos,
    req.body.Horario1,
    req.body.Tomou1,
    req.body.Horario2,
    req.body.Tomou2,
    req.body.Horario3,
    req.body.Tomou3
  ];
 
  db.query(q, [values], (err) => {
    if (err) return res.json(err);
 
    return res
      .status(200)
      .json("Controle cadastrado com sucesso.");
  });
};
 
export const updateControle = (req, res) => {
  const q = `
    UPDATE controlepacientes SET
    Pacientes = ?,
    Medicamentos = ?,
    Horario1 = ?,
    Tomou1 = ?,
    Horario2 = ?,
    Tomou2 = ?,
    Horario3 = ?,
    Tomou3 = ?
    WHERE idControlePacientes = ?
  `;
 
  const values = [
    req.body.Pacientes,
    req.body.Medicamentos,
    req.body.Horario1,
    req.body.Tomou1,
    req.body.Horario2,
    req.body.Tomou2,
    req.body.Horario3,
    req.body.Tomou3
  ];
 
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
 
    return res
      .status(200)
      .json("Controle atualizado com sucesso.");
  });
};
 
export const deleteControle = (req, res) => {
  const q =
    "DELETE FROM controlepacientes WHERE idControlePacientes = ?";
 
  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);
 
    return res
      .status(200)
      .json("Controle removido com sucesso.");
  });
};
 