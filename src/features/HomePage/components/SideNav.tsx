export default function SideNav() {
  return (
    <nav className="flex-nav">
      SIDENAV
      <ul className="sidebar-content">
        <li className={isActive ? "dashboard active" : "dashboard"}></li>
      </ul>
    </nav>
  );
}
