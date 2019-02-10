const getData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw Error(`Error getting data: ${response.statusText}`);
  }
}

export default {
  getData,
}