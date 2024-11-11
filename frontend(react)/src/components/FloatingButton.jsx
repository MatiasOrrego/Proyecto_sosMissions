export default function FloatingButton({ href, icon: Icon }) {
  return (
    <a
      href={href}
      className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
    >
      <Icon className="w-6 h-6" />
    </a>
  );
}