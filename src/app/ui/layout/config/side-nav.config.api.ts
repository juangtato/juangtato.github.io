export interface SideNavLink {
  type: 'link';

  link: string;
  label: string;
  icon?: string;
}

export interface SideNavTitle {
  type: 'title';
  label: string;
}

export interface SideNavConfig {
  items: Array<SideNavTitle | SideNavLink>;
}
