import axios from 'axios';

export const fetchList = async (url) => {
    try {
      const response = await axios.get(url);
      return response?.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
