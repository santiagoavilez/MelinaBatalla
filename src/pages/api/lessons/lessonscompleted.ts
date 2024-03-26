import type { APIRoute } from "astro";
import { and, db, eq, Lesson, LessonProgress } from "astro:db";

export const getLessons = async () => {
    const lessons = await db
        .select({ id: Lesson.id, name: Lesson.name, slug: Lesson.slug })
        .from(Lesson);
    return lessons;
};
export const GET: APIRoute = async ({  locals}) => {
    try {
        const { userId } = locals
        const lessonscompleted = await db
            .select()
            .from(LessonProgress)
            .where(eq(LessonProgress.userId, userId as string));

        // const lessonswithCompleted = await db.
        // select({
        //     id: Lesson.id,
        //     name: Lesson.name,
        //     slug: Lesson.slug,
        //     isCompleted: eq(LessonProgress.status, 'completado')
        // }).
        // from(Lesson).
        // leftJoin(LessonProgress, and(eq(LessonProgress.userId,userId as string),eq(LessonProgress.lessonId,Lesson.id)))

        // console.log("lessonswithCompleted", lessonswithCompleted);
        return new Response(JSON.stringify({
            lessons: lessonscompleted,
        })
        )
    }
    catch (error) {
         console.log('Error:', error);
        return new Response(JSON.stringify({
            error: error
        }), {
            status: 500,
            statusText: 'server error'
        });
    }
}

