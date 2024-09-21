import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const data = await searchUsers(username, location, minRepos);
      setUserData(data.items); // GitHub Search API returns items array
    } catch (error) {
      setError('Looks like we can’t find any users matching the criteria.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-yellow-400 to-purple-700">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">GitHub User Search</h1>

      <form onSubmit={handleSearch} className="w-full max-w-md flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 mb-4 border-2 border-yellow-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 mb-4 border-2 border-yellow-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="p-2 mb-4 border-2 border-yellow-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Search
        </button>
      </form>

      {/* Loading, error, and results display */}
      {loading && <p className="text-white mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {userData && (
        <div className="mt-8 text-center text-purple-600">
          {userData.map((user) => (
            <div key={user.id} className="mb-4">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-yellow-500"
              />
              <p className="text-2xl font-semibold">{user.login}</p>
              <p className="text-sm">{user.location || 'Location not available'}</p>
              <p className="text-sm">Repositories: {user.public_repos || 'N/A'}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline mt-2"
              >
                View GitHub Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
