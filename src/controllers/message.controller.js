

const messageController = {
    message: (req, res) => {
        res.status(200).json({ message: "Hello world ! It's the 6th exercice." })
    }
}

export default messageController;