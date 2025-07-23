
import React, { useState } from "react";

function LessonViewer() {
  const [activeTab, setActiveTab] = useState("aula");

  return (
    <div className="p-4">
      <div className="aspect-video mb-4 bg-black text-white flex items-center justify-center">
        <p>Vídeo da Aula Aqui</p>
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "aula" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("aula")}
        >
          Sobre esta aula
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "professor" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("professor")}
        >
          Sobre o professor
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "material" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("material")}
        >
          Material de apoio
        </button>
      </div>

      {activeTab === "aula" && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">Resumo da Aula</h2>
          <p className="text-gray-700">
            Esta aula aborda técnicas de estudo eficazes para concursos públicos...
          </p>
        </div>
      )}
      {activeTab === "professor" && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">Sobre o Professor</h2>
          <p className="text-gray-700">
            Prof. João Silva é especialista em concursos há mais de 10 anos...
          </p>
        </div>
      )}
      {activeTab === "material" && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">Material de Apoio</h2>
          <a href="/material-aula-01.pdf" className="text-blue-600 underline">
            Baixar PDF da Aula
          </a>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Comentários de Alunos</h3>
        <div className="space-y-2">
          <div className="p-3 bg-gray-100 rounded">"Essa aula foi excelente!"</div>
          <div className="p-3 bg-gray-100 rounded">"Gostei do resumo no início."</div>
        </div>
      </div>
    </div>
  );
}

export default LessonViewer;
