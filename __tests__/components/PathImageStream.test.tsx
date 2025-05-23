// __tests__/components/PathImageStream.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PathImageStream } from '@/components/PathImageStream';

// Mock the SinglePathImage component
jest.mock('@/components/SinglePathImage', () => ({
  SinglePathImage: ({ imageLink, globalIndex, onClick }: any) => (
    <div
      data-testid="mock-single-path-image"
      data-href={imageLink}
      onClick={() => onClick?.(globalIndex)}
    >
      Mock: {imageLink}
    </div>
  ),
}));

describe('PathImageStream', () => {
  const mockSvgRef = { current: null } as React.RefObject<SVGSVGElement>;
  const mockImages = ['/img1.png', '/img2.png', '/img3.png'];

  it('renders each image except the selected one', () => {
    render(
      <PathImageStream
        pathId="motionPath"
        duration={5000}
        paused={false}
        svgRef={mockSvgRef}
        imageLinks={mockImages}
        selectedIndex={1}
      />
    );

    const renderedImages = screen.getAllByTestId('mock-single-path-image');
    expect(renderedImages).toHaveLength(2);
    expect(renderedImages[0]).toHaveAttribute('data-href', '/img1.png');
    expect(renderedImages[1]).toHaveAttribute('data-href', '/img3.png');
  });

  it('calls onClick with the correct global index', () => {
    const handleClick = jest.fn();

    render(
      <PathImageStream
        pathId="motionPath"
        duration={5000}
        paused={false}
        svgRef={mockSvgRef}
        imageLinks={mockImages}
        onClick={handleClick}
        startIndex={10}
      />
    );

    const renderedImages = screen.getAllByTestId('mock-single-path-image');
    fireEvent.click(renderedImages[1]); // index 1 → globalIndex = 11
    expect(handleClick).toHaveBeenCalledWith(11);
  });
});

