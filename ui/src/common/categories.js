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

console.log(getCategoryByValue('kitchen'))
console.log(getCategoryNameByValue('kitchen'))
console.log(getCategoryImageByValue('kitchen'))

export {
    categories, 
    getCategoryByValue,
    getCategoryNameByValue,
    getCategoryImageByValue
}