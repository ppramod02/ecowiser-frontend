
export default function Loader() {
  return (
    <div className="loader mx-auto h-full flex items-center justify-center space-x-2">
      <div className="alpha w-3 h-3 bg-green-500/60 rounded-full animate-bounce"></div>
      <div className="bravo w-3 h-3 bg-green-500/60 rounded-full animate-bounce"></div>
      <div className="charlie w-3 h-3 bg-green-500/60 rounded-full animate-bounce"></div>
    </div>
  );
};
