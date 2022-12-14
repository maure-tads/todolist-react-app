import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const Menu = () => {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="home" title="Home">
      Conteudo
      </Tab>
      <Tab eventKey="profile" title="Profile">
      Conteudo
      </Tab>
      <Tab eventKey="longer-tab" title="Loooonger Tab">
      Conteudo
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
      Conteudo
      </Tab>
    </Tabs>
  );
};

export default Menu;
