import {
  AppProvider,
  Frame,
  Navigation,
  Layout,
  Page,
} from '@shopify/polaris';
import en from "@shopify/polaris/locales/en.json";
import {
  HomeFilledIcon,
  OrderFilledIcon,
  SettingsFilledIcon,
} from '@shopify/polaris-icons';
import '@shopify/polaris/build/esm/styles.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { EPath } from '../routes/routesConfig';
import { useEffect, useState } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState<string>('')
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === EPath.dashboard) {
      setActive('dashboard')
    }
    else if (location.pathname.includes(EPath.products)) {
      setActive('products')
    }
    else if (location.pathname.includes(EPath.setting)) {
      setActive('setting')
    }
  }, [location])

  return (
    <AppProvider i18n={en}>
      <Frame
        navigation={
          <Navigation location="/">
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Navigation.Section
                items={[
                  {
                    label: 'Dashboard',
                    icon: HomeFilledIcon,
                    onClick: () => navigate(EPath.dashboard),
                    selected: active === 'dashboard',
                  },
                  {
                    label: 'Products',
                    icon: OrderFilledIcon,
                    onClick: () => navigate(EPath.products),
                    selected: active === 'products',
                  },

                ]}
              />
              <Navigation.Section
                items={[
                  {
                    label: 'Settings',
                    icon: SettingsFilledIcon,
                    onClick: () => navigate(EPath.setting),
                    selected: active === 'setting',
                  },
                ]}
              />
            </div>
          </Navigation>
        }
      >
        <Page>
          <Layout>
            <Outlet />
          </Layout>
        </Page>
      </Frame>
    </AppProvider>
  )
}

export default AdminLayout