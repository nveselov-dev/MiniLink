import { Router, Request, Response } from 'express';
import { User, IUser } from "../models/User.js";

const router = Router();

router.post('/users', async (req: Request, res: Response) => {
    try {
        const {username} = req.body;
        if (!username || typeof username !== 'string') {
            return res.status(400).json({error: 'Username is required and must be a string'});
        }

        try {
            const newUser = await User.create({username, links: []});
            res.status(201).json(newUser);
        } catch (dbError: any) {
            if (dbError.code === 11000) {
                return res.status(409).json({error: 'User with this username already exists'});
            }
            throw dbError;
        }
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/users/:username/links', async (req: Request, res: Response) => {
    try {
        const {username} = req.params;
        const {url, title} = req.body;

        if (!title || !url) {
            return res.status(400).json({error: 'Both title and url are required'});
        }

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return res.status(400).json({error: 'URL must start with http:// or https://'});
        }

        const newLink =  {
            id: crypto.randomUUID(),
            url,
            title,
            clicks: 0,
        };

        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $push: { links: newLink } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(201).json(updatedUser.links[updatedUser.links.length - 1]);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:username', async (req: Request, res: Response) => {
    try {
        const {username} = req.params;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.patch('/links/:linkId/click', async (req: Request, res: Response) => {
    try {
        const { linkId } = req.params;

        const result = await User.findOneAndUpdate(
            { "links.id": linkId },
            { $inc: { "links.$.clicks": 1 } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ error: 'Link not found' });
        }

        res.json({ message: 'Click registered successfully', clicks: result.links.find(l => l.id === linkId)?.clicks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router;