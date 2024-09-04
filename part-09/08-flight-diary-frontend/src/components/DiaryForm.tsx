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
        <div style={{ display: 'flex' }}>
          <label htmlFor='weather'>weather:</label>
          <div>
            <input
              type='radio'
              id='weather-sunny'
              value='sunny'
              checked={weather === 'sunny'}
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor='weather-sunny'>sunny</label>
          </div>
          <div>
            <input
              type='radio'
              id='weather-cloudy'
              value='cloudy'
              checked={weather === 'cloudy'}
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor='weather-cloudy'>cloudy</label>
          </div>
          <div>
            <input
              type='radio'
              id='weather-rainy'
              value='rainy'
              checked={weather === 'rainy'}
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor='weather-rainy'>rainy</label>
          </div>
          <div>
            <input
              type='radio'
              id='weather-stormy'
              value='stormy'
              checked={weather === 'stormy'}
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor='weather-stormy'>stormy</label>
          </div>
          <div>
            <input
              type='radio'
              id='weather-windy'
              value='windy'
              checked={weather === 'windy'}
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor='weather-windy'>windy</label>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <label htmlFor='visibility'>visibility:</label>
          <div>
            <input
              type='radio'
              id='visibility-great'
              value='great'
              checked={visibility === 'great'}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor='visibility-great'>great</label>
          </div>
          <div>
            <input
              type='radio'
              id='visibility-good'
              value='good'
              checked={visibility === 'good'}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor='visibility-good'>good</label>
          </div>
          <div>
            <input
              type='radio'
              id='visibility-ok'
              value='ok'
              checked={visibility === 'ok'}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor='visibility-ok'>ok</label>
          </div>
          <div>
            <input
              type='radio'
              id='visibility-poor'
              value='poor'
              checked={visibility === 'poor'}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor='visibility-poor'>poor</label>
          </div>
          <div>
            <input
              type='radio'
              id='visibility-unknown'
              value='unknown'
              checked={visibility === 'unknown'}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor='visibility-unknown'>unknown</label>
          </div>
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
