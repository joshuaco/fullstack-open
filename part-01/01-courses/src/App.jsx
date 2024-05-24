import { courses } from './mocks/courses';
import Course from './components/Course';
import './App.css';

const App = () => {
  return (
    <>
      <header>
        <h1>Web Development Curriculum</h1>
      </header>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};

export default App;
