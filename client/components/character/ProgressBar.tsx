const ProgressBar = ({ icon, characterData, textContent, maxValue, type }) => {
  return (
    <div className="text-base font-medium text-green-700 dark:text-green-500 border border-solid border-red-500 py-2">
      <p className="align-middle">
        {icon}
        {textContent}
      </p>
      <div className="flex justify-between items-center gap-3">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-4">
          <div
            className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
            style={{ width: `${(characterData / maxValue) * 100 + "%"}` }}
          ></div>
        </div>
        {type === "percentage" ? (
          <p className="inline min-w-[60px] text-right">{Math.floor((characterData / maxValue) * 100) + "%"}</p>
        ) : (
          <p className="inline min-w-[60px] text-right">{characterData + "/" + maxValue}</p>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
