/* eslint-disable */
const axios = require('axios');
require('dotenv').config();
/* eslint-disable */

exports.handler = async (event) => {
  const { id, draftKey } = event.queryStringParameters;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "id" query parameter',
      }),
    };
  }

  try {
    const key = {
      headers: { 'X-API-KEY': process.env.API_KEY },
    };

    const res = await axios.get(
      `${process.env.ENDPOINT}/blogs/${id}?draftKey=${draftKey}`,
      key
    );

    const data = await res.data;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data),
    };
  } catch (er) {
    return {
      statusCode: er.response.status,
      body: JSON.stringify(er.response.data),
    }
  }
};
