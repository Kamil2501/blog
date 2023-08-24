export default class Strapi {
	/**
	 * @param {string} strapiUrl
	 * @param {string} prefix
	 */
	constructor(strapiUrl = 'https://strapiblog.up.railway.app', prefix = 'api') {
		this.strapiUrl = strapiUrl;
		this.prefix = prefix;
	}

	/**
	 * @param {string} contentType
	 */
	async findMany(contentType) {
		const response = await fetch(
			`${this.strapiUrl}/${this.prefix}/${contentType}?populate=*`
		);

		if (!response.ok) {
			throw new Error(`${response.statusText}, status: ${response.status}`);
		}

		const { data } = await response.json();

		return data;
	}

	/**
	 * @param {string} contentType
	 * @param {any} id
	 */
	async findOne(contentType, id) {
		const response = await fetch(
			`${this.strapiUrl}/${this.prefix}/${contentType}/${id}?populate=*`
		);

		if (!response.ok) {
			throw new Error(`${response.statusText}, status: ${response.status}`);
		}

		const { data } = await response.json();

		return data;
	}

	/**
	 * @param {any} post
	 * @param {string} imgName
	 */
	getImage(post, imgName) {
		const url = this.strapiUrl + post?.attributes[imgName].data.attributes.url;
		const alt = post?.attributes[imgName].data.attributes.alternativeText;

		return { url, alt };
	}
}
