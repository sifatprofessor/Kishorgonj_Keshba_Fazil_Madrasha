import React from 'react';

import { ReactNode } from 'react';

interface NoticeLayoutProps {
    children: ReactNode;
}

const NoticeLayout: React.FC<NoticeLayoutProps> = ({ children }) => {
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    );
};

export default NoticeLayout;
