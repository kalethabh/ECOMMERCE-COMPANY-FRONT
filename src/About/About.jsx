function About() {
  const developers = [
    {
      name: 'Kaleth Benjumea Hernandez',
      role: 'Desarrollador Frontend/Backend',
      git: 'https://github.com/kalethabh',
      linkedin:
        'https://www.linkedin.com/in/kaleth-alexander-benjumea-hern%C3%A1ndez-full-stack-developer/',
    },
    {
      name: 'Harlem Hernandez Rodriguez',
      role: 'Desarrollador Backend',
      git: 'https://github.com/harlem17',
      linkedin:
        'https://www.linkedin.com/in/harlem-hernandez-rodr%C3%ADguez-7904b6297/',
    },
    {
      name: 'Camila Andrea Lozano Valle',
      role: 'Diseñadora UX/UI',
      git: 'https://github.com/CamilaLozanoValle',
      linkedin: '',
    },
  ];

  const linkStyle = {
    color: 'blue',
    textDecoration: 'underline',
  };

  return (
    <div className="flex justify-center mt-4 lg:mt-1">
      <div className="bg-white p-6 rounded-lg shadow-2xl overflow-auto md:h-[100rem] lg:h-[32rem] md:w-[45em] lg:w-[75em] w-[22em] max-h-[38rem] md:max-h-[41rem] lg:max-h-[35rem]">
        <h1 className="text-xl md:text-3xl lg:text-3xl font-bold mb-4">
          Acerca de nuestra organización sin fines de lucro
        </h1>
        <p className="text-gray-700 md:text-lg lg:text-lg text-sm">
          Somos una organización sin fines de lucro comprometida con la mejora de la comunidad y la causa que defendemos.
          Nuestra misión es mejorar la calidad de vida de las personas y promover el bienestar en todas las áreas de la sociedad.
        </p>
        <p className="text-gray-700 md:text-lg lg:text-lg text-sm mt-4">
          Trabajamos incansablemente para lograr un impacto positivo en la vida de las personas a través de nuestros proyectos y programas.
          Creemos en la importancia de la educación, la igualdad, la sostenibilidad y el apoyo a quienes más lo necesitan.
        </p>
        <p className="text-gray-700 md:text-lg lg:text-lg text-sm mt-4">
          Nuestra organización ha estado bastante activa, durante todo este tiempo hemos logrado impactar positivamente a miles de personas en la comunidad.
          Estamos comprometidos con la transparencia y la rendición de cuentas en todo lo que hacemos.
        </p>
        <h1 className="mt-6 md:mt-4 text-md lg:text-lg font-bold">DESARROLLADORES</h1>
        <ul className="list-disc list-inside mt-2">
          {developers.map((developer, index) => (
            <li key={index} className="text-gray-700 md:text-lg lg:text-lg text-sm">
              {developer.name} - {developer.role} -{' '}
              <a href={developer.git} style={linkStyle} target="_blank" rel="noopener noreferrer">
                git
              </a>{' '}
              -{' '}
              <a href={developer.linkedin} style={linkStyle} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          ))}
        </ul>
        <p className="text-gray-700 text-sm md:text-lg lg:text-lg mt-4 lg:mt-2">
          Tu apoyo y participación son fundamentales para lograr nuestros objetivos. ¡Únete a nosotros en nuestra misión y juntos haremos del mundo un lugar mejor!
        </p>
      </div>
    </div>
  );
}

export default About;
