export default function LoadingUser() {
  return (
    <div className="animate-pulse w-full bg-white mx-auto flex items-center gap-8 p-4 rounded-lg leading-relaxed">
      <img className="h-24 w-24 rounded-full bg-slate-700" />
      <div className="w-4/5 flex flex-col gap-4">
        <div className="w-full h-2 font-bold bg-slate-700 "></div>
        <div className="w-full h-2 font-medium bg-slate-700"></div>
        <div className="w-full h-2 font-medium bg-slate-700"></div>
        <div className="w-full h-2 font-medium bg-slate-700"> </div>
      </div>
    </div>
  );
}
