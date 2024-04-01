
// Array con las frases
const frases = [
    '“No hay que ir para atrás ni para darse impulso”. Lao Tsé.',
    '“La pregunta no es quién me va a dejar; es quién va a detenerme”. Ayn Rand',
    '“Si no puedes volar, corre; si no puedes correr, camina; si no puedes caminar, gatea, pero sigue avanzando hacia tu meta". Martin Luther King',
    '“Sal y haz algo. No es tu habitación la que es una prisión, eres tú mismo”. Silvia Plath',
    '“El éxito es la suma de pequeños esfuerzos repetidos un día sí y otro también”. Robert Collier',
    '“Si quieres el arcoíris, tienes que aguantar la lluvia”. Dolly Parton.',
    '“La vida es un 10% lo que me pasa y un 90% cómo reacciono a ello”. Charles Swindoll',
    '“Si tienes todo bajo control, no te estás moviendo lo suficientemente rápido”.Mario Andretti.',
    '“No hay atajos para ningún lugar al que valga la pena ir”. Beverly Sills.',
    '“Cuando era niño soñaba, pero dejé de soñar y empecé a hacer, porque es el poder de lo que se realiza lo que vuelve los sueños realidad”. Usain Bolt',
    '“Si tienes miedo de fallar, probablemente falles”. Kobe Bryant.',
    '“Todo lo que se puede imaginar es real”. Pablo Picasso.',
    '“Si la oportunidad no llama, construye una puerta”. Milton Berle.',
    '“Demasiada gente no vive sus sueños porque está ocupada viviendo sus miedos”. Les Brown.',
    '“Lo más difícil es la decisión de actuar, el resto es meramente tenacidad”. Amelia Earhart.',
    '“No esperes. Nunca va a ser el momento adecuado”. Napoleon Hill.',
    '“El mejor momento del día es ahora”. Pierre Bonnard.',
    '“El poder no se te da, lo tienes que coger”. Beyoncé.',
    '“Haz lo que tienes que hacer, hay personas esperando tu ayuda”. Melina Nazarena Batalla.',
    '“Haz lo que tienes que hacer, hay personas esperando tu ayuda”. Melina Nazarena Batalla.',
    '“Haz lo que tienes que hacer, hay personas esperando tu ayuda”. Melina Nazarena Batalla.',
    '“Haz lo que tienes que hacer, hay personas esperando tu ayuda”. Melina Nazarena Batalla.',
    '“Sé el cambio que deseas ver en el mundo”. Mahatma Gandhi.',
    '“La mejor manera de empezar algo es dejar de hablar de ello y hacerlo”. Walt Disney.',
    '“Nunca puedes dejar huellas que duren si siempre estás caminando de puntillas”. Leymah Gbowee.',
    '“Si tienes todo bajo control, no te estás moviendo lo suficientemente rápido”. Mario Andretti.',
    '“A veces te subes a la cama por las mañanas y piensas: "no voy a lograrlo". Pero te ríes por dentro, recordando todas las veces que te has sentido de esa manera.”  Charles Bukowski.',
    // Aquí añadir el resto de las frases...
];

// Array con los títulos motivadores
const titulosMotivadores = [
    "¡Sigue adelante 🧘‍♀️!",
    "¡Nunca te rindas ✨!",
    "¡Tú puedes lograrlo ✨!",
    "¡Sé tu mejor versión ✨!",
    "¡Sigue luchando 🥊!",
    "¡El éxito está cerca 💪!",
    "¡No pares ahora ✨!",
    "¡No te rindas ahora!",
    "¡Sigue brillando ✨!",
    // Aquí añadir más títulos motivadores...
];

// Obtener una frase aleatoria del array de frases

export const getFraseAleatoria = () => {
    return frases[Math.floor(Math.random() * frases.length)];
}

export const getTituloAleatorio = () => {
    return titulosMotivadores[Math.floor(Math.random() * titulosMotivadores.length)];
}
// Obtener un título motivador aleatorio del array de títulos motivadores

// Mostrar el toast con la frase aleatoria y el título motivador

