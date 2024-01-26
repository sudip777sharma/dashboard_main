import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import SingleHorizontalBar from "~/components/Charts/ApexCharts/SingleHorizontalBar";
import { api } from "~/utils/api";

const UserDashboard = () => {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  // console.log(sessionData?.user.email);
  const {
    data: enrolledCourseList,
    isLoading,
  } = api.courseListData.getCoursesEnrolledByUser.useQuery({
    userId: sessionData?.user.id ?? "",
  });

  const disenrollCourse = api.courseListData.disenrollCourseByuser.useMutation({
    onSettled: async () => {
      console.log("sucessfully disenrolled");
      await utils.courseListData.getCoursesEnrolledByUser.invalidate();
    },
  });
  const handleDisenrollCourse = (courseId: string) => {
    disenrollCourse.mutate({
      courseId: courseId ?? "",
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
      <h1 className="text-2xl">Enrolled courses</h1>
      <div className="grid grid-cols-3 gap-6 pt-2">
        {enrolledCourseList?.map((course) => {
          return (
            <div
              key={course?.id}
              className="rounded-lg border-[1px] border-[#484D64] p-2"
            >
              <Link href={`/course/${course?.id}`}>
                <div>
                  <h1>{course?.name}</h1>
                  <p>{course?.description}</p>
                  <p>{course?.duration}</p>
                  <SingleHorizontalBar
                    barColor="#00CFE8"
                    percentage={Math.round(Math.random() * 80)}
                    backgroundColor="#2B3F55"
                    name="Completed"
                    barWidth="8px"
                  />
                  <p>{course?.enrollmentStatus}</p>
                  <p>{course?.location}</p>
                  <p>{course?.instructor}</p>
                  <p>{course?.prerequisites}</p>
                  <p>{course?.schedule}</p>
                  <p>{course?.thumbnail}</p>
                </div>
              </Link>
              <button
                onClick={() => handleDisenrollCourse(course?.id ?? "")}
                className="rounded-full bg-white/10 px-2 py-1 font-semibold text-white no-underline transition hover:bg-white/20"
              >
                Disenroll now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;
