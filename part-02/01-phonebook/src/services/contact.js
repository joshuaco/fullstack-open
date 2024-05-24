// 'https://render-test-backend-t5cb.onrender.com/api/persons';

const URL = '/api/persons';

async function getAll() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error('Error connecting to server, try again later');
    //return [];
  }
}

async function create(newObject) {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newObject)
    });
    const data = await response.json();
    return data;
  } catch (e) {
    alert('Error connecting to server, try again later');
    return newObject;
  }
}

async function update(id, newObject) {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newObject)
    });
    const data = await response.json();
    return data;
  } catch (e) {
    alert('Error updating contact');
  }
}

async function remove(id) {
  try {
    fetch(`${URL}/${id}`, { method: 'DELETE' });
  } catch (e) {
    alert('Error deleting contact');
  }
}

export { getAll, create, update, remove };
