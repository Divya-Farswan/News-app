/**
 * <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
 */

// Pagination component receives:
// - currentPage: the currently selected page
// - totalPages: total number of pages available
// - onPageChange: a callback function to update the current page when a new page is selected
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Create an array with page numbers from 1 to totalPages
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Handler for the Previous button
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    // Handler for the Next button
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="container d-flex justify-content-center py-10 mt-20">
            <nav aria-label="Page navigation example">
                <ul className="pagination ">
                    {/* Previous button: disabled if we're on the first page */}
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <a className="page-link" href="#" aria-label="Previous" onClick={(e) => { e.preventDefault(); handlePrevious(); }}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    {/* Map through page numbers and display each as a clickable link */}
                    {pageNumbers.map((number) => (
                        <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`} >
                            <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); onPageChange(number); }} >
                                {number}
                            </a>
                        </li>
                    ))}

                    {/* Next button: disabled if we're on the last page */}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`} >
                        <a className="page-link" href="#" aria-label="Next" onClick={(e) => { e.preventDefault(); handleNext(); }} >
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
