import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

describe('<Blog/>', () => {
  let container;

  beforeEach(() => {
    const blog = {
      title: 'The truth behind mock blogs',
      author: 'Joshua K. Rowling',
      likes: 0,
      url: 'https://www.mockblogs.com',
      user: {
        name: 'Joshua Peck'
      }
    };

    container = render(<Blog blog={blog} />).container;
  });

  test('renders default content', async () => {
    const div = container.querySelector('.blog-container');
    expect(div).not.toBeNull();
    expect(div).toHaveTextContent(
      'The truth behind mock blogs - Joshua K. Rowling'
    );
  });

  test("doesn't render content when not visible", () => {
    const div = container.querySelector('.togglable-content');
    expect(div).toBeNull();
  });

  test("after clicking 'view', renders togglable content", async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const div = container.querySelector('.togglable-content');
    expect(div).not.toHaveStyle('display: none');
  });
});
