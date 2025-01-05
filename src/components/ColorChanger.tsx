import { createSignal } from 'solid-js';

import Button from '@components/ui/Button';

const ColorChanger = () => {
  const [bgColor, setBgColor] = createSignal('bg-blue-500 border-blue-700');

  // function to generate a random Tailwind background & border(shadow) color classes
  const getRandomColor = (currentColor: string) => {
    const colors = [
      'bg-red-500 border-red-700',
      'bg-blue-500 border-blue-700',
      'bg-green-500 border-green-700',
      'bg-yellow-500 border-yellow-700',
      'bg-purple-500 border-purple-700',
      'bg-pink-500 border-pink-700',
      'bg-indigo-500 border-indigo-700',
    ];
    const filteredColors = colors.filter((color) => color !== currentColor); // filter out current color from array
    return filteredColors[Math.floor(Math.random() * filteredColors.length)]; // return new color
  };

  const handleClick = () => {
    setBgColor(getRandomColor(bgColor()));
  };

  return (
    <>
      <Button onClick={handleClick} color={`${bgColor()}`}>
        change color
      </Button>
    </>
  );
};

export default ColorChanger;
