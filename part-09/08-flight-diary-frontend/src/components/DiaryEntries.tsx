import { useEffect, useState } from 'react';
import { DiaryEntry } from '../types';
import diaryService from '../services/diaryService';

function DiaryEntries() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>
            <b>{diary.date}</b>
          </h3>
          <p>
            Visibility: <b>{diary.visibility}</b>
          </p>
          <p>
            Weather: <b>{diary.weather}</b>
          </p>
        </div>
      ))}
    </>
  );
}

export default DiaryEntries;
