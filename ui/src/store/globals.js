/**
 * Form validators
 */
const nameRules = [(v) => !!v || "Veuillez saisir un nom/prénom"];
const emailRules = [
	(v) => !!v || "Veuillez saisir un mail",
	(v) => /.+@.+\..+/.test(v) || "Le mail n'est pas correct",
];
const numberRules = [
	//(v) => !!v || "Veuillez saisir votre numéro",
	(v) => v.length == 10 || "Le numéro n'est pas correct",
	(v) => !isNaN(v) || "Seuls les chiffres sont autorisés",
];

const messageRules = [(v) => v.length < 100 || "Le message est très long"];
const subjectRules = [(v) => !!v || "Veuillez choisir un sujét"]
const requiredRules = [(v) => !!v || "Champ obligatoire"]
const passwordRules = [(v) => v.length > 5 || "Au moins 6 caractères"]
const onlyNumbersRules = [(v) => !!v || "Saisir le solde", (v) => !isNaN(v) || "Seuls les chiffres sont autorisés",]

function formatISOonlydate(iso) {
	return iso.split("-").reverse().join('/')
}

function formatISOdateToHours(iso) {

	let time = iso.split("T")[1]

	const hour = time.split(":")[0]
	const min = time.split(":")[1]

	return hour + "h" + min
}

/**
 * Sort options
 */
const sortOptions = [
	{ title: "Le plus récent", value: "desc" },
	{ title: "Le plus ancien", value: "asc" }
];

export {
	formatISOonlydate,
	formatISOdateToHours,
	// rules
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
};
