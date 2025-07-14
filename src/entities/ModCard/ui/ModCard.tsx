interface ModCardProps {
  title: string;
  version: string;
  rating: number;
  imageUrl: string;
}

export default function ModCard({ title, version, rating, imageUrl }: ModCardProps) {
  return (
    <div className="w-[120px] bg-[#2e2b25] border border-[#3b392f] shadow-md text-white font-minecraft rounded-sm overflow-hidden text-xs">
      <img src={imageUrl} alt={title} className="w-full h-[60px] object-cover" />
      <div className="p-1">
        <div className="text-[10px] leading-tight text-white">{title}</div>
        <div className="text-[10px] text-[#a0a0a0] flex justify-between items-center mt-1">
          <span>{version}</span>
          <span className="text-yellow-400">{"★".repeat(Math.round(rating))} </span>
        </div>
      </div>
    </div>
  );
}
