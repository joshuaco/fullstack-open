import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import diaryService from './services/diaryService';
import DiaryEntries from './components/DiaryEntries';
import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <h1>Flight Diary</h1>
      <main>
        <DiaryForm setDiaries={setDiaries} />
        <DiaryEntries diaries={diaries} />
      </main>
    </div>
  );
}

export default App;
