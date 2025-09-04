import argon2 from "argon2";
import { generateToken } from "../utils/jwt.utils.js";

// ↓ Fake data des comptes (Futur -> la DB)
const users = [
    {
        email: 'vincent@digitalcity.brussels',
        pwd: '$argon2i$v=19$m=16,t=2,p=1$cVRqcFJpd3RLeEpQOWY1SQ$7gQJJiOATG/HREYpFVhTVg',
        username: 'Vince'
    },
    {
        email: 'harald@digitalcity.brussels',
        pwd: '$argon2id$v=19$m=16,t=2,p=1$NlRvdXJieHg5Z0VjSGpuOA$ugamXA3JLAdOc/KzRXIQ6Q',
        username: 'Mister IA'
    },
]

const authController = {
    login: async (req, res) => {
        // ==== Récupérer les données entrées ====
        const { email, password } = req.body;

        // ==== Vérifier si l'utilisateur existe ====
        const user = users.find(u => u.email === email);
        // Si non → erreur 400
        if (!user) {
            res.status(400).json({ error: "Credential invalid !" })
        }
        // Si oui → validation
        const pwd_db = user.pwd;
        if (!await argon2.verify(pwd_db, password)) {
            res.status(400).json({ error: "Credential invalid !" });

            return;
        }

        // ==== Générer le token et l'envoyer à l'utilisateur
        const token = await generateToken(user)

        res.status(200).json({ token });
    },
    register: async (req, res) => {
        // ==== Récupérer les données entrées ====
        const { email, password, username } = req.body;

        // ==== Vérifier si les données sont complètes ====
        if (!email || !password || !username) {
            res.status(400).json({ message: "Données incomplètes" });
            return;
        };

        // ==== Vérifier si l'utilisateur existe déjà ====
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            res.status(400).json({ message: "L'utilisateur existe déjà." })
            return;
        }

        // ==== Création d'un nouvel utilisateur ====
        const newUser = {
            email,
            pwd: await argon2.hash(password),
            username
        };

        // ==== Rajouter l'utilisateur au tableau/db
        users.push(newUser);

        res.status(201).location(`/api/auth/${newUser.email}`).json(newUser);
    },
    updatePwd: async (req, res) => {
        // ==== Récupérer les données entrées ====
        const { oldPassword, newPassword } = req.body;
        const user = req.user.email;

        // ==== Vérifier si l'utilisateur existe ====
        // Si non → erreur 400
        if (!user) {
            res.status(400).json({ error: "User not found !" })
        }

        // ==== Vérifier si le mdp est valide ====
        const isValid = await argon2.verify(user.pwd, oldPassword);
        if (!isValid) {
            res.status(400).json({ error: "Ancien mot de passe incorrect." })
            return;
        }

        // ==== Hasher le nouveau mot de passe ====
        const hashNewPwd = await argon2.hash(newPassword);

        // ==== Stocker le nouveau mdp ====
        user.pwd = hashNewPwd;

        res.status(200).json({ message: "Mot de passe modifié avec succès." })
    }
}

export default authController;