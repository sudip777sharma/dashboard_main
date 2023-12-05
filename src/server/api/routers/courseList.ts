import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const courseDataArraySchema = z.array(
  z.object({
    name: z.string(),
    instructor: z.string(),
    description: z.string(),
    enrollmentStatus: z.string(),
    thumbnail: z.string(),
    duration: z.string(),
    schedule: z.string(),
    location: z.string(),
    prerequisites: z.array(z.string()),
    syllabus: z.array(
      z.object({
        week: z.number(),
        topic: z.string(),
        content: z.string(),
      })
    ),
  })
);

export const courseDataArrayRouter = createTRPCRouter({
  addCourseDataArray: publicProcedure
    .input(courseDataArraySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("input: ", input);
        // Iterate over the input array and create courses one by one
        const createdCourses = await Promise.all(
          input.map(async (course) => {
            // Extract syllabus from the course object
            const { syllabus, ...courseWithoutSyllabus } = course;

            // Create the course without syllabus
            const createdCourse = await ctx.prisma.course.create({
              data: {
                ...courseWithoutSyllabus,
              },
            });

            // Extract courseId from the created course
            const { id: courseId } = createdCourse;

            // Create syllabus entries for the created course
            const createdSyllabusEntries = await Promise.all(
              syllabus.map((entry) =>
                ctx.prisma.syllabus.create({
                  data: {
                    ...entry,
                    course: {
                      connect: { id: courseId },
                    },
                  },
                })
              )
            );

            // Return the created course with syllabus entries
            return {
              ...createdCourse,
              syllabus: createdSyllabusEntries,
            };
          })
        );

        return createdCourses;
      } catch (error) {
        console.log(error);
      }
    }),
  enrollCourseByUser: publicProcedure
    .input(z.object({ userId: z.string(), courseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // const { userId, courseId } = input;
        const user = await ctx.prisma.user.findUnique({
          where: { id: input.userId },
        });
        const course = await ctx.prisma.course.findUnique({
          where: { id: input.courseId },
        });

        if (!user || !course) {
          // Handle case where user or course doesn't exist
          return null;
        }

        // Create an entry in the EnrolledCourse table
        const enrolledCourse = await ctx.prisma.enrolledCourse.create({
          data: {
            userId: input.userId,
            courseId: input.courseId,
          },
        });

        // Optionally, update the enrolledCourses field in User model
        await ctx.prisma.user.update({
          where: { id: input.userId },
          data: {
            enrolledCourses: {
              connect: {
                id: enrolledCourse.id,
              },
            },
          },
        });

        // Optionally, update the enrolledUsers field in Course model
        await ctx.prisma.course.update({
          where: { id: input.courseId },
          data: {
            enrolledUsers: {
              connect: {
                id: enrolledCourse.id,
              },
            },
          },
        });

        return enrolledCourse;
      } catch (error) {
        console.log(error);
      }
    }),

  disenrollCourseByuser: publicProcedure
    .input(z.object({ userId: z.string(), courseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // const { userId, courseId } = input;
        const { userId, courseId } = input;
        const user = await ctx.prisma.user.findUnique({
          where: { id: userId },
        });
        const course = await ctx.prisma.course.findUnique({
          where: { id: courseId },
        });

        if (!user || !course) {
          // Handle case where user or course doesn't exist
          return null;
        }
        // Use Prisma to delete the enrolled course based on userId and courseId
        const deletedEnrolledCourse = await ctx.prisma.enrolledCourse.delete({
          where: {
            userId_courseId: {
              userId,
              courseId,
            },
          },
        });

        // Return the deleted enrolled course
        return deletedEnrolledCourse;
      } catch (error) {
        console.log(error);
      }
    }),
  getAllCourseListData: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.course.findMany();
  }),
  getCoursesEnrolledByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const { userId } = input; // Assuming userEmail is provided in the input

        // Retrieve courses enrolled by the user with userEmail
        const enrolledCoursesByUserId =
          await ctx.prisma.enrolledCourse.findMany({
            where: { userId: userId },
          });

        const enrolledCoursesData = await Promise.all(
          enrolledCoursesByUserId.map((enrolledCourse) => {
            return ctx.prisma.course.findUnique({
              where: { id: enrolledCourse.courseId },
            });
          })
        );
        return enrolledCoursesData;
      } catch (error) {
        console.error(error);
      }
    }),

  getCourseDataByCourseId: publicProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const { courseId } = input;
        const courseData = await ctx.prisma.course.findUnique({
          where: {
            id: courseId,
          },
          include: {
            syllabus: true,
            enrolledUsers: true,
          },
        });

        return courseData;
      } catch (error) {
        console.log(error);
      }
    }),
});
