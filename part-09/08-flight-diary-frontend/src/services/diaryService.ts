import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseURL = '/api/diaries';

const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseURL);
  return response.data;
};

const sendNewDiary = async (object: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseURL, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
    throw error;
  }
};

export default { getAllDiaries, sendNewDiary };
