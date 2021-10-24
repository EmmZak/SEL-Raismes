import {
	//findPublication,
	findPublications,
	createPublication,
	updatePublication,
	removePublication,
} from "./../firebaseService";
import { getServices } from "./../../services/service"

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
		visitPublications: [
			{
				categ: "Animaux",
				user: {
					name: "Manu",
					surname: "",
					number: "0088776644",
					mail: "manu@test.fr",
				},
				date: new Date(),
				cost: "",
			}
		],
		publications: [],
		items: [],
	},
	mutations: {
		setPublications(state, value) {
			state.publications = value;
		},
		// setCategories(state, value) {
		// 	state.categories = value;
		// },
	},
	actions: {
		// data = {publication: publication, backup: backup}
		async savePublication({ commit }, data) {
			let publication = data.publication;

			if (publication.id == null) {
				await createPublication(publication);
			} else {
				await updatePublication(publication);
			}
		},
		async deletePublication({ commit }, item) {
			await removePublication(item)
		},
		// async fetchCategories({ commit }, options) {
		// 	let items = []
		// 	await getCategories()
		// 		.then((res) => {
		// 			console.log("store.categories", res.data)
		// 			items = res.data
		// 			commit("setCategories", items);
		// 		})
		// 		.catch((err) => {
		// 			print("store.err", err)
		// 		})
		// },
		async fetchPublications({ commit }, options) {
			let services = []
			await getServices()
				.then((res) => {
					console.log("store.res", res)
					services = res.data
					commit("setPublications", services);
				})
				.catch((err) => {
					print("store.err", err)
				})
			//console.log("fetching publications categList", options.categList);
			//let pubs = await findPublications(options.sort, options.categList)
			//commit("setPublications", pubs);
		},
	},
	modules: {},
	getters: {
		sortOptions(state) {
			return state.sortOptions;
		},
		publications(state) {
			return state.publications;
		},
		items(state) {
			return state.items;
		},
		categories(state) {
			return state.categories;
		},
	},
};
