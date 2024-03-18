// Example: app/api/posts/index.js

import { query } from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { content } = req.body;
        try {
            const result = await query(
                'INSERT INTO posts(content, created_at) VALUES ($1, NOW()) RETURNING *',
                [content]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
