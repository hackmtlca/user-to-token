import express from 'express';
import sqlite from 'sqlite';
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_SECRET: string;
        }
    }
}

let router = express.Router();

router.post('/', async function (req, res) {
    const db = await sqlite.open('./data/user-to-token.db');

    if (req.body.username) {
        try {
            const query: { user_count: number } = await db.get(`SELECT COUNT(username) as user_count FROM users WHERE username = "${req.body.username.replace(/"/g, "")}"`);

            if (query.user_count != null && query.user_count == 0) {
                const id = uniqid();

                await db.exec(`INSERT INTO users (id, username) VALUES ("${id}", "${req.body.username}")`);

                const user: { username: string } = await db.get(`SELECT username FROM users WHERE id = "${id}"`);

                res.json({ "token": jwt.sign({ "username": user.username }, process.env.JWT_SECRET), "username": user.username });
            } else {
                res.json({ "error": "Duplicate username." });
            }
        } catch (e) {
            res.json({ "error": JSON.stringify(e) });
        }
    } else {
        res.json({ "error": "Undefined username." });
    }

    db.close();
});

export default router;