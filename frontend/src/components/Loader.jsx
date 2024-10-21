const Loader = () => {
  return (
    <div style={{ height: "calc(100vh - 5rem)" }}>
      <div className="flex  gap-4 justify-center items-center h-full">
        <div className="animate-spin w-10 h-10 text-indigo-500 border-4 border-indigo-500 rounded-xl"></div>
        Loading...
      </div>
    </div>
  );
};

export default Loader;
