import { column, defineDb, defineTable } from 'astro:db';
export const Course = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true, autoIncrement: true, optional: false }),
    slug: column.text({ unique: true, optional: false }),
    name: column.text({ optional: false }),
    description: column.text({ optional: false }),
  }
})

const Lesson = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true }),
    courseId: column.number({ references: () => Course.columns.id }),
    courseSlug: column.text({ references: () => Course.columns.slug }),
    name: column.text(),
    slug: column.text({unique: true}),
    description: column.text(),
  }
})

const LessonProgress = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.text(),
    lessonId: column.number({ references: () => Lesson.columns.id }),
    lessonSlug: column.text({ references: () => Lesson.columns.slug }),
    status: column.text(), // Add this line
  }
})


const Enrollment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    courseId: column.number({ references: () => Course.columns.id }),
    userId: column.text(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Course,
    Lesson,
    Enrollment,
    LessonProgress
  }
});



