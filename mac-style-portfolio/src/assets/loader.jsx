export const MacOSLoader = ({ size = 40, className = "" }) => {
  return (
    <div 
      className={`animate-spin rounded-full border-4 border-gray-200 border-t-gray-600 ${className}`}
      style={{ width: size, height: size }}
    />
  );
};