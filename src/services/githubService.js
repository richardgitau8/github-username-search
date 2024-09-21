import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/users';

// Function to search for users based on username, location, and repository count
export const searchUsers = async (username, location = '', minRepos = '') => {
  const query = [
    username ? `q=${username}` : '',
    location ? `+location:${location}` : '',
    minRepos ? `+repos:>${minRepos}` : '',
  ].join('');

  const response = await axios.get(`${BASE_URL}?${query}`);
  return response.data;
};
