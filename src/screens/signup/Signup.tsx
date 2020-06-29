import React from 'react';
import { Form, Input, Button, Row, Col, Radio, Typography, DatePicker, message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

export default function Signup() {
  const [form] = Form.useForm();
  const onFinish = async(values: any) => {
    const user = {
      "name": values.firstName + ' ' + values.lastName,
      "email": values.email,
      "password": values.password,
      "gender": values.gender ?? 'male',
      "date_of_birth": values.dob?.format('DD-MM-YYYY')
    };
    console.log(user);
    const {data} =  await axios.post(`/register`, user);
    console.log(data);
    if(data){
      console.log(data);
      form.resetFields();
      message.success("Your account is successfully created")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ marginTop: '4rem' }}>
      <Row justify="center" align="middle">
        <Col xs={20} sm={20} md={12} lg={12} xl={12}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
            form={form}
          >
            <Typography>
              <Title level={2}>What is your name ?</Title>
            </Typography>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input placeholder="Enter First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input placeholder="Enter Last Name" />
            </Form.Item>

            <br />

            <Typography>
              <Title level={2}>And your gender ?</Title>
            </Typography>
            <Form.Item name="gender">
              <Radio.Group  buttonStyle="solid" defaultValue="male">
                <Radio.Button value="male">Male</Radio.Button>
                <Radio.Button value="female">Female</Radio.Button>
                <Radio.Button value="other">Other</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <br />

            <Typography>
              <Title level={2}>What's your date of birth ?</Title>
              <Paragraph>This cannot be editable later .</Paragraph>
            </Typography>

            <Form.Item
              name="dob"
              rules={[{ required: true, message: 'Please Select your date of birth!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <br />

            <Typography>
              <Title level={2}>Email & Password</Title>
            </Typography>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <br />
      <br />
      <p style={{ textAlign: 'center', color: '#60BD9C' }}>
        <b>
          <Link to="/login" style={{ color: '#60BD9C' }}>
            Login Now
          </Link>
        </b>
      </p>
    </div>
  );
}
