const Nav = () => {
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
              <a class="nav-link active" aria-current="page" href="/login">Sign In</a>
            </span>
          </div>
        </div>
      </nav>
    )
}

export default Nav;