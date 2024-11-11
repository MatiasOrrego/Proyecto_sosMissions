export default function FeatureCard({ title, description }) {
  return (
    <div className="bg-gradient-to-br from-[#030c15] via-[#1a1a2e] to-[#0a0a14] rounded-3xl overflow-hidden transition-transform hover:scale-105 p-8">
      <div className="h-48 bg-gradient-to-br from-[#030c15] via-[#740620] to-[#e4012e] rounded-2xl mb-6"></div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}