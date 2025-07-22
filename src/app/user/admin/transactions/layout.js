import LayoutScreen from './LayoutScreen/LayoutScreen';

export default function AdminLayout({ children }) {
  return (
    <div>
      <LayoutScreen>{children}</LayoutScreen>
    </div>
  );
}
