exports.handler = async (event, context) => {
  const { path, httpMethod, body } = event;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTION",
  }
  const data = require('./data.json')

  if (httpMethod == "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    };
  }

  if (path === '/api/pages') {
    if (httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data.pages)
      };
    } else if (httpMethod === 'POST') {
      // todo add logic for creating page
      const pageObg = JSON.parse(body);
      pageObg.id = data.pages.length + 1
      data.pages.push(pageObj)
      return {
        statusCode: 200,
        headers
      };
    }
  } else if (path.startsWith('/api/pages/')) {
    const pageId = parseInt(path.split('/').pop(), 10);
    const pageIndex = data.pages.findIndex(p => p.id === pageId);

    if (pageIndex !== -1) {
      if (httpMethod === 'GET') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data.pages[pageIndex])
        };
      } else if (httpMethod === 'PUT') {
        const updatedPage = JSON.parse(body);
        data.pages[pageIndex] = { ...data.pages[pageIndex], ...updatedPage };
        await fse.writeJson(dataFilePath, data);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data.pages[pageIndex])
        };
      }
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Page not found' })
      };
    }
  } 
  else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `Route not found ${path} - ${httpMethod}` })
    };
  }
};
