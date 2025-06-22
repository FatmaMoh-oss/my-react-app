type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

export type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

export type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
};
