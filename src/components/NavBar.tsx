interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
}
///src/image/logounivpm.png
function NavBar({ brandName, imageSrcPath }: NavBarProps) {
  return (
    <nav className="navbar navbar-light">
      <a className="navbar-brand" href="#">
        <img
          src={imageSrcPath}
          width="60"
          height="60"
          className="d-inline-block align-center"
          alt=""
        />
        <span className="fw-bolder fs-4">{brandName}</span>
      </a>
    </nav>
  );
}

export default NavBar;
