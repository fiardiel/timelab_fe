import { render, screen } from '@testing-library/react';
import page from '@/app/try2/page';
import * as fetchModule from '@/lib/fetchImages'

jest.mock('@/lib/fetchImages', () => ({
  fetchImages: jest.fn()
}))

jest.mock('@/app/try2/images', () => ({ // adjust path as needed
  __esModule: true,
  default: ({ images }: { images: string[] }) => (
    <div data-testid="svg-follow">Mock SvgFollowPage: {images.join(', ')}</div>
  ),
}))

describe('Page Component', () => {
  it('fetches images and renders SvgFollowPage', async () => {
    const mockedImages = ['img1.png', 'img2.png']
      ; (fetchModule.fetchImages as jest.Mock).mockResolvedValue(mockedImages)

    render(await page())

    expect(fetchModule.fetchImages).toHaveBeenCalled()
    expect(await screen.findByTestId('svg-follow')).toHaveTextContent('img1.png, img2.png')
  })
})
