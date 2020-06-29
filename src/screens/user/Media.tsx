import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Layout, Pagination ,Menu, Dropdown, message, Button,Modal} from 'antd';
import axios from 'axios';
import { IMedia, IImage } from 'src/schemas/Media';
import Loader from '../loader/Loader';
import {DownOutlined,  UserOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import cookie from 'js-cookie';

const { confirm } = Modal;
const { Header, Footer, Content } = Layout;
const { Meta } = Card;
type Props = {};

const Media: React.FC<Props> = () => {
  const history = useHistory();
  const [media, setMedia] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getData = async (page:number) => {
    setLoading(false);
    const { data } = await axios.get<IMedia>(`http://127.0.0.1:8000/api/media?page=${page}`);
    setMedia(data);
    setLoading(true);
  };

  useEffect(() => {
    getData(1);
  }, [page]);


  const showConfirm =()=> {
    confirm({
      title: 'Logout Confirmation?',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you Want to logout ?',
      onOk() {
        cookie.remove("token");
        history.push('/login');
        message.warning('Logout Successfully');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function onChange(page:number, pageSize:number) {
    setPage(page);
  }

  function handleButtonClick(e:any) {
    console.log('click left button', e);
  }

  function handleMenuClick(e:any) {
    console.log('click', e);
    sort();
  }

  const sort = () => {
    getData(1);
  };
  
  
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Latest Post
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Sort By date
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        Sort By Caption
      </Menu.Item>
    </Menu>
  );
  
  return (
    <>
     <Layout>
     <Header className="header" style={{backgroundColor:'white'}}>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <div style={{marginTop:"1rem",margin:"1rem"}}>
    <Button>secondary</Button>
    <Dropdown overlay={menu}>
      <Button>
        Actions <DownOutlined />
      </Button>
    </Dropdown>
    <Button onClick={showConfirm} style={{float:"right"}}>Logout</Button>
    </div>
      <Content style={{margin:"1rem 0",overflowX:"hidden"}}>
       {loading ? (<>
        <Row gutter={16}>
          {media.data?.map((image: IImage, i:number) => (
            <Col xs={{ span: 24 }} lg={{ span: 8 }} key={i}>
              <Card
                style={{ margin: '20px' }}
                hoverable
                cover={<img alt={image.caption} src={image.original} height="350px" />}
                title={image.caption}
              >
                   <Meta title={image.caption} description={image.created_at} />
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col span={24}>
           <Pagination 
            defaultCurrent={page} 
            total={media.total} 
            pageSize={15}
            showSizeChanger={false}
            onChange={(page, pageSize) =>onChange(page,15)}
            />
          </Col>
        </Row></>
      ) : (
        <Loader />
      )}
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2020 Created by Rajnish Singh</Footer>
    </Layout>
      
    </>
  );
};

export default Media;
