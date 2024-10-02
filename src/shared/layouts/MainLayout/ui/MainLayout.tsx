import './MainLayout.scss';
import { Header } from '@/widgets/Header';
import { LeftSideMenu } from '@/widgets/LeftSideMenu';
import { EditorPage } from '@/pages/EditorPage';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { FC } from 'react';

export const MainLayout: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main-layout">
        <Header />
        <LeftSideMenu />
        <div className="main-layout__content">
          <EditorPage />
        </div>
      </div>
    </DndProvider>
  );
};

export default MainLayout;
