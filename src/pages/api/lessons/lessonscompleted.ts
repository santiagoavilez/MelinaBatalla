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
        //  console.log("lessonscompleted", lessonscompleted);
        const lessons = await getLessons();

        const progressMap = new Map(lessonscompleted.map(lp => [lp.lessonId, lp]));

        // Agrega el campo isCompleted a las lecciones

        const lessonsWithProgress = lessons.map(lesson => ({
            ...lesson,
            isCompleted: progressMap.has(lesson.id)
        }));

        const lessonswithCompleted = await db.
        selectDistinct({
            id: Lesson.id,
            name: Lesson.name,
            slug: Lesson.slug,
            isCompleted: LessonProgress.status
        }).
        from(Lesson).
        leftJoin(LessonProgress, and(eq(LessonProgress.userId,userId as string),eq(LessonProgress.lessonId,Lesson.id)))

        console.log("lessonswithCompleted", lessonswithCompleted);
        return new Response(JSON.stringify({
            lessons: lessonsWithProgress,
        })
        )
    }
    catch (error) {
        // console.error('Error:', error);
        return new Response(JSON.stringify({
            error: error
        }), {
            status: 500,
            statusText: 'server error'
        });
    }
}

