import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courses: CoursePart[];
}

function Content(prop: ContentProps) {
  return (
    <main>
      {prop.courses.map((course) => (
        <div key={course.name} style={{ marginBottom: '24px' }}>
          <p style={{ fontWeight: 'bolder' }}>
            {course.name} {course.exerciseCount}
          </p>
          <Part course={course} />
        </div>
      ))}
    </main>
  );
}

export default Content;
