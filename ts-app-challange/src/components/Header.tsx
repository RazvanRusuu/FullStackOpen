interface IHeader {
  title: string;
}
const Header = ({ title }: IHeader) => {
  return <h1>{title}</h1>;
};

export default Header;
