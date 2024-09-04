import { useState } from 'react';
import { DiaryEntry } from '../types';
import diaryService from '../services/diaryService';

interface DiaryFormProps {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

function DiaryForm({ setDiaries }: DiaryFormProps) {
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newDiaryEntry = {
      date,
      weather,
      visibility,
      comment
    };

    try {
      const newDiary = await diaryService.sendNewDiary(newDiaryEntry);
      setDiaries((prevDiaries) => prevDiaries.concat(newDiary));
      resetForm();
    } catch (error) {
      if (error instanceof Error) {
        setNotification(error.message);
      }
    }
  };

  const resetForm = () => {
    setDate('');
    setComment('');
    setWeather('');
    setVisibility('');
  };

  return (
    <div>
      <h3>New Entry</h3>

      {notification && <p>{notification}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='date'>date</label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='weather'>weather</label>
          <input
            type='text'
            id='weather'
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='visibility'>visibility</label>
          <input
            type='text'
            id='visibility'
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='comment'>comment</label>
          <input
            type='text'
            id='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
}

export default DiaryForm;
