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
    return towns.find(t => t.value == value)
}

console.log(getTownName('59300'))

export {
    towns,
    getTownName
}