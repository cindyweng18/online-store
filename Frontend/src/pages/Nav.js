import { useHistory } from 'react-router-dom';

const Nav = () => {
  // Change parts of Nav when a user is signed in or not
  const history = useHistory();
  var user = localStorage.getItem("session");
  var text = "Sign In";
  var link = "/login";
  var display = "none";

  if (user !== null) {
    text = "Welcome " + user;
    link = "/account/" + user;
    display = "";
  };

  // Function that handles log out
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  }

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Online Store</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/desktops">Build Desktop</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/laptops">Build Laptop</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/parts">Computer Parts</a>
              </li>
            </ul>
            <span class="navbar-text">
            <a class="nav-link active" aria-current="page" href="/checkout">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </a>
            </span>
            <span class="navbar-text">
              <a class="nav-link active" aria-current="page" href={link}> {text} </a>
            </span>
            <span class="navbar-text">
              <button type="button" class="btn btn-primary" onClick={handleLogout} style={{display: display}}> Logout </button>
            </span>
          </div>
        </div>
      </nav>
    )
}

export default Nav;