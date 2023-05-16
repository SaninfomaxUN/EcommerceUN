const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ConnectionDB = require("../../Database/ConnectionDB");

require('dotenv').config({path: './env/.env'});
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const secret = "your_secret_key"
const time = 30
const cookiexpires = 30


module.exports = {
    login: async (req, res) => {
        function getJwtSecret() {
            return secret || 'your_secret_key';
        }

        function cookieOptions(expires) {
            return {
                httpOnly: true,
                expires: new Date(Date.now() + expires * 1000),
                sameSite: 'none',
                secure: true,
            };
        }

        try {
            const connection = ConnectionDB.getConnection();
            const email = req.body.email;
            const plainTextPassword = req.body.password;
            if (!email || !plainTextPassword) {
                return res.json({
                    success: false,
                    message: 'Ingrese un correo y contraseña',
                });
            } else {

                console.log("sssssssssss")
                const [rows, fields] = await connection.query("SELECT * FROM credencialcomprador WHERE email = ?", [email]);
                if (rows.length === 0) {
                    return res.json({
                        success: false,
                        message: 'Correo y/o contraseña incorrectas',
                    });
                } else {
                    const hashedPassword = rows[0]['PASSWORD'];
                    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);

                    if (!isMatch) {
                        return res.json({
                            success: false,
                            message: 'Correo y/o contraseña incorrectas',
                        });
                    } else {
                        const id = rows[0].ID_CREDENCIAL;
                        const token = jwt.sign({id}, getJwtSecret(), {expiresIn: '30s'});

                        const cookieExpires = 30; // Expires in 30 seconds
                        const cookieOption = cookieOptions(cookieExpires);
                        res.cookie('jwt', token, cookieOption);

                        // Send token as response
                        res.json({
                            success: true,
                            message: 'Ingreso correcto',
                            token: token
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: 'Error en el servidor',
            });


        }
    },


        logout: (req, res) => {
            res.clearCookie('jwt')
            return res.redirect('/')
        }

    }