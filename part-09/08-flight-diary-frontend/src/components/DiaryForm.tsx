import { useState } from 'react';
import { DiaryEntry, Visibility, Weather } from '../types';
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
          {Object.values(Weather).map((weatherValue) => (
            <div key={weatherValue}>
              <input
                type='radio'
                id={`weather-${weatherValue}`}
                value={weatherValue}
                checked={weather === weatherValue}
                onChange={(e) => setWeather(e.target.value)}
              />
              <label htmlFor={`weather-${weatherValue}`}>{weatherValue}</label>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <label htmlFor='visibility'>visibility:</label>
          {Object.values(Visibility).map((visibilityValue) => (
            <div key={visibilityValue}>
              <input
                type='radio'
                id={`visibility-${visibilityValue}`}
                value={visibilityValue}
                checked={visibility === visibilityValue}
                onChange={(e) => setVisibility(e.target.value)}
              />
              <label htmlFor={`visibility-${visibilityValue}`}>
                {visibilityValue}
              </label>
            </div>
          ))}
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
