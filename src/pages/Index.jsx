import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, HStack, VStack } from '@chakra-ui/react';

const colors = ['#FF0000', '#FFFF00', '#0000FF', '#FFFFFF', '#000000'];

const Index = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = selectedColor;
    context.lineWidth = 5;
    contextRef.current = context;
  }, [selectedColor]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
  };

  const draw = ({ nativeEvent }) => {
    if (!contextRef.current) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
      <VStack position="absolute" top={4} left={4} spacing={4}>
        {colors.map((color) => (
          <Button
            key={color}
            backgroundColor={color}
            border={color === selectedColor ? '2px solid black' : 'none'}
            onClick={() => setSelectedColor(color)}
            width="40px"
            height="40px"
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Index;