//import { getServices } from "../../services/service"

export default {
    state: {
        categories: [
            { name: "Autre", loan: false },
            { name: "Animaux", loan: false },
            { name: "Bricolage, travaux, tâches ménagères", loan: false },
            { name: "Cuisine", loan: false },
            { name: "Décoration, DIY, Couture", loan: false },
            { name: "Informatique", loan: false },
            { name: "Jardinage", loan: false },
            { name: "Loisirs, jeux, sport", loan: false },
            { name: "Mobilité", loan: false },
            { name: "Savoirs, connaissances", loan: false },
            { name: "Social (garde d'enfant...)", loan: false },
            { name: "Prêt/Don Biens culturels (livres, CD)", loan: true },
            { name: "Prêt/Don Électroménager/Informatique", loan: true },
            { name: "Prêt/Don Jeux, Loisirs", loan: true },
            { name: "Prêt/Don Meubles", loan: true },
            { name: "Prêt/Don Outillage", loan: true },
            { name: "Prêt/Don Petite décoration", loan: true },
            { name: "Prêt/Don Textile", loan: true },
            { name: "Prêt/Don Plantes/Potager", loan: true },
            { name: "Prêt/Don Autres biens", loan: true }
        ],
    },
    getters: {
        categories(state) {
            return state.categories;
        },
    },
}