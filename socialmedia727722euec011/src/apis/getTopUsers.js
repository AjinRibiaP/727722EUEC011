import axios from "axios";

const API_URL = "http://20.244.56.144/test/users"; 

const getTopUsers = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTUzNzYyLCJpYXQiOjE3NDMxNTM0NjIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRkOThiNDIwLTQ2YTUtNDhlYi05NDgwLTBlYjAxYmNhMTJiOCIsInN1YiI6IjcyNzcyMmV1ZWMwMTFAc2tjZXQuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJTS0NFVCIsImNsaWVudElEIjoiZGQ5OGI0MjAtNDZhNS00OGViLTk0ODAtMGViMDFiY2ExMmI4IiwiY2xpZW50U2VjcmV0IjoiZUpiS0p1c2djZFR2SE9TVCIsIm93bmVyTmFtZSI6IkFqaW4gUmliaWEgUCIsIm93bmVyRW1haWwiOiI3Mjc3MjJldWVjMDExQHNrY2V0LmFjLmluIiwicm9sbE5vIjoiNzI3NzIyZXVlYzAxMSJ9.10sG-ebg4IUWLyI3W3WGAotWgKC2HrqlAp8aBVBvRYA
`, 
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching top users:", error.message);
    return null;
  }
};

export default getTopUsers;
