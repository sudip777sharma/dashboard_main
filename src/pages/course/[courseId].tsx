import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const Course = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const {
    data: courseData,
    isLoading,
    isError,
    error,
  } = api.courseListData.getCourseDataByCourseId.useQuery({
    courseId: courseId as string,
  });
  const disenrollCourse = api.courseListData.disenrollCourseByuser.useMutation({
    onSettled: async () => {
      console.log("sucessfully disenrolled");
      await utils.courseListData.getCoursesEnrolledByUser.invalidate();
    },
  });
  const handleDisenrollCourse = () => {
    disenrollCourse.mutate({
      courseId: courseId as string,
      userId: sessionData?.user.id ?? "",
    });
  };
  if (isLoading) {
    return (
      <div className="px-6">
        <h1>loading...</h1>
      </div>
    );
  }
  return (
    <div className="px-6">
      <h1>{courseData?.name}</h1>
      <p>{courseData?.description}</p>
      <p>{courseData?.duration}</p>
      <p>{courseData?.enrollmentStatus}</p>
      <p>{courseData?.location}</p>
      <p>{courseData?.instructor}</p>
      <p>{courseData?.prerequisites}</p>
      <p>{courseData?.schedule}</p>
      <p>{courseData?.thumbnail}</p>
    </div>
  );
};

export default Course;
