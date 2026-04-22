export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {children}
    </div>
  );
}
