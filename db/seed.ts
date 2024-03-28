import { db, Course, Lesson } from 'astro:db';


// https://astro.build/db/seed
export default async function seed() {
	// TODO

	await db.insert(Course).values([{
		id: 1,
		name: 'Root Program',
		slug: 'root-program',
		description: 'este es un curso.'
	}])

	await db.insert(Lesson).values([
		{
			id: 0,
			courseId: 1,
			name: 'Atrae clientes comprometidos con su proceso',
			slug: 'atrae-clientes-comprometidos',
			courseSlug: 'root-program',
			video_id: '157078f4-55dd-48fd-8fee-02ce9d9efb2a',
			description: 'Empezarás a definir y atraer clientes clientes consientes y comprometidos con su transformación. Deja de maternar clientes y enfocate en aquellos que si quieres ser ayudados.'
		},
		{
			id: 1,
			courseId: 1,
			name: 'Aprende a crear contenido funcional sin sacrificar tu paz',
			slug: 'crea-contenido-funcional',
			courseSlug: 'root-program',
			video_id: '6c12a662-2f97-4619-99ca-c12dc749c496',
			description: 'Nunca más publicar cantidades excesivas de contenido sin obtener resultados y sacrificando tu tiempo. Transforma tu deseo de ayudar a otros en una oferta irresistible que se venda fácilmente.'
		},
		{
			id: 2,
			courseId: 1,
			name: 'Obtén seguridad con una estrategia clara',
			slug: 'obten-seguridad',
			courseSlug: 'root-program',
			video_id: 'dd5b01c6-7991-46ea-8fea-422d1e6e4dc8',
			description: 'Deja de depender de recomendados o la suerte. Te comparto la estrategia para atraer clientes interesados en invertir en ti.'
		},
		{
			id: 3,
			courseId: 1,
			name: 'Aprende a enfocar tu energía',
			slug: 'enfoca-tu-energia',
			courseSlug: 'root-program',
			video_id: '422a4efc-df65-4e4d-bd82-bcbf49733630',
			description: 'Que tu energía deje de drenarse en tareas que no están alineadas a tus objetivos. Te comparto en que debes enfocar toda tu energía para obtener resultados.'
		},
		{
			id: 4,
			courseId: 1,
			name: 'Salvavidas',
			slug: 'salvavidas',
			video_id: 'e215758c-39a4-4aa3-9a4e-0a15aa46ab19',
			courseSlug: 'root-program',
			description: 'En este módulo "Salvavidas" hacemos un repaso de toda la estrategia completa desde contruir tu oferta, atraer clientes comprometidos, crear contenido funcional, obtener seguridad con una estrategia clara y enfocar tu energía.'
		},
		{
			id: 5,
			courseId: 1,
			name: 'Potenciador',
			slug: 'potenciador',
			courseSlug: 'root-program',
			video_id: 'a',
			description: 'Al adquirir el "Potenciador de Resultados", tras completar todos los módulos, obtendrás una reunión exclusiva 1:1, de 15 minutos, con Nazarena Batalla. En esta sesión, recibirás feedback personalizado para aclarar dudas y mejorar tus resultados.'
		},

	])

}




