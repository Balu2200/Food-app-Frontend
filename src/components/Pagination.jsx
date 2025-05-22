const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-4">
      {!loading && (
        <>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
