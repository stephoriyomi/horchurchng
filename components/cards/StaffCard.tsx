interface Staff {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export function StaffCard({ name, role, bio }: Staff) {
  return (
    <div className="text-center">
      {/* Photo placeholder */}
      <div
        className="w-28 h-28 rounded-full bg-warm-gray-200 mx-auto mb-4 overflow-hidden"
        aria-hidden
      >
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-warm-gray-200 to-warm-gray-300">
          <span className="text-warm-gray-400 text-3xl font-display font-bold select-none">
            {name.charAt(0)}
          </span>
        </div>
      </div>

      <h3 className="font-display font-bold text-xl text-off-black mb-1">{name}</h3>
      <p className="text-primary text-sm font-semibold mb-3">{role}</p>
      <p className="text-warm-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{bio}</p>
    </div>
  );
}
