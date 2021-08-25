import axios from 'axios';

export default class MessageService {
  static async getAll() {
    try {
      const response = await axios.get(
        'https://rickandmortyapi.com/api/character'
      );
      return response.data.results;
    } catch (e) {
      console.log(e);
    }
  }
  static async getById(id) {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`
    );
    return response.data.results;
  }
}
