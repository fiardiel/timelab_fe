import { render, screen, fireEvent } from '@testing-library/react';
import { CircleLayout } from '@/components/CircleLayout';

describe('CircleLayout', () => {
  const mockCenter = '/center.jpg';
  const mockSurrounding = [
    '/s1.jpg',
    '/s2.jpg',
    '/s3.jpg',
    '/s4.jpg',
    '/s5.jpg',
    '/s6.jpg',
    '/s7.jpg',
    '/s8.jpg',
  ];

  it('renders overlay, center image, and surrounding images', () => {
    render(
      <CircleLayout
        centerImage={mockCenter}
        surroundingImages={mockSurrounding}
        onClose={jest.fn()}
        onSelect={jest.fn()}
      />
    );

    // Overlay present
    expect(screen.getByTestId('overlay')).toBeInTheDocument();

    // Center image
    const centerImg = screen.getByAltText('Focused');
    expect(centerImg).toBeInTheDocument();
    expect(centerImg).toHaveAttribute('src', mockCenter);

    // Surrounding images
    mockSurrounding.forEach((src, i) => {
      const img = screen.getByAltText(`orbiting-${i}`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', src);
    });
  });

  it('calls onClose when overlay is clicked', () => {
    const handleClose = jest.fn();

    render(
      <CircleLayout
        centerImage={mockCenter}
        surroundingImages={mockSurrounding}
        onClose={handleClose}
        onSelect={jest.fn()}
      />
    );

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect when surrounding image is clicked', () => {
    const handleSelect = jest.fn();

    render(
      <CircleLayout
        centerImage={mockCenter}
        surroundingImages={mockSurrounding}
        onClose={jest.fn()}
        onSelect={handleSelect}
      />
    );

    const img = screen.getByAltText('orbiting-3');
    fireEvent.click(img);

    expect(handleSelect).toHaveBeenCalledWith(mockSurrounding[3]);
  });
});

