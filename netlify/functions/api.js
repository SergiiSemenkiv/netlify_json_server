exports.handler = async (event, context) => {
  const { path, httpMethod, body } = event;

  const data = require('./data.json')

  if (path === '/api/users') {
    if (httpMethod === 'GET') {
      return {
        statusCode: 200,
        body: JSON.stringify(data.users)
      };
    } else if (httpMethod === 'POST') {
      const newUser = JSON.parse(body);
      const newId = data.users.length + 1;
      newUser.id = newId;
      data.users.push(newUser);
      
      fs.writeFileSync(dataFilePath, JSON.stringify(data));
      
      return {
        statusCode: 200,
        body: JSON.stringify(newUser)
      };
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `Route not found ${path} - ${httpMethod}` })
    };
  }
};
