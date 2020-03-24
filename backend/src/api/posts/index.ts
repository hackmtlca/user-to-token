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

router.get('/:id', async function (req, res) {
    const db = await sqlite.open('./data/user-to-token.db');

    try {
        const query: { content: string } = await db.get(`SELECT content FROM posts WHERE id="${req.params.id}" AND shared="1"`);

        if(query) {
            res.json({ post: query });
        } else {
            res.json({ "error": "Post is not shared/does not exist." });
        }
    } catch (e) {
        res.json({ "error": JSON.stringify(e) });
    }

    db.close();
});

router.post('/', async function (req, res) {
    const db = await sqlite.open('./data/user-to-token.db');

    if (req.body.token) {
        try {
            const user: { username?: string } = jwt.verify(req.body.token, process.env.JWT_SECRET) as object;

            if (user && user.username) {
                const query: { id: string, content: string }[] = await db.all(`SELECT id, content, shared FROM posts WHERE author = "${user.username}"`);

                res.json({ posts: query });
            } else {
                res.json({ "error": "Invalid JWT." });
            }
        } catch (e) {
            res.json({ "error": JSON.stringify(e) });
        }
    } else {
        res.json({ "error": "Undefined token." });
    }

    db.close();
});

router.post('/share', async function (req, res) {
    const db = await sqlite.open('./data/user-to-token.db');

    if (req.body.token && req.body.id) {
        try {
            const user: { username?: string } = jwt.verify(req.body.token, process.env.JWT_SECRET) as object;

            if (user && user.username) {
                await db.exec(`UPDATE posts SET shared = 1 WHERE id = "${req.body.id}"`);

                res.json({ "id": req.body.id });
            } else {
                res.json({ "error": "Invalid JWT." });
            }
        } catch (e) {
            res.json({ "error": JSON.stringify(e) });
        }
    } else {
        res.json({ "error": "Undefined token/post." });
    }

    db.close();
});

router.put('/', async function (req, res) {
    const db = await sqlite.open('./data/user-to-token.db');

    if (req.body.token && req.body.content) {
        try {
            const user: { username?: string } = jwt.verify(req.body.token, process.env.JWT_SECRET) as object;

            if (user && user.username) {
                const id = uniqid();

                await db.exec(`INSERT INTO posts (id, author, content) VALUES ("${id}", "${user.username}", "${req.body.content}")`);

                res.json({ post: {"id": id, "author": user.username, "content": req.body.content}});
            } else {
                res.json({ "error": "Invalid JWT." });
            }
        } catch (e) {
            res.json({ "error": JSON.stringify(e) });
        }
    } else {
        res.json({ "error": "Undefined token/post." });
    }

    db.close();
});

export default router;