import React, { useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Heart,
  Brain,
  Lungs,
  Activity,
  Timer,
  Medal
} from 'lucide-react';

const MedicalSurveys = () => {
  // Simular categorías de encuestas
  const categories = [
    { id: 'cardio', name: 'Cardiología', icon: <Heart /> },
    { id: 'neuro', name: 'Neurología', icon: <Brain /> },
    { id: 'respiratorio', name: 'Sistema Respiratorio', icon: <Lungs /> },
    { id: 'emergencias', name: 'Emergencias Médicas', icon: <Activity /> }
  ];

  // Simular datos de encuestas
  const [surveys] = useState([
    {
      id: 1,
      title: "Evaluación de Síntomas Cardíacos",
      category: "cardio",
      author: "Dr. García",
      specialty: "Cardiología",
      duration: "10 min",
      questionsCount: 15, // Cambié "questions" a "questionsCount" para evitar duplicados
      difficulty: "Intermedio",
      completions: 324,
      avgScore: 78,
      description: "Identifica y evalúa correctamente los síntomas cardíacos más comunes.",
      progress: 0,
      questions: [
        {
          id: 1,
          text: "¿Cuál de los siguientes es un síntoma común de infarto?",
          options: [
            "Dolor en el pecho que se irradia al brazo",
            "Dolor de cabeza leve",
            "Dolor en las piernas",
            "Visión borrosa"
          ],
          correctAnswer: 0
        },
        // Más preguntas...
      ]
    },
    {
      id: 2,
      title: "Reconocimiento de Emergencias Neurológicas",
      category: "neuro",
      author: "Dra. Rodríguez",
      specialty: "Neurología",
      duration: "15 min",
      questionsCount: 20, // Cambié "questions" a "questionsCount" para evitar duplicados
      difficulty: "Avanzado",
      completions: 156,
      avgScore: 72,
      description: "Aprende a identificar signos de emergencias neurológicas.",
      progress: 60,
      questions: [
        // Preguntas...
      ]
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSurvey, setCurrentSurvey] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  // Filtrar encuestas
  const filteredSurveys = surveys.filter(survey => {
    const matchesCategory = selectedCategory === 'all' || survey.category === selectedCategory;
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Componente de la encuesta activa
  const ActiveSurvey = ({ survey, onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [timer, setTimer] = useState(0);

    const handleAnswer = (optionIndex) => {
      const newAnswers = [...answers, optionIndex];
      setAnswers(newAnswers);

      if (currentQuestion < survey.questions.length - 1) {
        setCurrentQuestion(curr => curr + 1);
      } else {
        calculateScore(newAnswers);
        setShowResults(true);
      }
    };

    const calculateScore = (userAnswers) => {
      const correctAnswers = survey.questions.map(q => q.correctAnswer);
      const score = userAnswers.reduce((acc, curr, idx) => {
        return acc + (curr === correctAnswers[idx] ? 1 : 0);
      }, 0);

      const finalScore = (score / survey.questions.length) * 100;
      
      // Actualizar progreso del usuario
      setUserProgress(prev => ({
        ...prev,
        [survey.id]: {
          completed: true,
          score: finalScore,
          date: new Date().toISOString()
        }
      }));
    };

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{survey.title}</CardTitle>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Pregunta {currentQuestion + 1} de {survey.questions.length}
                </div>
                <Timer className="text-gray-500" />
              </div>

              <Progress 
                value={(currentQuestion / survey.questions.length) * 100} 
                className="w-full"
              />

              <div className="py-4">
                <h3 className="text-lg font-medium mb-4">
                  {survey.questions[currentQuestion].text}
                </h3>

                <div className="space-y-3">
                  {survey.questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full text-left p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="inline-block p-4 bg-green-100 rounded-full">
                <Award className="h-12 w-12 text-green-500" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold">
                  ¡Encuesta Completada!
                </h3>
                <p className="text-gray-600 mt-2">
                  Has obtenido una puntuación de:
                </p>
                <div className="text-4xl font-bold text-green-500 mt-2">
                  {userProgress[survey.id]?.score.toFixed(1)}%
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Volver a la biblioteca
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {!currentSurvey ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Encuestas Médicas Interactivas</h1>
              <p className="text-gray-600">
                Evalúa tus conocimientos médicos con encuestas verificadas por profesionales
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {categories.map(category => (
              <Card
                key={category.id}
                className={`cursor-pointer hover:shadow-lg transition-shadow ${
                  selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="flex items-center gap-3 p-4">
                  {category.icon}
                  <span className="font-medium">{category.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar encuestas..."
              className="w-full p-3 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurveys.map(survey => (
              <Card 
                key={survey.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setCurrentSurvey(survey)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{survey.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {survey.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      {survey.duration}
                      <BookOpen size={16} className="ml-2" />
                      {survey.questionsCount} preguntas
                    </div>

                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        {survey.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {categories.find(c => c.id === survey.category)?.name}
                      </Badge>
                    </div>

                    {userProgress[survey.id] ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tu progreso</span>
                          <span className="font-medium">
                            {userProgress[survey.id].score.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={userProgress[survey.id].score} className="w-full" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Medal size={16} />
                        Promedio: {survey.avgScore}%
                        <CheckCircle2 size={16} className="ml-2" />
                        {survey.completions} completadas
                      </div>
                    )}

                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <div className="font-medium">{survey.author}</div>
                          <div className="text-gray-500">{survey.specialty}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <ActiveSurvey 
          survey={currentSurvey} 
          onClose={() => setCurrentSurvey(null)}
        />
      )}
    </div>
  );
};

export default MedicalSurveys;