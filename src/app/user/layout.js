import LayoutScreen from './LayoutScreen/LayoutScreen';

export default function UserLayout({ children }) {
  return (
    <div>
      <LayoutScreen>{children}</LayoutScreen>
    </div>
  );
}
