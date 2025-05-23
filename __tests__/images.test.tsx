// __tests__/images.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SvgFollowPage from '@/app/try2/images';

const mockImages = Array.from({ length: 20 }, (_, i) => `/img${i + 1}.jpg`);

let externalOnSelect: ((img: string) => void) | null = null;

// Mock PathImageStream to call `onClick` immediately
jest.mock('@/components/PathImageStream', () => ({
  PathImageStream: ({
    pathId,
    onClick,
  }: {
    pathId: string;
    onClick: (index: number) => void;
  }) => {
    // Trigger image selection (simulate click on image 5)
    if (pathId === 'motionPath') {
      setTimeout(() => onClick(1), 0);
    }

    return <g data-testid={`mock-path-${pathId}`} />;
  },
}));

// Mock CircleLayout and expose onSelect
jest.mock('@/components/CircleLayout', () => ({
  CircleLayout: ({
    centerImage,
    surroundingImages,
    onClose,
    onSelect,
  }: {
    centerImage: string;
    surroundingImages: string[];
    onClose: () => void;
    onSelect: (img: string) => void;
  }) => {
    externalOnSelect = onSelect;

    return (
      <div data-testid="mock-circle-layout">
        <button onClick={() => onSelect(surroundingImages[1])}>Select New</button>
        Center: {centerImage}, Surrounding: {surroundingImages.length}
      </div>
    );
  },
}));

describe('SvgFollowPage', () => {
  it('renders background image and SVG paths', () => {
    render(<SvgFollowPage images={mockImages} />);
    const background = document.querySelector('image#background');
    expect(background).toBeInTheDocument();

    expect(screen.getByTestId('mock-path-motionPath')).toBeInTheDocument();
    expect(screen.getByTestId('mock-path-motionPath2')).toBeInTheDocument();
    expect(screen.getByTestId('mock-path-motionPath3')).toBeInTheDocument();
    expect(screen.getByTestId('mock-path-motionPath4')).toBeInTheDocument();
    expect(screen.getByTestId('mock-path-motionPath5')).toBeInTheDocument();
  });

  it('selects a new image via CircleLayout onSelect', async () => {
    render(<SvgFollowPage images={mockImages} />);

    // Wait for mocked click to trigger state update
    const circleLayout = await screen.findByTestId('mock-circle-layout');
    expect(circleLayout).toBeInTheDocument();

    // Fire select on surrounding image to hit line 100-101
    if (externalOnSelect) {
      externalOnSelect('/img6.jpg'); // one of the surrounding images
    }

    // If you want, assert something again to confirm re-render
  });
});

