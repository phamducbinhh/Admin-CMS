import {
  AppstoreOutlined,
  BarChartOutlined,
  CarOutlined,
  DashboardOutlined,
  EuroCircleFilled,
  FileTextOutlined,
  GiftOutlined,
  SettingOutlined,
  ShoppingFilled,
  StarFilled,
  SwitcherFilled,
  ToolOutlined,
  TruckFilled,
  UnlockFilled,
  UserOutlined,
  UserSwitchOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Badge, Layout, Menu } from 'antd'
import React from 'react'

import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useLocalStorage } from '../../utils/localStorage/localStorageService'

interface SidebarProps {
  collapsed: boolean
}

const { Sider } = Layout

const role = useLocalStorage.getLocalStorageData('role')
// Define menu items
const items: MenuProps['items'] = [
  {
    label: 'MAIN',
    key: 'main',
    type: 'group', // Non-clickable heading
    children: [
      {
        key: 'trips',
        icon: <DashboardOutlined />,
        label: <Link to='/trips'>Trips</Link> // Link added
      },
      {
        key: 'vehicles',
        icon: <CarOutlined />,
        label: <Link to='/vehicles'>Vehicles</Link> // Link added
      },
      {
        key: 'promotion',
        icon: <GiftOutlined />,
        label: <Link to='/promotion'>Promotions</Link> // Link added
      },
      {
        key: 'driver',
        icon: <UserOutlined />,
        label: <Link to='/driver'>Drivers</Link> // Link added
      },
      {
        key: 'cost_type',
        icon: <EuroCircleFilled />,
        label: <Link to='/cost-type'>Cost Type</Link> // Link added
      },
      {
        key: 'fixed-cost',
        icon: <TruckFilled />,
        label: <Link to='/fixed-cost'>Fixed Cost</Link> // Link added
      },
      {
        key: 'request',
        icon: <ShoppingFilled />,
        label: <Link to='/request'>Request</Link> // Link added
      },
      {
        key: 'ticket',
        icon: <SwitcherFilled />,
        label: <Link to='/ticket'>Ticket</Link> // Link added
      },
      {
        key: 'reviews',
        icon: <StarFilled />,
        label: <Link to='/reviews'>Reviews</Link> // Link added
      },
      {
        key: 'account',
        icon: <UserSwitchOutlined />,
        label: <Link to='/account'>Account</Link> // Link added
      },
      {
        key: 'role',
        icon: <UnlockFilled />,
        label: <Link to='/role'>Role</Link> // Link added
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
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          { label: 'Option 1', key: 'setting:1' },
          { label: 'Option 2', key: 'setting:2' }
        ]
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          { label: 'Option 3', key: 'setting:3' },
          { label: 'Option 4', key: 'setting:4' }
        ]
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

const allowAdminRoute = ['account', 'role']

const filteredItems = items
  .map((group: any) => ({
    ...group,
    children: group.children?.filter((item: any) => {
      if (role === 'Admin') {
        // Admin chỉ thấy trips, vehicles, promotion
        return allowAdminRoute.includes(item.key)
      } else if (role === 'Staff') {
        // Staff thấy tất cả trừ trips, vehicles, promotion
        return !allowAdminRoute.includes(item.key)
      }
      // Nếu không phải admin hay staff, không hiển thị gì
      return false
    })
  }))
  .filter((group) => group.children?.length > 0) // Loại nhóm không có mục con

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
      <Link
        to='/'
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
      </Link>
      <Menu
        mode='inline'
        items={filteredItems}
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
