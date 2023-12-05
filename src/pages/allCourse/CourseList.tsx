import React from "react";
import { api } from "~/utils/api";

import courseData from "public/courseData.json";
import { useState } from "react";
import Link from "next/link";
import DebouncedSearchInput from "~/components/DebouncedSearchInput";
import { useSession } from "next-auth/react";

interface Syllabus {
  week: number;
  topic: string;
  content: string;
}

interface Course {
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: string;
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: Syllabus[];
}

const CourseList = () => {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const [courseSearchTerm, setCourseSearchTerm] = useState("");
  const [courseDataArray, setCourseDataArray] = useState<Course[]>(courseData);

  const {
    data: allCourseData,
    isLoading,
    isError,
    error,
  } = api.courseListData.getAllCourseListData.useQuery();
  console.log("allCourseData: ", allCourseData);
  const enrollCourse = api.courseListData.enrollCourseByUser.useMutation({
    onSettled: async () => {
      console.log("data added to db successfully.");
      await utils.courseListData.getAllCourseListData.invalidate();
    },
  });
  const addNewCourseDataArray =
    api.courseListData.addCourseDataArray.useMutation({
      onSettled: async () => {
        console.log("data added to db successfully.");
        await utils.courseListData.getAllCourseListData.invalidate();
      },
    });
  const handleUploadCourseListData = () => {
    console.log("courseDataArray: ", courseDataArray);
    addNewCourseDataArray.mutate(courseDataArray);
  };
  const handleSearch = (searchTerm: string) => {
    // console.log(searchTerm);
    setCourseSearchTerm(searchTerm);
  };
  const handleEnrollCourse = (courseId: string) => {
    enrollCourse.mutate({
      courseId: courseId ?? "",
      userId: sessionData?.user.id ?? "",
    });
  };
  if (isLoading) {
    return (
      <div className="custom-scrollbar h-screen overflow-auto px-6">
        <h1>loading...</h1>
      </div>
    );
  }
  return (
    <div className="custom-scrollbar h-screen overflow-auto px-6">
      {/* <button
                  className="rounded-full bg-white/10 px-2 py-1 font-semibold text-white no-underline transition hover:bg-white/20"
       onClick={handleUploadCourseListData}>add courses</button> */}
      <div className="sticky top-0 flex items-center gap-2 bg-[#2F3349] p-1">
        <h1 className="p-2 text-2xl">Courses</h1>
        <div>
          <DebouncedSearchInput onSearch={handleSearch} />
        </div>
        {/* <p>{courseSearchTerm}</p> */}
        <div className="rounded-full bg-white/10 px-2 py-1 font-semibold text-white no-underline transition hover:bg-white/20">
          <Link href={`/userDashboard/UserDashboard`}>Enrolled Coursed</Link>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 pt-2">
        {allCourseData
          ?.filter((course) => {
            const searchTermLower = courseSearchTerm.toLowerCase();
            return Object.values(course).some((value) => {
              if (Array.isArray(value)) {
                return value.some((item) =>
                  item.toLowerCase().includes(searchTermLower)
                );
              }
              return String(value).toLowerCase().includes(searchTermLower);
            });
          })
          ?.map((course) => {
            return (
              <div
                key={course.id}
                className="rounded-lg border-[1px] border-[#484D64] p-2"
              >
                <Link href={`/course/${course.id}`}>
                  <div>
                    <h1>{course.name}</h1>
                    <p>{course.description}</p>
                    <p>{course.duration}</p>
                    <p>{course.enrollmentStatus}</p>
                    <p>{course.location}</p>
                    <p>{course.instructor}</p>
                    <p>{course.prerequisites}</p>
                    <p>{course.schedule}</p>
                    <p>{course.thumbnail}</p>
                  </div>
                </Link>
                <button
                  onClick={() => handleEnrollCourse(course.id)}
                  className="rounded-full bg-white/10 px-2 py-1 font-semibold text-white no-underline transition hover:bg-white/20"
                >
                  Enroll now
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CourseList;
