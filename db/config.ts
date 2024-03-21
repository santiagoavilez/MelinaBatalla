import { column, defineDb, defineTable } from 'astro:db';
const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text({ unique: true}),
    firstName: column.text(),
    lastName: column.text(),
    password: column.text(),
    LessonsCompleted: column.number({ references() {
      return Lessons.columns.id
    }}),
    coursesEnrolled: column.number({ references: () => Courses.columns.id}),
    coursesCompleted: column.number({ references: () => Courses.columns.id}),
  }
})


export const Courses = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true, autoIncrement: true, optional: false}),
    slug: column.text({ unique: true, optional: false }),
    name: column.text({optional: false}),

    description: column.text({optional: false}),
  }
})

const Lessons = defineTable({
  columns: {
    id: column.number({ primaryKey: true , unique: true}),
    courseId: column.number({references: () => Courses.columns.id}),
    courseSlug: column.text({references: () => Courses.columns.slug}),
    name: column.text(),
    slug: column.text(),
    description: column.text(),
  }
})




const LessonsCompleted = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.number({references: () => Users.columns.id}),
    lessonId: column.number({references: () => Lessons.columns.id}),
  }
})


const CoursesCompleted = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.number({references: () => Users.columns.id}),
    courseId: column.number({references: () => Courses.columns.id}),
  }
})

const Enrollments = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    courseId: column.number({references: () => Courses.columns.id}),
    userId: column.number({references: () => Users.columns.id}),
  }
})



// https://astro.build/db/config
const db = defineDb({
  tables: {
    Users,
    Courses,
    Lessons,
    Enrollments,
    CoursesCompleted,
    LessonsCompleted
  }
});


export default db;
