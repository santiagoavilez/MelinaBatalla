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
      name: "Atrae clientes comprometidos con su proceso",
      slug: "atrae-clientes-comprometidos",
      courseSlug: "root-program",
      video_id: "k2EgsbA7b7prvWAzxfk",
      description:
        "Empezarás a definir y atraer  clientes consientes y comprometidos con su transformación. Deja de maternar clientes y enfócate en aquellos que sí quieren ser ayudados.",
    },
    {
      id: 1,
      courseId: 1,
      name: "Aprende a crear contenido funcional sin sacrificar tu paz",
      slug: "crea-contenido-funcional",
      courseSlug: "root-program",
      video_id: "kg40CBwtBEUvK3AzIqk",
      description:
        "Nunca más publicar cantidades excesivas de contenido sin obtener resultados y sacrificando tu tiempo. Transforma tu deseo de ayudar a otros en una oferta irresistible que se venda fácilmente.",
    },
    {
      id: 2,
      courseId: 1,
      name: "Obtén seguridad con una estrategia clara",
      slug: "obten-seguridad",
      courseSlug: "root-program",
      video_id: "k3lR9YtRoIpcZ1AzIqo",
      description:
        "Deja de depender de recomendados o la suerte. Te comparto la estrategia para atraer clientes interesados en invertir en ti.",
    },
    {
      id: 3,
      courseId: 1,
      name: "Aprende a enfocar tu energía",
      slug: "enfoca-tu-energia",
      courseSlug: "root-program",
      video_id: "k3p5gV9qSjdyyLAzIqm",
      description:
        "Que tu energía deje de drenarse en tareas que no están alineadas a tus objetivos. Te comparto en que debes enfocar toda tu energía para obtener resultados.",
    },
    {
      id: 4,
      courseId: 1,
      name: "Salvavidas",
      slug: "salvavidas",
      video_id: "k3TqDurnx6GxZJAzIBe",
      courseSlug: "root-program",
      description:
        'En este módulo "Salvavidas" hacemos un repaso de toda la estrategia completa desde contruir tu oferta, atraer clientes comprometidos, crear contenido funcional, obtener seguridad con una estrategia clara y enfocar tu energía.',
    },
    {
      id: 5,
      courseId: 1,
      name: "Potenciador",
      slug: "potenciador",
      courseSlug: "root-program",
      video_id: "a",
      description:
        'Al adquirir el "Potenciador de Resultados", tras completar todos los módulos, obtendrás una reunión exclusiva 1:1, de 15 minutos, con Nazarena Batalla. En esta sesión, recibirás feedback personalizado para aclarar dudas y mejorar tus resultados.',
    },
  ]);

}




