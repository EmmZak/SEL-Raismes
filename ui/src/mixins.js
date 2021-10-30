/*
 * value is stored in DB
 */

const categories = [
    { name: "Autre", value: "other", image: "animal.jpg" },
    { name: "Animaux", value: "animal", image: "animal.jpg" },
    { name: "Bricolage, travaux, tâches ménagères", value: "home", image: "home.jpg" },
    { name: "Cuisine", value: "kitchen", image: "kitchen.jpg" },
    { name: "Décoration, DIY, Couture", value: "diy", image: "diy.jpeg" },
    { name: "Informatique", value: "computer", image: "computer.jpeg" },
    { name: "Jardinage", value: "garden", image: "garden.jpg" },
    { name: "Loisirs, jeux, sport", value: "hobby", image: "hobby.png" },
    { name: "Mobilité", value: "transport", image: "transport.jpeg" },
    { name: "Savoirs, connaissances", value: "teaching", image: "teaching.jpeg" },
    { name: "Social (garde d'enfant...)", value: "social", image: "social.jpeg" },
    { name: "Prêt/Don Matériel/Bien", value: "loan", image: "loan" }
    // { name: "Prêt/Don Biens culturels (livres, CD)", value: "", image: "cultural" },
    // { name: "Prêt/Don Électroménager/Informatique", value: "", image: "hardware" },
    // { name: "Prêt/Don Jeux, Loisirs", value: "", image: "game" },
    // { name: "Prêt/Don Meubles", value: "", image: "furniture" },
    // { name: "Prêt/Don Outillage", value: "", image: "tools" },
    // { name: "Prêt/Don Petite décoration", value: "", image: "deco" },
    // { name: "Prêt/Don Textile", value: "", image: "textil" },
    // { name: "Prêt/Don Plantes/Potager", value: "", image: "plants" },
    // { name: "Prêt/Don Autres biens", value: "other", image: "" }
]

function getCategoryNameByValue(value) {
    let item = categories.find(c => c.value == value)
    if (item) {
        return item.name
    } else {
        return undefined
    }
}

function getCategoryByValue(value) {
    return categories.find(c => c.value == value)
}

function getCategoryImageByValue(value) {
    let item = categories.find(c => c.value == value)
    if (item) {
        return item.image
    } else {
        return undefined
    }
}
/*
 * value is stored in DB
 */

const towns = [
    { name: "Raismes", value: "59590" },
    { name: "Escautpont", value: "59278" },
    { name: "Fresnes-sur-Escaut", value: "59970" },
    { name: "Vieux-Condé", value: "59690" },
    { name: "Condé-sur-l'Escaut", value: "59163" },
    { name: "Bruay-sur-l'Escaut", value: "59860" },
    { name: "Beuvrages", value: "59192" },
    { name: "Anzin", value: "59410" },
    { name: "Saint-Saulve", value: "59880" },
    { name: "Onnaing", value: "59264" },
    { name: "Quarouble", value: "59243" },
    { name: "Valenciennes", value: "59300" },
    { name: "Petite-Forêt", value: "59494" },
    { name: "Marly", value: "59770" },
    { name: "Quiévrechain", value: "59920" }
]

function getTownName(value) {
    const town = towns.find(t => t.value == value)
    if (town) {
        return town.name
    }
    return null
}

/**
 * Form validators
 */
const notEmptyRule = v => v && !!v.trim() || 'Le champ ne peut être vide'
const townRules = [(v) => !!v || "Veuillez choisir la ville"];
const nameRules = [
    (v) => !!v || "Veuillez saisir un nom/prénom", 
    notEmptyRule
];
const emailRules = [
    (v) => !!v || "Veuillez saisir un mail",
    (v) => /.+@.+\..+/.test(v) || "Le mail n'est pas correct",
];
const numberRules = [
    (v) => v.length == 10 || "Le numéro n'est pas correct",
    (v) => !isNaN(v) || "Seuls les chiffres sont autorisés",
];

const messageRules = [(v) => v.length < 100 || "Le message est très long"];
const subjectRules = [(v) => !!v || "Veuillez choisir un sujét"]
const requiredRules = [(v) => !!v || "Champ obligatoire"]
const passwordRules = [
    (v) => v.length > 5 || "Au moins 6 caractères", 
    notEmptyRule
]
const onlyNumbersRules = [
    (v) => !!v || "Saisir le solde", (v) => !isNaN(v) || "Seuls les chiffres sont autorisés",
]

function formatISOonlydate(iso) {
    return iso.split("-").reverse().join('/')
}

function formatISOdateToHours(iso) {

    let time = iso.split("T")[1]

    const hour = time.split(":")[0]
    const min = time.split(":")[1]

    return hour + "h" + min
}

function goToPath(path) {
    let route = this.$route.fullPath
    if (route != path) {
        this.$router.push(path)
    }
}

function getCurrentPath() {
    return this.$route.fullPath
}

/**
 * Sort options
 */
const sortOptions = [
    { title: "Le plus récent", value: "desc" },
    { title: "Le plus ancien", value: "asc" }
];

export {
    //  router
    goToPath,
    getCurrentPath,
    // date time
    formatISOonlydate,
    formatISOdateToHours,
    // rules
    townRules,
    requiredRules,
    passwordRules,
    nameRules,
    emailRules,
    numberRules,
    onlyNumbersRules,
    messageRules,
    subjectRules,
    // lists
    sortOptions,
    // towns
    towns,
    getTownName,
    // categories
    categories,
    getCategoryByValue,
    getCategoryNameByValue,
    getCategoryImageByValue
}
