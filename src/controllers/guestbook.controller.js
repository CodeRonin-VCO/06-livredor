import express from "express";
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
     * (GET) A voir avec Vincent :p
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
            id: 2,
            author,
            message,
            hasSpoiler,
            sendDate: new Date().toISOString()
        };

        messages.push(newMsg);

        // todo -> Add location
        res.status(201).json(msgMapper.toCompleteDTO(newMsg));
    },
    detailsMessage: async (req, res) => {
        // (GET) /api/guestbook/:id

        const id = parseInt(req.params.id);
        const msg = messages.find(m => m.id === id);

        if(!msg) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json(msgMapper.toCompleteDTO(msg))
    }
};

export default guestbookController;