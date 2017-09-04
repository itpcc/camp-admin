import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';

import { actions as authActions } from './ducks/auth';
import Overview from './pages/Overview';
import Grading from './pages/grading/Grading';
import Registrants from './pages/Registrant/Registrants';
import Registrant from './pages/Registrant/Registrant';
import Users from './pages/users/Users';
import User from './pages/users/User';
import Affiliate from './pages/affiliate/Affiliate';
import UserManagement from './pages/user-management/UserManagement';
import Logout from './pages/auth/Logout';
import Login from './pages/auth/Login';

const { Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100%;
`;

const BrandingImg = styled.img.attrs({
  src: require('./img/logo.png'),
  alt: 'branding'
})`
  width: 140px;
  display: block;
  margin: 0 auto;
  padding: 15px 0;
`;

const Routes = props => (
  <Router>
    <StyledLayout>
      <Sider
        trigger={null}
        collapsible
        collapsed={false}
      >
        <BrandingImg />
        <Menu theme="dark" mode="inline">
          {props.isLoggedIn && <Menu.Item key="1">
            <Link to="/overview">
              <Icon type="area-chart" />
              <span>Overview</span>
            </Link> 
          </Menu.Item>}
          {['designer', 'marketing', 'programming', 'content'].indexOf(props.user.role) !== -1 && <Menu.Item key="2">
            <Link to="/grading">
              <Icon type="edit" />
              <span>Grading</span>
            </Link> 
          </Menu.Item>}
          {props.user.role === 'admin' && <Menu.Item key="3">
            <Link to="/registrants">
              <Icon type="team" />
              <span>Registrant</span>
            </Link>
          </Menu.Item>}
          {props.user.role === 'admin' && <Menu.Item key="4">
            <Link to="/user">
              <Icon type="user" />
              <span>User</span>
            </Link>
          </Menu.Item>}
          {props.user.role === 'admin' && <Menu.Item key="5">
            <Link to="/affiliate">
              <Icon type="link" />
              <span>Affiliate</span>
            </Link>
          </Menu.Item>}
          {/* <Menu.Item key="6">
            <a onClick={() => props.logout()}></a>
          </Menu.Item>} */}
          {props.user.role === 'admin' && <Menu.Item key="7">
            <Link to="/user-management">
              <Icon type="user" />
              <span>Admin Management</span>
            </Link>
          </Menu.Item>}
          {props.isLoggedIn && <Menu.Item key="8">
            <Link to="/logout">
              <Icon type="poweroff" />
              <span>Logout</span>
            </Link>
          </Menu.Item>}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={Login} />
          {props.user.role === 'admin' && (
            <div>
              <Route path="/overview" exact component={Overview} />
              <Route path="/grading" exact component={Grading} />
              <Route path="/registrants" exact component={Registrants} />
              <Route path="/registrant" exact component={Registrant} />
              <Route path="/user" exact component={Users} />
              <Route path="/user/:id" exact component={User} />
              <Route path="/affiliate" exact component={Affiliate} />
              <Route path="/user-management" exact component={UserManagement} />
            </div>
          )}
          {['designer', 'marketing', 'programming', 'content', 'stage-1', 'stage-2'].indexOf(props.user.role) !== -1 && (
            <div>
              <Route path="/grading" exact component={Grading} />
            </div>
          )}
          <Redirect from='*' to='/' />
        </Content>
      </Layout>
    </StyledLayout>
  </Router>
);

export default connect(
  state => ({
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
  }),
  { ...authActions }
)(Routes);
