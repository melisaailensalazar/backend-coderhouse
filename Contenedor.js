const fs = require('fs');

class Contenedor {
	constructor(filename) {
		this.filename = filename;
	}

	save = async obj => {
		const objs = await this.getAll();
		try {
			let newId;
			objs.length === 0
				? (newId = 1)
				: (newId = objs[objs.length - 1].id + 1);
			const newObj = { ...obj, id: newId };
			objs.push(newObj);
			await this.writeFile(objs);
			return newObj.id;
		} catch (error) {
			console.log(error);
		}
	};

	getById = async id => {
		const objs = await this.getAll();
		try {
			const obj = objs.find(obj => obj.id === id);
			return obj ? obj : null;
		} catch (error) {
			console.log(error.message);
		}
	};

	getAll = async () => {
		try {
			const objs = await fs.promises.readFile(this.filename, 'utf-8');
			return JSON.parse(objs);
		} catch (error) {
			if (error.message.includes('no such file or directory')) return [];
			else console.log(error.message);
		}
	};

	deleteById = async id => {
		let objs = await this.getAll();
		try {
			objs = objs.filter(obj => obj.id != id);
			await this.writeFile(objs);
		} catch (error) {
			console.log(error.message);
		}
	};

	deleteAll = async () => await this.writeFile([]);

	writeFile = async data => {
		try {
			await fs.promises.writeFile(
				this.filename,
				JSON.stringify(data, null, 2)
			);
		} catch (error) {
			console.log(error.message);
		}
	};
}

module.exports = Contenedor;