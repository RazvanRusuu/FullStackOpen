import { assertNever } from "../helpers/helpers";
import { CoursePart } from "../types";

const Part = ({ course }: { course: CoursePart }) => {
  let content: React.ReactNode;

  switch (course.kind) {
    case "basic":
      content = (
        <p>
          {course.name} {course.description} {course.exerciseCount}{" "}
          {course.kind}
        </p>
      );
      break;
    case "group":
      content = (
        <p>
          {course.name} {course.groupProjectCount} {course.exerciseCount}{" "}
          {course.kind}
        </p>
      );
      break;
    case "background":
      content = (
        <p>
          {course.name} {course.backgroundMaterial} {course.exerciseCount}{" "}
          {course.kind}
        </p>
      );
      break;
    default:
      content = assertNever(course);
  }

  return <div>{content}</div>;
};

export default Part;
