'use client'
import { useEffect, useRef } from 'react';

const VirtualMouse = ({
  x,
  y,
  onClick,
}: {
  x: number;
  y: number;
  onClick: (x: number, y: number) => void;
}) => {
  const mouseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mouseRef.current) {
      mouseRef.current.style.top = `${y}px`;
      mouseRef.current.style.left = `${x}px`;
    }
  }, [x, y]);

  const handleClick = () => {
    if (onClick) onClick(x, y);
  };

  return (
    <div
      ref={mouseRef}
      onClick={handleClick}
      style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    ></div>
  );
};

export default VirtualMouse;
