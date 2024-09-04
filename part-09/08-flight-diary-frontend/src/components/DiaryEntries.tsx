import { DiaryEntry } from '../types';

interface DiaryEntriesProps {
  diaries: DiaryEntry[];
}

function DiaryEntries({ diaries }: DiaryEntriesProps) {
  return (
    <>
      <h3>My diary entries</h3>

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
          <p>{diary.comment}</p>
        </div>
      ))}
    </>
  );
}

export default DiaryEntries;
