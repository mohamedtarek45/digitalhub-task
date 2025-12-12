"use client";

const Pagination = ({ currentPage,setPage,numberOfPages }: { currentPage: number, setPage: (page: number) => void, numberOfPages: number }) => {

  const pagestoShow: number[] = [];
  if (currentPage > 1)
    pagestoShow.push(currentPage- 1);
  pagestoShow.push(currentPage);
  if (currentPage < numberOfPages)
    pagestoShow.push(currentPage + 1);

  const handleChangePage = (page: number) => {
    setPage(page)
  };

  return (
    <div className="flex justify-center items-center gap-3 my-8">
      <button
        onClick={() =>
          currentPage > 1 &&
          handleChangePage(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm rounded-xl border border-gray-300 hover:bg-gray-100 hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Prev
      </button>

      <div className="flex items-center gap-2">
        {pagestoShow.map((page) => (
          <button
            key={page}
            onClick={() => handleChangePage(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border hover:cursor-pointer transition-all text-sm font-medium
              ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                  : "border-gray-300 hover:bg-gray-100 text-gray-700"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() =>
          currentPage < numberOfPages &&
          handleChangePage(currentPage + 1)
        }
        disabled={currentPage === numberOfPages}   
        className="px-4 py-2 text-sm rounded-xl border border-gray-300 hover:bg-gray-100  hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
