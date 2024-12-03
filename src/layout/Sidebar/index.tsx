import React from 'react'
import { Layout, Menu, Badge } from 'antd'
import {
  DashboardOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
  ToolOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

interface SidebarProps {
  collapsed: boolean
}

const { Sider } = Layout

// Define menu items
const items: MenuProps['items'] = [
  {
    label: 'MAIN',
    key: 'main',
    type: 'group', // Non-clickable heading
    children: [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: <Link to='/trips'>Dashboard</Link> // Link added
      }
    ]
  },
  {
    label: 'WIDGETS',
    key: 'widgets',
    type: 'group', // Non-clickable heading
    children: [
      {
        key: 'widgets-item',
        icon: <AppstoreOutlined />,
        label: <Link to='/widgets'>Widgets</Link> // Link added
      }
    ]
  },
  {
    label: 'GENERAL',
    key: 'general',
    type: 'group', // Non-clickable heading
    children: [
      {
        key: 'ui-elements',
        icon: <ToolOutlined />,
        label: 'UI Elements'
      },
      {
        key: 'utilities',
        icon: <SettingOutlined />,
        label: 'Utilities'
      },
      {
        key: 'charts',
        icon: <BarChartOutlined />,
        label: 'Charts'
      },
      {
        key: 'forms',
        icon: <FileTextOutlined />,
        label: (
          <span>
            Forms <Badge count={6} style={{ marginLeft: '10px' }} />
          </span>
        )
      },
      {
        key: 'advanced-ui',
        icon: <ToolOutlined />,
        label: 'Advanced UI'
      }
    ]
  },
  {
    label: 'WEB APPS',
    key: 'web-apps',
    type: 'group', // Non-clickable heading
    children: []
  }
]

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '18px'
        }}
      >
        <img src={logo} alt='logo' />
      </div>
      <Menu
        mode='inline'
        items={items}
        defaultSelectedKeys={['dashboard']}
        style={{
          height: '100%',
          borderRight: 0
        }}
        theme='light'
      />
    </Sider>
  )
}

export default Sidebar
