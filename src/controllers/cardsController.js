import { Router } from 'express';
import { body, checkExact, param, validationResult } from 'express-validator';

import { randomInteger } from '../helpers/helper.js';
import prisma from '../model/client.js';

const cards = Router();

cards.post('', [
    body('front')
        .isString()
        .withMessage('Front of card must be a string')
        .escape(),
    body('back')
        .isString()
        .withMessage('Back of card must be a string')
        .escape(),
    checkExact(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const card = await prisma.card.create({ data: req.body });
    return res.status(201).json(card);
});

cards.get('/', async (_, res) => {
    return res.json(await prisma.card.findMany());
});

cards.get('/random', async (_, res) => {
    const cardArr = await prisma.card.findMany();
    if (!cardArr.length) {
        return res.status(409).send('No cards have been added yet');
    }
    const randCardIdx = randomInteger(0, cardArr.length - 1);
    return res.json(cardArr[randCardIdx]);
});

cards.get('/:id', [
    param('id')
        .isInt()
        .withMessage('Index must be an integer')
        .toInt(),
    checkExact(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const card = await prisma.card
        .findUnique({ where: req.params });
    if (!card) {
        return res.status(404).send();
    }

    return res.json(card);
});

cards.delete('/:id', [
    param('id')
        .isInt()
        .withMessage('Index must be an integer')
        .toInt(),
    checkExact(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    try {
        await prisma.card.delete({ where: req.params });
    } catch (err) {
        switch (err.code) {
            case 'P2025':
                return res.status(404).send();
            default:
                throw err;
        }
    }

    return res.status(204).send();
});

export default cards;
