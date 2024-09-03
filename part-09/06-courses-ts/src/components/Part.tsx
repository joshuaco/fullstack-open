import { CoursePart } from '../types';

interface PartProps {
  course: CoursePart;
}

function Part({ course }: PartProps) {
  switch (course.kind) {
    case 'basic':
      return (
        <p>
          <em>{course.description}</em>
        </p>
      );
    case 'group':
      return <p>Project exercises: {course.groupProjectCount}</p>;
    case 'background':
      return (
        <>
          <p>
            <em>{course.description}</em>
          </p>
          <a href={course.backgroundMaterial} target='_blank'>
            {course.backgroundMaterial}
          </a>
        </>
      );
    case 'special':
      return (
        <>
          <p>
            <em>{course.description}</em>
          </p>
          <p>required skills: {course.requirements.join(', ')}</p>
        </>
      );
    default:
      return;
  }
}

export default Part;
