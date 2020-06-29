import React from 'react';
import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';
import cookie from 'js-cookie';

const { Title, Paragraph } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const Login = (props: any) => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const user: any = {
      email: values.email,
      password: values.password
    };
    Axios.post(`/login`, user).then((res: any) => {
      if (res.status === 200) {
        const token = res.data.token;
        cookie.set('token', token, { expires: 1 });
        history.push('/media');
        message.success('Login Successful');
      } else {
        message.error(res);
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{ padding: '4rem 0', backgroundColor: '#60BD9B', width: '100%', minHeight: '100vh' }}
    >
      <Row justify="center" align="middle">
        <Col xs={20} sm={20} md={12} lg={12} xl={10}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
            form={form}
          >
            <br />
            <Typography>
              <Title level={1} style={{ textAlign: 'center', color: 'white' }}>
                PWA
              </Title>
              <Paragraph style={{ textAlign: 'center', color: 'white' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </Paragraph>
            </Typography>
            <br /> <br />
            <br /> <br />
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
              style={{ width: '100%' }}
            >
              <Input placeholder="Enter Valid Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <br />
            <Form.Item>
              <Button htmlType="submit" size="large">
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <br />
      <br />
      <p style={{ textAlign: 'center', color: 'white' }}>
        Not have account ?{' '}
        <b>
          <Link to="/signup" style={{ color: 'white' }}>
            Register Now
          </Link>
        </b>
      </p>
    </div>
  );
};

export default Login;
