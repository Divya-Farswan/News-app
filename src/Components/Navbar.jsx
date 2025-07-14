
import { useState } from 'react'
const Navbar = ({ setCategory, setQuery }) => {
  const [searchText, setSearchText] = useState("")

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value); //update local state
    setQuery(value); // update global query state for live search
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-dark border-bottom border-body bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid px-3">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <span className="badge bg-primary text-light fs-2 px-4">NEWS</span>
        </a>
        <button className="navbar-toggler custom-hover" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title badge bg-primary text-light fs-4 px-4" id="offcanvasNavbarLabel">NEWS</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav no-blink-cursor justify-content-end gap-2 me-5 mb-lg-0 mb-4 flex-grow-1">
              <li className="nav-item">
                <div onClick={() => setCategory("technology")} className="nav-link custom-line">Technology</div>
              </li>
              <li className="nav-item">
                <div onClick={() => setCategory("business")} className="nav-link custom-line">Business</div>
              </li>
              <li className="nav-item">
                <div onClick={() => setCategory("health")} className="nav-link custom-line">Health</div>
              </li>
              <li className="nav-item">
                <div onClick={() => setCategory("sports")} className="nav-link custom-line">Sports</div>
              </li>
              <li className="nav-item">
                <div onClick={() => setCategory("entertainment")} className="nav-link custom-line">Entertainment</div>
              </li>
            </ul>

            {/* Live Search Input */}
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <input className="form-control me-2 custom-hover custom-focus custom-placeholder" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={handleInputChange} />
              <button className="btn btn-danger" type="submit">Search</button>
              {/* The button is optional now since we search as you type */}
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


