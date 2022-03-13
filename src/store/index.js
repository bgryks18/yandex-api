import Vue from "vue";
import Vuex from "vuex";

import ax from "axios";

Vue.use(Vuex);

const data_url = `https://cloud-api.yandex.net/v1/disk/resources`;
const download_url = `https://cloud-api.yandex.net/v1/disk/resources/download`;
const token = process.env.VUE_APP_TOKEN; // yandexten alınan token

export default new Vuex.Store({
	state: {
		loading: true,
		error: null,
		files: [],
		previous: "disk:/",
		current: "disk:/",
		defaultPage: "disk:/",
	},
	getters: {
		getDataFromState(state) {
			return state.files;
		},
		isLoading(state) {
			return state.loading;
		},
		isError(state) {
			return state.error;
		},
		getPrevious(state) {
			return state.previous;
		},
		getCurrent(state) {
			return state.current;
		},
		getDefaultPage(state) {
			return state.defaultPage;
		},
		getFields() {
			return [
				{
					key: "name",
					label: "Dosya",
					sortable: true,
					sortDirection: "desc",
				},
				{
					key: "created",
					label: "Oluşturulma Tarihi",
					sortable: true,
					sortDirection: "desc",
					formatter: (value) => {
						return (
							value.split("T")[0].split("-")[2] +
							"/" +
							value.split("T")[0].split("-")[1] +
							"/" +
							value.split("T")[0].split("-")[0] +
							"\nSaat: " +
							value.split("T")[1].split("+")[0]
						);
					},
				},
				{
					key: "file",
					label: "İndir",
				},
			];
		},
	},
	mutations: {
		moveDataToState(state, payload) {
			state.files = payload;
			state.loading = false;
		},
		throwError(state, error) {
			state.error = error;
			state.loading = false;
		},
		setPrevious(state, path) {
			state.previous = path;
		},
		setCurrent(state, path) {
			state.current = path;
		},
  },
	actions: {
		async getData({ state, commit }, path = state.defaultPage) {
			if (state.loading !== true) {
				state.loading = true;
			}
			if (path !== state.defaultPage) {
				let newPathArr = path.split("/");
				newPathArr.pop();
				let newPath = "";
				newPathArr.forEach((item, index) => {
					if (newPathArr.length - 1 === index) {
						newPath += item;
					} else {
						newPath += item + "/";
					}
				});
				if (newPath.split("/").length === 1) {
					commit("setPrevious", state.defaultPage);
				} else {
					commit("setPrevious", newPath);
				}
			} else {
				commit("setPrevious", state.defaultPage);
			}
			await ax
				.get(data_url, {
					headers: {
						Accept: "application/json",
						Authorization: token,
					},
					params: {
						path,
					},
				})
				.then((res) => {
					commit("moveDataToState", res.data._embedded.items);
				})
				.catch((error) => {
					commit("throwError", error);
				});
		},
  },
});
