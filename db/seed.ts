import { db, Courses, Lessons } from 'astro:db';


// https://astro.build/db/seed
export default async function seed() {
	// TODO

	await db.insert(Courses).values([{
		id: 1,
		name: 'Root Program',
		slug: 'root-program',
		description: 'este es un curso.'
	}])

	await db.insert(Lessons).values([
		{
			id: 1,
			courseId: 1,
			name: 'Atrae clientes comprometidos con su proceso',
			slug: 'atrae-clientes-comprometidos',
			courseSlug: 'root-program',
			description: 'Empezarás a definir y atraer clientes clientes consientes y comprometidos con su transformación. Deja de maternar clientes y enfocate en aquellos que si quieres ser ayudados.'
		},
		{
			id: 2,
			courseId: 1,
			name: 'Aprende a crear contenido funcional sin sacrificar tu paz',
			slug: 'crea-contenido-funcional',
			courseSlug: 'root-program',

			description: 'Nunca más publicar cantidades excesivas de contenido sin obtener resultados y sacrificando tu tiempo. Transforma tu deseo de ayudar a otros en una oferta irresistible que se venda fácilmente.'
		},
		{
			id: 3,
			courseId: 1,
			name: 'Obtén seguridad con una estrategia clara',
			slug: 'obten-seguridad',
			courseSlug: 'root-program',
			description: 'Deja de depender de recomendados o la suerte. Te comparto la estrategia para atraer clientes interesados en invertir en ti.'
		},
		{
			id: 4,
			courseId: 1,
			name: 'Aprende a enfocar tu energía',
			slug: 'enfoca-tu-energia',
			courseSlug: 'root-program',
			description: 'Que tu energía deje de drenarse en tareas que no están alineadas a tus objetivos. Te comparto en que debes enfocar toda tu energía para obtener resultados.'
		},
		// {
		// 	id: 5,
		// 	courseId: 1,
		// 	name: 'Atrae clientes comprometidos con su proceso',
		// 	slug: 'atrae-clientes-comprometidos',
		// 	description: 'Empezarás a definir y atraer clientes clientes consientes y comprometidos con su transformación. Deja de maternar clientes y enfocate en aquellos que si quieres ser ayudados.'
		// }
	])

}




