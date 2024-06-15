import { ConfigProvider } from "antd";
import { ReactNode } from "react";

const AntProvider = ({children}: {children: ReactNode}) => {
    return (
        <ConfigProvider
        theme={{
            token: {
              // Seed Token
              colorPrimary: '#d7272d',
            },
          }}
        >
            {children}
        </ConfigProvider>
    )
}

export default AntProvider;