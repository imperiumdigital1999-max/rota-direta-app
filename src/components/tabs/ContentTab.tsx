
import React, { useState } from "react";

const mockLessons = [
  {
    id: 1,
    title: "Como montar um plano de estudos eficiente",
    professor: "Prof. João Silva",
    description: "Aprenda a estruturar seu plano de estudos com foco em concursos públicos.",
  },
  {
    id: 2,
    title: "Português para concursos: interpretação de texto",
    professor: "Profa. Maria Oliveira",
    description: "Técnicas práticas para interpretar textos e acertar mais questões.",
  },
];

function ContentTab() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Aulas Disponíveis</h2>
      <ul className="space-y-2">
        {mockLessons.map((lesson) => (
          <li
            key={lesson.id}
            className="p-4 bg-white rounded shadow cursor-pointer hover:bg-blue-50"
            onClick={() => setSelectedLesson(lesson)}
          >
            <h3 className="text-lg font-semibold">{lesson.title}</h3>
            <p className="text-sm text-gray-600">Clique para ver mais</p>
          </li>
        ))}
      </ul>

      {selectedLesson && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-bold">{selectedLesson.title}</h3>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Professor:</strong> {selectedLesson.professor}
          </p>
          <p className="text-gray-600">{selectedLesson.description}</p>
        </div>
      )}
    </div>
  );
}

export default ContentTab;
