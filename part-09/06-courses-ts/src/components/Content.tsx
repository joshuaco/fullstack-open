import { CoursePart } from '../vite-env';

interface ContentProps {
  courses: CoursePart[];
}

function Content(prop: ContentProps) {
  return (
    <main>
      {prop.courses.map((course) => (
        <div key={course.name}>
          <p>
            {course.name} {course.exerciseCount}
          </p>
        </div>
      ))}
    </main>
  );
}

export default Content;
