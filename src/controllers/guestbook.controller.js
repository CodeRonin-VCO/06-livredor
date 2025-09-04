import express from "express";
import { v4 as uuidv4 } from 'uuid';


let messages = [];

const msgMapper = {
    toCompleteDTO: (msg) => ({
        id: msg.id,
        author: msg.author,
        message: msg.message,
        hasSpoiler: msg.hasSpoiler,
        sendDate: msg.sendDate
    }),
    toTruncatedDTO: (msg) => ({
        id: msg.id,
        author: msg.author,
        message: msg.hasSpoiler ? "Mystère..." : msg.message.slice(0, 15) + "...",
    })
}



const guestbookController = {

    message: async (req, res) => {
        res.status(200).json("Guestbookcontroller check")
    },

    /**
     * (GET) /api/guestbook?offset=0&limit=10
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    cutOffMessage: async (req, res) => {

        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;

        const paginated = messages.slice(offset, offset + limit);
        const result = paginated.map(msgMapper.toTruncatedDTO);

        console.log(messages);
        

        res.status(200).json(result);
    },


     /**
     * (POST) /api/guestbook
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    postMessage: async (req, res) => {
        // (POST) /api/guestbook

        if(!req.body) {
            res.status(400).json({ message: 'Il n\'y a pas de body... (╯°□°）╯︵ ┻━┻' });
            return;
        }

        const { author, message, hasSpoiler } = req.body;

        if (!author || !message || typeof hasSpoiler !== "boolean") {
            res.status(400).json({ message : 'Les données sont invalides !'});
            return;
        }

        // Insert data
        const newMsg = {
            id: uuidv4(),
            author,
            message,
            hasSpoiler,
            sendDate: new Date().toISOString()
        };

        messages.push(newMsg);

        //! L'erreur 201 prend toujours une location !!! voir doc
        res.status(201).location(`/api/guestbook/${newMsg.id}`).json(msgMapper.toCompleteDTO(newMsg));
    },
    detailsMessage: async (req, res) => {
        // (GET) /api/guestbook/:id

        const id = req.params.id;
        const msg = messages.find(m => m.id === id);

        if(!msg) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json(msgMapper.toCompleteDTO(msg))
    },
    modifyMsg: async (req, res) => {
        // (PUT) /api/guestbook/<id>

        // ==== Rechercher l'id et vérifier s'il existe ====
        const id = req.params.id;
        const msg = messages.find(m => m.id === id);

        if(!msg) {
            res.sendStatus(404);
            return;
        }

        // ==== Retrouver l'index du message ====
        const indexMsg = messages.findIndex(m => m.id === id);
        if (index === -1) {
            res.sendStatus(404)
            return
        }

        messages[indexMsg] = {...messages[indexMsg], ...req.body};

        res.status(200).json(messages[indexMsg]);

    }
};

export default guestbookController;