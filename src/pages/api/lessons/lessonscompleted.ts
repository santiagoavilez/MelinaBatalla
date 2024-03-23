import type { APIRoute } from "astro";
import { db, eq, LessonProgress } from "astro:db";


export const GET: APIRoute = async ({  locals}) => {
    try {
        const { userId } = locals
        const lessonscompleted = await db
            .select()
            .from(LessonProgress)
            .where(eq(LessonProgress.userId, userId as string));
        //  console.log("lessonscompleted", lessonscompleted);
        return new Response(JSON.stringify({
            lessonscompleted: lessonscompleted
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

