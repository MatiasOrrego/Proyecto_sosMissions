export default function CategoryCard({ title }) {
  return (
    <div className="relative group overflow-hidden rounded-2xl">
      <div className="h-64 bg-gradient-to-br from-[#030c15] via-[#740620] to-[#e4012e] transition-transform duration-300 group-hover:scale-110">
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-xl font-bold text-center px-4">{title}</h3>
        </div>
      </div>
    </div>
  );
}