import axios from 'axios';
import { DiaryEntry } from '../types';

const baseURL = '/api/diaries';

const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseURL);
  return response.data;
};

export default { getAllDiaries };
