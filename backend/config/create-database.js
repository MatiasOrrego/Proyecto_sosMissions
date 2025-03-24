import { DB_HOST, DB_NAME, DB_PORT, DB_USER } from "./config.js";
import { createPool } from "mysql2/promise";

const createDatabaseAndTables = async () => {
  try {
    const tempConn = createPool({
      host: DB_HOST,
      user: DB_USER,
      port: DB_PORT
    })

    const [databases] = await tempConn.query("SHOW DATABASES;");
    const dbExists = databases.some(db => db.Database === DB_NAME);

    if (!dbExists) {
      console.log(`Base de datos ${DB_NAME} no existe. Creándola...`);
      await tempConn.query(`CREATE DATABASE ${DB_NAME};`);
    }

    const dbConnection = createPool({
      host: DB_HOST,
      database: DB_NAME,
      user: DB_USER,
      port: DB_PORT
    });

    const queries = [
      `CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(70) NOT NULL
      );`,

      `INSERT INTO categories (id, type) VALUES
      (1, 'RCP'),
      (2, 'Heimlich'),
      (3, 'Tratamiento de Heridas'),
      (4, 'Tratamiento de Quemaduras'),
      (5, 'Hemorragias'),
      (6, 'Otros')
      ON DUPLICATE KEY UPDATE type=VALUES(type);`,
      
      `CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(30) NOT NULL
      );`,

      `INSERT INTO roles (id, type) VALUES
        (1, 'admin'),
        (2, 'medic'),
        (3, 'user'),
        (4, 'invited')
        ON DUPLICATE KEY UPDATE type=VALUES(type);`,
      
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(120) NOT NULL,
        email VARCHAR(100) NOT NULL,
        roleId INT,
        fecha_registro DATE NOT NULL,
        CONSTRAINT fk_role FOREIGN KEY (roleId) REFERENCES roles(id)
      );`,
      
      `CREATE TABLE IF NOT EXISTS videos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(100) NOT NULL,
        video VARCHAR(255) NOT NULL,
        userId INT,
        categoryId INT,
        date DATE NOT NULL,
        CONSTRAINT fk_video_user FOREIGN KEY (userId) REFERENCES users(id),
        CONSTRAINT fk_video_category FOREIGN KEY (categoryId) REFERENCES categories(id)
      );`,
      
      `CREATE TABLE IF NOT EXISTS post (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        userId INT,
        fecha_publi DATE NOT NULL,
        categoryId INT,
        CONSTRAINT fk_post_user FOREIGN KEY (userId) REFERENCES users(id),
        CONSTRAINT fk_post_category FOREIGN KEY (categoryId) REFERENCES categories(id)
      );`,
      
      `CREATE TABLE IF NOT EXISTS comments_post (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        postId INT,
        text VARCHAR(255) NOT NULL,
        fecha_comentario DATE NOT NULL,
        CONSTRAINT fk_comment_post_user FOREIGN KEY (userId) REFERENCES users(id),
        CONSTRAINT fk_comment_post_post FOREIGN KEY (postId) REFERENCES post(id)
      );`,
      
      `CREATE TABLE IF NOT EXISTS comment_video (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        videoId INT,
        text VARCHAR(255) NOT NULL,
        fecha_comentario DATE NOT NULL,
        CONSTRAINT fk_comment_video_user FOREIGN KEY (userId) REFERENCES users(id),
        CONSTRAINT fk_comment_video_video FOREIGN KEY (videoId) REFERENCES videos(id)
      );`,
      
      `CREATE TABLE IF NOT EXISTS medics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(125) NOT NULL,
        dni VARCHAR(10) NOT NULL,
        matricula_nacional VARCHAR(20) NOT NULL,
        matricula_provincial VARCHAR(20) NOT NULL,
        especialidad VARCHAR(100) NOT NULL,
        telefono VARCHAR(15) NOT NULL,
        date DATE NOT NULL
      );`,
      
      `CREATE TABLE IF NOT EXISTS quiz (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        description VARCHAR(100) NOT NULL,
        categoryId INT,
        userId INT,
        status TINYINT NOT NULL,
        date Date,
        CONSTRAINT fk_quiz_category FOREIGN KEY (categoryId) REFERENCES categories(id),
        CONSTRAINT fk_quiz_user FOREIGN KEY (userId) REFERENCES users(id)
      );`,
    
      `CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content VARCHAR(200) NOT NULL,
        quizId INT,
        CONSTRAINT fk_question_quiz FOREIGN KEY (quizId) REFERENCES quiz(id)
      );`,
    
      `CREATE TABLE IF NOT EXISTS options (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description VARCHAR(100) NOT NULL,
        status TINYINT NOT NULL,
        questionId INT,
        CONSTRAINT fk_option_question FOREIGN KEY (questionId) REFERENCES questions(id)
      );`,

      `CREATE TABLE IF NOT EXISTS user_ratings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        postId INT,
        rating TINYINT(1) NOT NULL,
        CONSTRAINT fk_user_ratings_user FOREIGN KEY (userId) REFERENCES users(id),
        CONSTRAINT fk_user_ratings_post FOREIGN KEY (postId) REFERENCES post(id)
      );`,
  
      `CREATE TABLE IF NOT EXISTS user_rating_video (
        id INT AUTO_INCREMENT PRIMARY KEY,
        videoId INT,
        rating INT(11) NOT NULL,
        userId INT
      );`

    ];

    for (let query of queries) {
      await dbConnection.query(query);
    }

    console.log("Base de datos y tablas creadas correctamente.");
  } catch (error) {
    console.error("Error al crear la base de datos o las tablas:", error);
  }
};

export { createDatabaseAndTables };
