import { Handler } from '@netlify/functions'
import axios from 'axios';
import {Repository} from '../../Models/Repository';
import corsHeaders from '../corsHelpers/corsHeaders'
require('dotenv').config()

export const handler: Handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Allow': 'OPTIONS, POST',
        'Access-Control-Allow-Methods': 'OPTIONS, POST'
      }
    }
  }

  try{
    const response = await Get('https://api.github.com/user/repos?per_page=100');


    const repos: Repository[] = await Promise.all(response.data.map(async (data: any) => {
      const languagesResponse = await Get(data.languages_url);
      return {
        id: data.id,
        name: data.name,
        private: data.private,
        html_url: data.html_url,
        languages_url: data.languages_url,
        topics: data.topics,
        languages: languagesResponse.data
      };
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(repos),
      headers: corsHeaders,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
      headers: corsHeaders,
    };
  }

}
async function Get(url: string): Promise<any> {
  const { GITHUB_API_KEY }  = process.env
  return  await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${GITHUB_API_KEY}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json"
    }
  });

}

