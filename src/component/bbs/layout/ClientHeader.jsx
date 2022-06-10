import { Menu, Layout } from "antd";
const {Header} = Layout;

export default function ClientHeader() {
    // const item = [
    //   {
    //     key : 1,
    //     label : 'nav1'
    //   },
    //   {
    //     key : 2,
    //     label : 'nav2'
    //   },
    //   {
    //     key : 3,
    //     label : 'nav3'
    //   }
    // ];
    return (
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" />
      </Header>
    );
}